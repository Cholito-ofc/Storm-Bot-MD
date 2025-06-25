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
    react: { text: '📢', key: msg.key }
  });

  try {
    const comunidadInfo = `*GRUPO DE LA COMUNIDAD*

_⚠️| Este grupo será solamente de avisos o noticias relacionada con los grupos de la comunidad Futabu, solo podrán hablar los del Equipo de Staff y los miembros solo podrán ver. Usaremos este grupo ya que facilitará ver más rápido los mensajes, ya que en varios grupos se habla demasiado y se pierden._

Link: https://chat.whatsapp.com/GReWJQ0fNNcBvq0SIqGGFf`;

    // Enviar mensaje con la info del grupo de comunidad
    await conn.sendMessage(chatId, {
      text: comunidadInfo
    }, { quoted: msg });

    // Reacción de éxito
    await conn.sendMessage(chatId, {
      react: { text: '✅', key: msg.key }
    });

  } catch (err) {
    console.error('❌ Error en comando comunidad:', err);
    await conn.sendMessage(chatId, {
      text: '❌ No se pudo mostrar la información de la comunidad. Intenta más tarde.'
    }, { quoted: msg });
  }
};

handler.command = ['comunidad', 'grupocomunidad', 'grupoavisos'];
handler.tags = ['grupo'];
handler.help = ['comunidad'];
handler.group = true;

module.exports = handler;
