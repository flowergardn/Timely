import { EmbedBuilder } from "@discordjs/builders";
import { type CommandOptions } from "~/interfaces/CommandOptions";
import sendEmbed from "~/lib/sendEmbed";
import { getUser } from "~/lib/user";
import { colors } from "~/lib/utils";
import * as timezones from "~/lib/timezones";

export const execute = async (opt: CommandOptions) => {
  const allUsers = Object.values(opt.interaction.data.resolved.users);
  const discordUser = allUsers.shift();

  if (!discordUser)
    return Response.json("No user found", {
      status: 500,
    });

  const user = await getUser(discordUser.id);

  if (user === null) {
    const embed = new EmbedBuilder()
      .setTitle(`That user doesn't use Timely!`)
      .setDescription("You should suggest them to use it <3")
      .setColor(colors.red);
    return sendEmbed(embed);
  }

  const embed = new EmbedBuilder()
    .setTitle(`${discordUser.global_name}'s time`)
    .setColor(colors.blue);

  const time = timezones.getTime(user.timezone);

  embed.setFields([
    {
      name: "Timezone",
      value: `${user.timezone} (${time.format("Z")} UTC)`,
    },
    {
      name: "Time",
      value: `${time.format("h:mm A")} - ${time.format("dddd, MMMM D, YYYY")}`,
    },
  ]);

  return sendEmbed(embed);
};
