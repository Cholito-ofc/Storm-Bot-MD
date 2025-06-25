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
    react: { text: '💜', key: msg.key }
  });

  try {
    const discordInfo = `Nuestro Server de Discord!
Link: https://discord.gg/UjdSaTESQG`;

    // Enviar mensaje con el link de Discord
    await conn.sendMessage(chatId, {
      text: discordInfo
    }, { quoted: msg });

    // Reacción de éxito
    await conn.sendMessage(chatId, {
      react: { text: '✅', key: msg.key }
    });

  } catch (err) {
    console.error('❌ Error en comando discord:', err);
    await conn.sendMessage(chatId, {
      text: '❌ No se pudo obtener el enlace de Discord. Intenta más tarde.'
    }, { quoted: msg });
  }
};

handler.command = ['serverdis', 'serverdiscord', 'discord', 'grupodiscord', 'linkdiscord'];
handler.tags = ['grupo'];
handler.help = ['discord'];
handler.group = true;

module.exports = handler;
