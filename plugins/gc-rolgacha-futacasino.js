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
    react: { text: '🌸', key: msg.key }
  });

  try {
    const rolgacha = `🌸| Comandos Gacha:

_*[BOT SUMIKA]*_
• #rw - Girar waifu.
• #waifus - Ver tus waifus.
• #c - Reclamar waifu.
• #ginfo - Ver tu información de gacha (Tiempo restante para volver a tirar o reclamar).
• #trade [Tu waifu] [Waifu del usuario a intercambiar] - Intercambias tu waifu por la del otro usuario.
• #wshop - Ver waifus en venta.
• #sell [Precio] [Nombre de la waifu] - Pon a la venta tu waifu.
• #buyc [Nombre de la waifu] - Comprar waifu a la venta.
• #delwaifu [Nombre de la waifu] - Eliminar una waifu reclamada.
• #givechar [Usuario] [Nombre de la waifu] - Regala waifu a un usuario.

_° Mas comandos de gacha usando #menu y mira la sección Gacha!_.`;

    // Enviar mensaje con info de gacha
    await conn.sendMessage(chatId, {
      text: rolgacha
    }, { quoted: msg });

    // Reacción de éxito
    await conn.sendMessage(chatId, {
      react: { text: '✅', key: msg.key }
    });

  } catch (err) {
    console.error('❌ Error en comando rolgacha:', err);
    await conn.sendMessage(chatId, {
      text: '❌ No se pudo enviar la información de gacha en este momento.'
    }, { quoted: msg });
  }
};

handler.command = ['rolgacha', 'gachainfo', 'infog'];
handler.tags = ['grupo'];
handler.help = ['rolgacha'];
handler.group = true;
handler.reaction = '🌸';

module.exports = handler;
