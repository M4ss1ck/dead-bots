import { Telegraf } from "telegraf";

const TOKENS_ARRAY =
  process.env.TOKENS?.split(",").map((token) => token.trim()) || [];
const contact = process.env.CONTACT ?? "@username";

for (const token of TOKENS_ARRAY) {
  const bot = new Telegraf(token);
  bot.use((ctx, next) => {
    try {
      if (ctx.from && ctx.chat?.type === "private") {
        return ctx.reply(
          `This bot is dead, please contact ${contact} for more information.`
        );
      }
    } catch (error) {
      console.log("There was an error with the following token:\n", token);
      console.error(error);
    }
  });
  bot.launch();
}
