const dotenv = require('dotenv');
dotenv.config();

if (!process.env.DISCORD_TOKEN)
    throw new Error(
        "Variável de ambiente DISCORD_PUBLIC_KEY não definida ou não encontrada",
    );
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

export const PORT = parseInt(process.env.PORT || "3100", 10);
export const HOST = "RENDER" in process.env ? `0.0.0.0` : `localhost`;
export const BASE_URL =
  "RENDER_EXTERNAL_URL" in process.env
    ? process.env.RENDER_EXTERNAL_URL
    : `http://${HOST}:${PORT}`;