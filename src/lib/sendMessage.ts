import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { InteractionResponseType, MessageFlags } from "discord-api-types/v10";

interface MessageData {
  content: string;
  flags: MessageFlags;
  components?: any;
}

const sendMessage = (
  message: string,
  components?: ActionRowBuilder<ButtonBuilder>[],
) => {
  const data: MessageData = {
    content: message,
    flags: MessageFlags.Ephemeral,
  };

  if (components) data.components = components;

  return Response.json({
    type: InteractionResponseType.ChannelMessageWithSource,
    data,
  });
};

export default sendMessage;
