import { DISCORD_TOKEN } from "@/constants";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { Response } from "./message";
import { Commands } from "./commands";
import { Player } from "discord-player";


export const client: Client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates, 
    ],
});

export const player = new Player(client);

export const startBot = async () => {
    client.once("ready", () => {
      console.log(`✅ Bot do Discord logado como ${client.user?.tag}`);
    });
  
    client.on(Events.MessageCreate, async (message) => {
        await Response.handleMention(message);
        await Commands.handle(message);
      });!
  
    await client.login(DISCORD_TOKEN);
  };    