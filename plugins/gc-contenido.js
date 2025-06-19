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
    react: { text: '📄', key: msg.key }
  });

  try {
    // Contenido definido globalmente
    const contenido = `*_✅|CONTENIDO PERMITIDO_*
★ Futanari
★ Trapos/Femboy's
★ Hentai/Furry
★ Transexual
★ Porno normal

*_❌|CONTENIDO PROHIBIDO_*
✦ Earfuck
✦ Scat
✦ Necrofilia 
✦ Zoofilia
✦ Gore
✦ Vore
✦ CP (Child Porn)
✦ Toddler (Relación con bebés)
✦ Lolis/Shotas

⭐| Recuerda que la temática tiene que ser más de Futanari.`;

    // Enviar mensaje con contenido
    await conn.sendMessage(chatId, {
      text: contenido
    }, { quoted: msg });

    // Reacción de éxito
    await conn.sendMessage(chatId, {
      react: { text: '✅', key: msg.key }
    });

  } catch (err) {
    console.error('❌ Error en comando contenido:', err);
    await conn.sendMessage(chatId, {
      text: '❌ Ocurrió un error al mostrar el contenido. Intenta nuevamente.'
    }, { quoted: msg });
  }
};

handler.command = ['contenido', 'listacontenido', 'listcontenido', 'contenidopermitido'];
handler.tags = ['grupo'];
handler.help = ['contenido'];
handler.group = true;

module.exports = handler;
