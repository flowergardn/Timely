import { env } from "~/env";
import {
  APIMessageComponentButtonInteraction,
  InteractionType,
} from "discord-api-types/v10";
import { sign } from "tweetnacl";
import { type UserApplicationInteraction } from "~/interfaces/Interaction";

interface CommandCtx {
  interaction:
    | UserApplicationInteraction
    | APIMessageComponentButtonInteraction;
  ctx: {
    response: Response;
    request: Request;
  };
}

interface Command {
  execute: (ctx: CommandCtx) => Promise<Response>;
}

export async function POST(request: Request, response: Response) {
  const PUBLIC_KEY = env.DISCORD_PUBLIC_KEY;
  const body = (await request.json()) as Record<
    string,
    string | number | boolean
  >;

  const signature = request.headers.get("x-signature-ed25519");
  const timestamp = request.headers.get("x-signature-timestamp");

  if (!signature || !timestamp) {
    console.log("Missing signature or timestamp");
    return Response.json(
      { message: "Missing signature or timestamp" },
      { status: 400 },
    );
  }

  const isVerified = sign.detached.verify(
    Buffer.from(timestamp + JSON.stringify(body)),
    Buffer.from(signature, "hex"),
    Buffer.from(PUBLIC_KEY, "hex"),
  );

  if (!isVerified) {
    return Response.json({ message: "Invalid signature" }, { status: 400 });
  }

  // ACK ping from Discord
  if (body.type === 1) {
    return Response.json({ type: 1 });
  }

  let interaction;
  let commandId = "";

  if (body.type == InteractionType.ApplicationCommand) {
    interaction = body as unknown as UserApplicationInteraction;
    commandId = interaction.data.name.split(" ").join("_").toLowerCase();
  } else if (body.type == InteractionType.MessageComponent) {
    interaction = body as unknown as APIMessageComponentButtonInteraction;
    commandId = interaction.data.custom_id;
  } else return Response.json({ message: "Unknown interaction type" });

  try {
    const path =
      body.type == InteractionType.MessageComponent ? "events" : "commands";
    let commandFile;

    try {
      commandFile = await import(`~/app/bot/_${path}/${commandId}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return Response.json(
          {
            message: `Unknown command. ${err.message}`,
          },
          { status: 400 },
        );
      }
    }

    const commandResponse = await (commandFile as Command).execute({
      interaction,
      ctx: {
        response,
        request,
      },
    });
    return commandResponse;
  } catch (err: any) {
    console.log(err.message);
  }
}
