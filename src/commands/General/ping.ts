import { ComponentType, SlashCommandBuilder } from "discord.js";
import BaseCommand, {
  CommandContext,
} from "../../utils/BaseCommand";
import Log from "../../utils/Log";

export default new (class PingCommand implements BaseCommand {
  data: SlashCommandBuilder = new SlashCommandBuilder()
    .setName(`ping`)
    .setDescription("The best command ever created!")

  execute = async (ctx: CommandContext) => {
    try {
      await ctx.channel.send({
        embeds: [
          {
            title: `Hello World`
          }
        ],
        components: [
          {
            type: 1,
            components: [
              {
                type: ComponentType.SelectMenu,
                custom_id: "hello-world",
                options: [
                  {
                    label: "Help!",
                    value: "help",
                    description: "Help me!"
                  }
                ]
              }
            ]
          },
          {
            type: 1,
            components: [
              {
                type: ComponentType.Button,
                style: 1,
                label: `Click Me!`,
                custom_id: "click-me",
              }
            ]
          }
        ]
      })
    } catch (err) {
      Log.error(err);
      ctx.channel.send({
          content: `:warning: **An error occured** \`\`\`js\n${err}\`\`\``
      })
    }
  };
})();
