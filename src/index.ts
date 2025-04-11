import { startBot } from "./bot/bot";
import { startServer } from "./http/server";


async function initializeApp() {
    try {
        await Promise.all([startBot(), startServer()]);
    } catch (err) {
        console.error("Erro ao iniciar aplicação", err);
    }
}
initializeApp();      