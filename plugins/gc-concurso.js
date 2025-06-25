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
    react: { text: '🏆', key: msg.key }
  });

  try {
    const concursoInfo = `Nada aún!`;

    await conn.sendMessage(chatId, {
      text: concursoInfo
    }, { quoted: msg });

    // Reacción de éxito
    await conn.sendMessage(chatId, {
      react: { text: '✅', key: msg.key }
    });

  } catch (err) {
    console.error('❌ Error en comando concurso:', err);
    await conn.sendMessage(chatId, {
      text: '❌ No se pudo mostrar la información del concurso. Intenta más tarde.'
    }, { quoted: msg });
  }
};

handler.command = ['concurso', 'concursofutabuclub'];
handler.tags = ['grupo'];
handler.help = ['concurso'];
handler.group = true;

module.exports = handler;

