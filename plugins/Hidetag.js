/*const { generateWAMessageFromContent } = require("baileys");
const fs = require('fs');

const handler = async (msg, { conn, text, participants }) => {
  const chatId = msg.key.remoteJid;

  // Reacción inicial
  await conn.sendMessage(chatId, {
    react: { text: '📢', key: msg.key }
  });

  try {
    const users = participants.map((u) => conn.decodeJid(u.id));
    const quoted = msg.quoted || msg;
    const context = msg.quoted ? await msg.getQuotedObj() : msg.msg || msg.text || msg.sender;
    const type = msg.quoted ? quoted.mtype : 'extendedTextMessage';
    const messageContent = msg.quoted ? context.message[quoted.mtype] : { text: text || context };

    const forwardMsg = conn.cMod(
      msg.chat,
      generateWAMessageFromContent(
        msg.chat,
        { [type]: messageContent },
        { quoted: msg, userJid: conn.user.id }
      ),
      text || quoted.text,
      conn.user.jid,
      { mentions: users }
    );

    await conn.relayMessage(msg.chat, forwardMsg.message, { messageId: forwardMsg.key.id });

    // Reacción de éxito
    await conn.sendMessage(chatId, {
      react: { text: '✅', key: msg.key }
    });

  } catch (error) {
    console.error('❌ Error en comando hidetag:', error);

    const users = participants.map((u) => conn.decodeJid(u.id));
    const quoted = msg.quoted || msg;
    const mime = (quoted.msg || quoted).mimetype || '';
    const isMedia = /image|video|sticker|audio/.test(mime);
    const more = String.fromCharCode(8206);
    const invisibleGap = more.repeat(850);
    const caption = `${text ? text : '*Hola :D*'}`;

    try {
      let media = quoted.download && await quoted.download();
      if (isMedia && quoted.mtype === 'imageMessage') {
        await conn.sendMessage(msg.chat, {
          image: media,
          caption,
          mentions: users
        }, { quoted: msg });
      } else if (isMedia && quoted.mtype === 'videoMessage') {
        await conn.sendMessage(msg.chat, {
          video: media,
          mimetype: 'video/mp4',
          caption,
          mentions: users
        }, { quoted: msg });
      } else if (isMedia && quoted.mtype === 'audioMessage') {
        await conn.sendMessage(msg.chat, {
          audio: media,
          mimetype: 'audio/mpeg',
          fileName: 'Hidetag.mp3',
          mentions: users
        }, { quoted: msg });
      } else if (isMedia && quoted.mtype === 'stickerMessage') {
        await conn.sendMessage(msg.chat, {
          sticker: media,
          mentions: users
        }, { quoted: msg });
      } else {
        await conn.relayMessage(msg.chat, {
          extendedTextMessage: {
            text: `${invisibleGap}\n${caption}\n`,
            contextInfo: {
              mentionedJid: users,
              externalAdReply: {
                thumbnail: imagen1,
                sourceUrl: 'https://github.com/BrunoSobrino/TheMystic-Bot-MD'
              }
            }
          }
        }, {});
      }
    } catch (e) {
      await conn.sendMessage(chatId, {
        text: '❌ No se pudo enviar la notificación.'
      }, { quoted: msg });
    }
  }
};

handler.command = ['hidetag', 'notificar', 'notify'];
handler.group = true;
handler.admin = true;
handler.reaction = '📢';

module.exports = handler;*/
