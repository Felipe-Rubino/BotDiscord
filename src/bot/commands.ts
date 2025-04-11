import { Message, NewsChannel, TextChannel, ThreadChannel } from "discord.js";

export class Commands {
    static async handle(message: Message) {
        if (message.author.bot) return;
        if (!message.content.startsWith("!")) return; // só comandos com "!"

        const [comando, ...args] = message.content.slice(1).split(" ");

        switch (comando.toLowerCase()) {
            case "ping":
                await message.reply("pong! 🏓");
                break;

            case "oi":
                await message.reply("O seu viado!");
                break;
            case "lucas":
                await message.reply("eu tava zoando com voces");
                break;
            case "careca":
                await message.reply({
                    files: ["https://cdn.discordapp.com/attachments/280787506306220032/1360279294118465657/8854A1CA-5C3E-49D9-831A-9AE549FA29E0.png?ex=67fa8a50&is=67f938d0&hm=ef75df31434dafba1c1712a87b3c0582760396f5339d3698e0483fdb557b985b&"]
                });
                break;
            case "hora":
                await message.reply(`Agora são ${new Date().toLocaleTimeString()}`);
                break;
            case "trabalho":
                await message.reply("Já volto....... 🌾🌀");
                break;
            case "limpar":
                const quantidade = parseInt(args[0]);

                if (isNaN(quantidade) || quantidade < 1 || quantidade > 100) {
                    await message.reply("❌ Use um número de 1 a 100. Ex: `!limpar 10`");
                    return;
                }

                const canal = message.channel;

                if (
                    canal instanceof TextChannel ||
                    canal instanceof NewsChannel ||
                    canal instanceof ThreadChannel
                ) {
                    try {
                        await message.delete(); 
                        const apagadas = await canal.bulkDelete(quantidade, true);
                        const aviso = await canal.send(`${apagadas.size} mensagens apagadas!`);
                        setTimeout(() => aviso.delete(), 5000);
                    } catch (error) {
                        console.error("Erro ao apagar mensagens:", error);
                        await message.reply("⚠️ Não consegui apagar as mensagens. Tenho permissão?");
                    }
                } else {
                    await message.reply("❌ Esse comando só funciona em canais de texto de servidor.");
                }
                break;
            case "ajuda":
                await message.reply(
                    `Comandos disponíveis:\n` +
                    `• !ping - responde pong\n` +
                    `• !oi - responde Olá\n` +
                    `• !ajuda - mostra essa mensagem`
                );
                break;

            default:
                await message.reply(`Comando não reconhecido. Digite \`!ajuda\` para ver os comandos.`);
                break;
        }
    }
}