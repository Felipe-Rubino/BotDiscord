import fastify from "fastify";
import cors from "@fastify/cors";
import { BASE_URL, HOST, PORT } from "@/constants";


export const startServer = async () => {
  const app = fastify();
  app.register(cors, {
    origin: "*",
  });

  try {
    app.listen({ port: PORT, host: HOST }).then(() => {
      console.log(`🚀 HTTP server running on ${BASE_URL}/api`);
    });
  } catch (err) {
    console.error("Erro ao iniciar o servidor Fastify", err);
    process.exit(1);
  }
};
