require('dotenv').config();
const { create } = require('venom-bot');
const axios = require('axios');

create({
  session: 'augusto-gpt',
}).then((client) => start(client));

async function start(client) {
  client.onMessage(async (message) => {
    if (!message.isGroupMsg) {
      const promptUsuario = message.body;

      try {
        const resposta = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'Você é Augusto Santana, atendente humano da equipe da Iasmin Armellini. Nunca diga que é um robô. Use linguagem profissional, com expressões do interior paulista. Seu trabalho é atender clientes interessados em serviços de tráfego pago.'
              },
              {
                role: 'user',
                content: promptUsuario
              }
            ]
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );

        const respostaTexto = resposta.data.choices[0].message.content;
        await client.sendText(message.from, respostaTexto);

      } catch (erro) {
        console.error('Erro ao consultar OpenAI:', erro.message);
        await client.sendText(message.from, 'Opa, parece que deu um erro aqui. Tenta de novo em instantes!');
      }
    }
  });
}
