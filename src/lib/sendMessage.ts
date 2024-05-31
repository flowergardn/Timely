import { InteractionResponseType, MessageFlags } from "discord-api-types/v10";

const sendMessage = (message: string) => {
  return Response.json({
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: message,
      flags: MessageFlags.Ephemeral,
    },
  });
};

export default sendMessage;
