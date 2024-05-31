import { InteractionResponseType, MessageFlags } from "discord-api-types/v10";
import { EmbedBuilder } from "@discordjs/builders";

const sendEmbed = (embed: EmbedBuilder) => {
  return Response.json({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      embeds: [embed.toJSON()],
      flags: MessageFlags.Ephemeral,
    },
  });
};

export default sendEmbed;
