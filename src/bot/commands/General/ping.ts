import { ComponentType } from "../../../api/utils/message/MessageOptions";
import BaseCommand, {
  CommandConfigData,
  CommandContext,
} from "../../utils/BaseCommand";
import { ExtendedClient } from "../../utils/ExtendedClient";
import Log from "../../utils/Log";

export default new (class PingCommand implements BaseCommand {
  config: CommandConfigData = {
    name: "ping",
    description: "The best command ever created!",
    aliases: ["pong", "hello"],
  };

  execute = async (ctx: CommandContext, ...args: any[]) => {
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
      await ctx.client.rest.createMessage({
          content: `:warning: **An error occured** \`\`\`js\n${err}\`\`\``
      }, ctx.channel.id)
    }
  };
})();
