/*const handler = async (msg, { conn }) => {
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
    react: { text: '🎄', key: msg.key }
  });

  try {
    const texto = `🎄 *_SECCIÓN AYUDA (EVENTO NAVIDAD)_*

Si necesitas ayuda para conseguir imágenes futanaris relacionadas con la navidad, puedes usar los siguientes enlaces:

🔗 https://rule34.xxx/index.php?page=post&s=list&tags=christmas+futanari+&pid=0  
🔗 https://rule34.xxx/index.php?page=post&s=list&tags=christmas+futa&pid=0`;

    await conn.sendMessage(chatId, {
      text: texto
    }, { quoted: msg });

    // Reacción de éxito
    await conn.sendMessage(chatId, {
      react: { text: '✅', key: msg.key }
    });

  } catch (err) {
    console.error('❌ Error en el comando ayuda_evento:', err);
    await conn.sendMessage(chatId, {
      text: '❌ No se pudo mostrar la ayuda del evento.'
    }, { quoted: msg });
  }
};

// ✅ Cambio importante: handler.command es array de strings
handler.command = ['ayuda_evento'];
handler.tags = ['grupo'];
handler.help = ['eventos'];
handler.group = true;
handler.reaction = '🎄';

module.exports = handler;
*/
