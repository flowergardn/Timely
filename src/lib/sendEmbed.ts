import {
  type APIEmbed,
  InteractionResponseType,
  MessageFlags,
} from "discord-api-types/v10";
import type {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
} from "@discordjs/builders";

interface MessageData {
  embeds: APIEmbed[];
  flags: MessageFlags;
  components?: ActionRowBuilder<ButtonBuilder>[];
}

const sendEmbed = (
  embed: EmbedBuilder,
  components?: ActionRowBuilder<ButtonBuilder>[],
) => {
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
