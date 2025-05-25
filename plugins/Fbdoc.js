const axios = require('axios');

const handler = async (msg, { conn, text, command }) => {
  const chatId = msg.key.remoteJid;

  if (!text) {
    return await conn.sendMessage(chatId, {
      text: `✳️ Ejemplo de uso:\n📌 *${global.prefix + command}* https://fb.watch/ncowLHMp-x/`
    }, { quoted: msg });
  }

  if (!text.match(/(www\.facebook\.com|fb\.watch)/gi)) {
    return await conn.sendMessage(chatId, {
      text: `❌ *Enlace de Facebook inválido.*\n\n📌 Ejemplo:\n${global.prefix + command} https://fb.watch/ncowLHMp-x/`
    }, { quoted: msg });
  }

  await conn.sendMessage(chatId, {
    react: { text: '⏳', key: msg.key }
  });

  try {
    const res = await axios.get(`https://api.dorratz.com/fbvideo?url=${encodeURIComponent(text)}`);
    const results = res.data;

    if (!results || results.length === 0) {
      return await conn.sendMessage(chatId, {
        text: "❌ No se pudo obtener el video."
      }, { quoted: msg });
    }

    const caption = `📄 *Resoluciones disponibles:*\n${results.map(r => `- ${r.resolution}`).join('\n')}\n\n📥 *Video descargado como documento (720p)*\n🍧 *API:* api.dorratz.com\n\n───────\n© Azura Ultra & Cortana`;

    await conn.sendMessage(chatId, {
      document: { url: results[0].url },
      mimetype: 'video/mp4',
      fileName: 'facebook_video.mp4',
      caption
    }, { quoted: msg });

    await conn.sendMessage(chatId, {
      react: { text: '✅', key: msg.key }
    });

  } catch (err) {
    console.error("❌ Error en fbdoc:", err);
    await conn.sendMessage(chatId, {
      text: "❌ Ocurrió un error al procesar el enlace de Facebook."
    }, { quoted: msg });
  }
};

handler.command = ["fbdoc", "facebookdoc"];
module.exports = handler;
