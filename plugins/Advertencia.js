const fs = require("fs");
const path = require("path");

const WARN_PATH = path.resolve("warn_data.json");
const MAX_WARNINGS = 3;

const handler = async (msg, { conn, args, isAdmin, isBotAdmin, participants }) => {
  const chatId = msg.key.remoteJid;

  if (!msg.key.remoteJid.endsWith("@g.us")) {
    return conn.sendMessage(chatId, {
      text: "⚠️ Este comando solo se puede usar en grupos."
    }, { quoted: msg });
  }

  if (!isAdmin) {
    return conn.sendMessage(chatId, {
      text: "🚫 Solo los administradores pueden usar este comando."
    }, { quoted: msg });
  }

  if (!isBotAdmin) {
    return conn.sendMessage(chatId, {
      text: "🤖 El bot necesita ser administrador para expulsar usuarios."
    }, { quoted: msg });
  }

  const ctx = msg.message?.extendedTextMessage?.contextInfo;
  let targetID;

  if (ctx?.participant) {
    targetID = ctx.participant;
  } else if (args[0]) {
    const raw = args[0].replace(/[^0-9]/g, "");
    if (raw) targetID = `${raw}@s.whatsapp.net`;
  }

  if (!targetID) {
    return conn.sendMessage(chatId, {
      text: "🔎 Menciona a un usuario o responde a su mensaje para advertirlo."
    }, { quoted: msg });
  }

  const targetNum = targetID.split("@")[0];
  const senderNum = (msg.key.participant || msg.key.remoteJid).split("@")[0];

  const isTargetOwner = global.owner.some(([id]) => id === targetNum);
  if (isTargetOwner) {
    return conn.sendMessage(chatId, {
      text: "🛡️ No puedes advertir al dueño del bot."
    }, { quoted: msg });
  }

  let data = fs.existsSync(WARN_PATH) ? JSON.parse(fs.readFileSync(WARN_PATH)) : {};
  if (!data[chatId]) data[chatId] = {};

  if (!data[chatId][targetID]) {
    data[chatId][targetID] = 0;
  }

  data[chatId][targetID] += 1;
  const warnings = data[chatId][targetID];

  fs.writeFileSync(WARN_PATH, JSON.stringify(data, null, 2));

  if (warnings >= MAX_WARNINGS) {
    await conn.sendMessage(chatId, {
      text: `❌ @${targetNum} ha recibido *3 advertencias* y será eliminado del grupo.`,
      mentions: [targetID]
    }, { quoted: msg });

    await conn.groupParticipantsUpdate(chatId, [targetID], "remove");

    // Reiniciar advertencias
    data[chatId][targetID] = 0;
    fs.writeFileSync(WARN_PATH, JSON.stringify(data, null, 2));
  } else {
    await conn.sendMessage(chatId, {
      text: `⚠️ @${targetNum} ha recibido una advertencia.\n\n📌 Advertencias: *${warnings}/3*`,
      mentions: [targetID]
    }, { quoted: msg });
  }

  // Reacción visual
  await conn.sendMessage(chatId, {
    react: { text: "⚠️", key: msg.key }
  });
};

handler.command = ["advertencia", "warn"];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

module.exports = handler;