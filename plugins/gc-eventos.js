const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;

  // Reacción inicial
  await conn.sendMessage(chatId, {
    react: { text: '📅', key: msg.key }
  });

  try {
    const eventosInfo = `Nada aún!.`;

    // Enviar mensaje con la información de eventos
    await conn.sendMessage(chatId, {
      text: eventosInfo
    }, { quoted: msg });

    // Reacción de éxito
    await conn.sendMessage(chatId, {
      react: { text: '✅', key: msg.key }
    });

  } catch (err) {
    console.error('❌ Error en comando eventos:', err);
    await conn.sendMessage(chatId, {
      text: '❌ No se pudo obtener la información de eventos. Intenta más tarde.'
    }, { quoted: msg });
  }
};

handler.command = ['evento', 'eventos', 'eventofutabuclub'];
handler.tags = ['grupo'];
handler.help = ['eventos'];
handler.group = true;

module.exports = handler;
