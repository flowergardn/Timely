import { EmbedBuilder } from "@discordjs/builders";
import { eq } from "drizzle-orm";
import { type CommandOptions } from "~/interfaces/CommandOptions";
import { type CommandApplicationInteraction } from "~/interfaces/Interaction";
import { db } from "~/server/db";
import { type Session, sessions } from "~/server/db/schema";
import { getBaseUrl } from "~/lib/api";
import sendEmbed from "~/lib/sendEmbed";
import sendMessage from "~/lib/sendMessage";
import { createId } from "@paralleldrive/cuid2";
import { colors } from "~/lib/utils";

const getSession = (setup: Session[]) => {
  if (setup.length > 0) {
    const session = setup.shift();
    if (!session) return null;
    return session;
  }
  return null;
};

type DBSession = Session | null;

export const execute = async (opt: CommandOptions) => {
  const interaction =
    opt.interaction as unknown as CommandApplicationInteraction;

  const existingSession: DBSession = getSession(
    await db
      .select()
      .from(sessions)
      .where(eq(sessions.discordId, interaction.user.id)),
  );

  let sessionLink = "";

  if (!existingSession) {
    const newSession: DBSession = getSession(
      await db
        .insert(sessions)
        .values({ discordId: interaction.user.id, id: createId() })
        .returning(),
    );
    if (!newSession) return sendMessage("Failed to create session");
    sessionLink = `${getBaseUrl()}/setup/${newSession.id}`;
  } else sessionLink = `${getBaseUrl()}/setup/${existingSession.id}`;

  const embed = new EmbedBuilder()
    .setTitle("Timely - Set Timezone")
    .setColor(colors.blue)
    .setDescription(`Set your timezone by clicking [here](${sessionLink}).`)
    .setFooter({
      text: "You only need to do this once 🎉",
    });

  return sendEmbed(embed);
};
