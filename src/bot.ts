import { config } from "dotenv";
import * as pTimeout from "p-timeout";
import Telegraf from "telegraf";
import axios from "axios";
import { rocketPipe as p } from "rocket-pipes";

config();

async function bootstrap() {
  console.log("POSTGRES_HOST =", process.env.POSTGRES_HOST);
  // await databaseConnect();
  const bot = new Telegraf(process.env.TELEGRAM_TOKEN!);

  // request(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/deleteWebhook`)
  // .then(() => bot.startPolling()
  // );

  p(
    () =>
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/deleteWebhook`,
    axios.get,
    bot.startPolling
  );

  if (process.env.DRY_RUN) {
    process.exit(0);
  }
}

pTimeout(bootstrap(), 60 * 1000, "Bot start timeout").catch((e: unknown) => {
  console.error("Something went wrong", e);
  process.exit(1);
});
