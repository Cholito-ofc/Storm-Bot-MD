const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;

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
