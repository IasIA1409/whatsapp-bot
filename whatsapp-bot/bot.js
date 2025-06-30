const venom = require('venom-bot');

venom
  .create({
    session: 'crm-bot',
    multidevice: true,
    useChrome: false, // ⬅️ ESSA LINHA É ESSENCIAL para forçar o uso do caminho customizado abaixo
    puppeteerOptions: {
      headless: 'new',
      executablePath: 'C:\\Users\\T-GAMER\\Downloads\\chromium-114\\chrome.exe',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
  })
  .then((client) => start(client))
  .catch((err) => console.error('Erro ao iniciar bot:', err));


function start(client) {
  console.log('✅ Bot conectado ao WhatsApp');

  const numero = '551996029741'; // 🔁 Substitua pelo seu número
  const mensagem = 'Olá! Seu atendimento está confirmado para amanhã às 14h.';

  client.sendText(`${numero}@c.us`, mensagem)
    .then(() => console.log('📤 Mensagem enviada com sucesso!'))
    .catch((erro) => console.error('❌ Erro ao enviar mensagem:', erro));
}
