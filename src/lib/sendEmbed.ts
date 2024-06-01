import {
  APIEmbed,
  InteractionResponseType,
  MessageFlags,
} from "discord-api-types/v10";
import {
  ActionRowBuilder,
  ButtonBuilder,
  type EmbedBuilder,
} from "@discordjs/builders";

interface MessageData {
  embeds: APIEmbed[];
  flags: MessageFlags;
  components?: ActionRowBuilder<ButtonBuilder>[];
}

const sendEmbed = (embed: EmbedBuilder, components?: any) => {
  const data: MessageData = {
    embeds: [embed.toJSON()],
    flags: MessageFlags.Ephemeral,
  };

  if (components) data.components = components;

  return Response.json({
    type: InteractionResponseType.ChannelMessageWithSource,
    data,
  });
};

export default sendEmbed;
