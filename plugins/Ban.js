const axios = require("axios");

const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;
  const senderId = msg.key.participant || msg.key.remoteJid;
  const senderNum = senderId.replace(/[^0-9]/g, "");
  const isGroup = chatId.endsWith("@g.us");

  const isOwner = global.owner.some(([id]) => id === senderNum);
  if (!isOwner) {
    return conn.sendMessage(chatId, {
      text: "⛔ *Acceso denegado*\nEste comando solo está disponible para el *dueño del bot*.",
    }, { quoted: msg });
  }

  if (!isGroup) {
    return conn.sendMessage(chatId, {
      text: "👥 Este comando solo se puede usar en grupos.",
    }, { quoted: msg });
  }

  const context = msg.message?.extendedTextMessage?.contextInfo;
  const target = context?.participant;

  if (!target) {
    return conn.sendMessage(chatId, {
      text: "❗ Responde al mensaje del usuario que deseas *hackear* (broma).",
    }, { quoted: msg });
  }

  const targetNum = target.replace(/[^0-9]/g, "");
  if (global.owner.some(([id]) => id === targetNum)) {
    return conn.sendMessage(chatId, {
      text: "🛡️ No puedes hackear al *dueño del bot*.",
    }, { quoted: msg });
  }

  const mensajeHack = `
╭━━━[ *INICIANDO ATAQUE* ]━━━╮
┃ 👤 Objetivo: @${targetNum}
┃ 🌐 Escaneo de red...
┃ 📡 Clonando base de datos...
┃ 🔍 Revisando chats y stickers...
┃ 🧠 Acceso a memoria interna...
┃ 💾 Extrayendo multimedia...
┃ 🛑 Borrando privacidad...
┃ ✅ *Hackeo completado con éxito*
╰━━━━━━━━━━━━━━━━━━━━━━━╯
😈 *Todo fue una broma. No llores.*
`;

  await conn.sendMessage(chatId, {
    text: mensajeHack,
    mentions: [target]
  }, { quoted: msg });

  // 🔗 URL del video (puedes cambiar esta URL)
  const videoUrl = "https://cdn.russellxz.click/f9c1cecf.mp4";

  try {
    const response = await axios.get(videoUrl, { responseType: 'arraybuffer' });

    await conn.sendMessage(chatId, {
      video: Buffer.from(response.data),
      mimetype: 'video/mp4',
      caption: "🎥 *Reacción del hackeo exitoso* 😈"
    }, { quoted: msg });
  } catch (error) {
    await conn.sendMessage(chatId, {
      text: "⚠️ No se pudo enviar el video. Verifica que el enlace esté activo y sea un `.mp4` válido.",
    }, { quoted: msg });
  }
};

handler.command = ["hackear", "asustar"];
module.exports = handler;