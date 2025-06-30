require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const HUMAN_OVERRIDE_KEYWORDS = ['atendente', 'humano', 'pessoa'];
let atendimentoHumanoAtivo = {};

const client = new Client({
  authStrategy: new LocalAuth({ clientId: "crm-assistente" }),
  puppeteer: {
    headless: false, // você pode trocar para true depois que funcionar
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', (qr) => {
  console.log('📲 Escaneie este QR Code com o WhatsApp:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ Bot conectado com sucesso!');
});

client.on('message', async (msg) => {
  const from = msg.from;
  const texto = msg.body.toLowerCase();

  if (HUMAN_OVERRIDE_KEYWORDS.some(p => texto.includes(p))) {
    atendimentoHumanoAtivo[from] = true;
    await msg.reply('👩‍💼 Um atendente humano será acionado. Aguarde...');
    return;
  }

  if (atendimentoHumanoAtivo[from]) {
    console.log(`[${from}] Atendimento humano ativado. Ignorando resposta automática.`);
    return;
  }
  const delay = Math.floor(Math.random() * 2000) + 2000;
  setTimeout(() => {
    msg.reply(textoResposta);
  }, delay);
  try {
    const resposta = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é uma assistente virtual de uma clínica de estética. Seja simpática, objetiva e ofereça sempre agendamento ou pagamento como solução.'
        },
        {
          role: 'user',
          content: msg.body
        }
      ]
    });

    const textoResposta = resposta.choices[0].message.content;
    await msg.reply(textoResposta);
  } catch (erro) {
    console.error('❌ Erro ao consultar o GPT:', erro);
    await msg.reply('Desculpe, não consegui responder agora. Tente novamente em breve.');
  }
});

// ✅ ESSA LINHA é a que estava faltando antes
client.initialize();
