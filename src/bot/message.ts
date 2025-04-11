import { Message } from "discord.js";
import { client } from "./bot";


export class Response {
    static async handleMention(message: Message) {
      if (message.author.bot) return;
  
      const isMentioned = message.mentions.has(client.user!);
      if (isMentioned) {
        await message.reply("oi 👋");
      }
    }
  }