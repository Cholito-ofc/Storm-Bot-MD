const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;
  const isGroup = chatId.endsWith("@g.us");

  if (!isGroup) {
    await conn.sendMessage(chatId, {
      text: "❌ Este comando solo puede usarse en grupos."
    }, { quoted: msg });
    return;
  }

  // Reacción inicial
  await conn.sendMessage(chatId, {
    react: { text: '💙', key: msg.key }
  });

  try {
    const telegramInfo = `Nuestro grupo de Telegram!
Link: https://t.me/FutabuClub`;

    // Enviar mensaje con el link de Telegram
    await conn.sendMessage(chatId, {
      text: telegramInfo
    }, { quoted: msg });

    // Reacción de éxito
    await conn.sendMessage(chatId, {
      react: { text: '✅', key: msg.key }
    });

  } catch (err) {
    console.error('❌ Error en comando telegram:', err);
    await conn.sendMessage(chatId, {
      text: '❌ No se pudo obtener el enlace de Telegram. Intenta más tarde.'
    }, { quoted: msg });
  }
};

handler.command = ['telegram', 'grupodetelegram', 'linktelegram'];
handler.tags = ['grupo'];
handler.help = ['telegram'];
handler.group = true;

module.exports = handler;
