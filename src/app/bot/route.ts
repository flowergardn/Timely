import { env } from "~/env";
import { InteractionType } from "discord-api-types/v10";
import { sign } from "tweetnacl";
import { UserApplicationInteraction } from "~/interfaces/Interaction";

export async function POST(request: Request, response: Response) {
  const PUBLIC_KEY = env.DISCORD_PUBLIC_KEY;
  const body = await request.json();

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

  if (body.type == InteractionType.ApplicationCommand) {
    const interaction = body as UserApplicationInteraction;

    try {
      const commandId = interaction.data.name
        .split(" ")
        .join("_")
        .toLowerCase();
      const command = await import(`~/app/bot/_commands/${commandId}`);
      const commandResponse = await command.execute({
        interaction,
        ctx: {
          response,
          request,
        },
      });
      // actually returns the response in the req body
      return commandResponse;
    } catch (err: any) {
      console.log(err.message);
    }

    return;
  }

  console.log("Unknown interaction type " + body.type);
}
