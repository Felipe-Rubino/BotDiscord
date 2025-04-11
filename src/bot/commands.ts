import { AudioPlayerStatus, createAudioPlayer, createAudioResource, entersState, joinVoiceChannel, VoiceConnectionStatus } from "@discordjs/voice";
import { Message, NewsChannel, TextChannel, ThreadChannel } from "discord.js";
import play from "play-dl";
export class Commands {
    static async handle(message: Message) {
        if (message.author.bot) return;
        if (!message.content.startsWith("!")) return;

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
            case "raio":
                await message.reply("Opa gosto de raio ⚡ !")
                break;
            case "ban":
                const usuario = message.mentions.users.first();
                if (!usuario) {
                    await message.reply("Você precisa mencionar um usuário para banir.");
                    return;
                }
                const membro = message.guild?.members.cache.get(usuario.id);
                if (!membro) {
                    await message.reply("Usuário não encontrado no servidor.");
                    return;
                }
                if (!membro.bannable) {
                    await message.reply("Não posso banir esse usuário. Ele tem um cargo mais alto que o meu?");
                    return;
                }
                try {
                    await membro.ban({ reason: "Banido pelo bot." });
                    await message.reply(`${usuario.tag} foi executado com sucesso!`);
                }
                catch (error) {
                    console.error("Erro ao banir usuário:", error);
                    await message.reply("Não consegui banir o usuário.");
                }
                break;
            case "mutar":
                const usuarioMute = message.mentions.users.first();
                if (!usuarioMute) {
                    await message.reply("Você precisa mencionar um usuário para mutar.");
                    return;
                }
                const membroMute = message.guild?.members.cache.get(usuarioMute.id);
                if (!membroMute?.manageable) {
                    await message.reply("Não posso mutar esse usuário.");
                    return;
                }
                try {
                    const quantidade = parseInt(args[1]);
                    const duracaoMs = quantidade * 60 * 1000;
                    await membroMute.timeout(duracaoMs, "Mutado pelo bot.");
                    await message.reply(`${usuarioMute.tag} foi mutado com sucesso!`);
                } catch (error) {
                    console.error("Erro ao mutar usuário:", error);
                    await message.reply("Não consegui mutar o usuário.");
                }
                break;
            case "play":
                const canalVoz = message.member?.voice.channel;
                if (!canalVoz) {
                    await message.reply("Você precisa estar em um canal de voz!");
                    return;
                }

                const url = args[0];
                if (!url || !play.yt_validate(url)) {
                    await message.reply("Por favor, envie um link válido do YouTube.");
                    return;
                }

                try {
                    const stream = await play.stream(url);
                    const resource = createAudioResource(stream.stream, {
                        inputType: stream.type
                    });

                    const player = createAudioPlayer();
                    player.play(resource);

                    const connection = joinVoiceChannel({
                        channelId: canalVoz.id,
                        guildId: message.guild!.id,
                        adapterCreator: message.guild!.voiceAdapterCreator,
                    });

                    connection.subscribe(player);

                    await entersState(connection, VoiceConnectionStatus.Ready, 30_000);

                    player.on(AudioPlayerStatus.Playing, () => {
                        console.log("Tocando música agora.");
                    });

                    player.on(AudioPlayerStatus.Idle, () => {
                        connection.destroy();
                    });

                    await message.reply("Tocando agora!");
                } catch (err) {
                    console.error("Erro ao tocar música:", err);
                    await message.reply("Não consegui tocar a música.");
                }
                break;
            case "limpar":
                const quantidade = parseInt(args[0]);

                if (isNaN(quantidade) || quantidade < 1 || quantidade > 100) {
                    await message.reply("Use um número de 1 a 100. Ex: `!limpar 10`");
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