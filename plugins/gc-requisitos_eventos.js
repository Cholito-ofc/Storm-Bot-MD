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
    react: { text: '🎁', key: msg.key }
  });

  try {
    const texto = `🎄 *_SECCIÓN REQUISITOS (EVENTO NAVIDAD)_*

⚠️| *REQUISITOS PARA PARTICIPAR*:
• ❌ *NO* usar IA/AI (Inteligencia Artificial).
• ❌ *NO* hacer uso de *collages*.
• 📐 La imagen debe tener un tamaño de *500x500px* o *1000x1000px* (para compatibilidad con WhatsApp y redes).
• 📝 El texto debe incluir: *"Futabu Club"* o *"Futabu Club!"* con tipografía navideña (opcional).
• 📸 Debes adjuntar una *captura o video del proceso* de edición.
• 💾 Exporta la imagen en formato *JPG* o *PNG*.
• 📤 Envía tu imagen en *buena calidad* (sin compresión excesiva).

🎅 ¡Gracias por participar y compartir tu creatividad!`;

    await conn.sendMessage(chatId, {
      text: texto
    }, { quoted: msg });

    // Reacción de éxito
    await conn.sendMessage(chatId, {
      react: { text: '✅', key: msg.key }
    });

  } catch (err) {
    console.error('❌ Error en el comando requisitos_evento:', err);
    await conn.sendMessage(chatId, {
      text: '❌ No se pudieron mostrar los requisitos del evento.'
    }, { quoted: msg });
  }
};

// ✅ Corrección: evitar RegExp y usar un array de strings
handler.command = ['requisitos_evento'];
handler.tags = ['grupo'];
handler.help = ['eventos'];
handler.group = true;
handler.reaction = '🎁';

module.exports = handler;*/
