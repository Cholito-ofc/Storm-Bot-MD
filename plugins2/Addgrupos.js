const fs = require("fs");
const path = require("path");

const handler = async (msg, { conn }) => {
  await conn.sendMessage(msg.key.remoteJid, {
    react: { text: "➕", key: msg.key }
  });

  const groupID = msg.key.remoteJid;
  if (!groupID.endsWith("@g.us")) {
    return await conn.sendMessage(groupID, {
      text: "⚠️ Este comando solo se puede usar dentro de un grupo.\n\n🛠️ *Sirve para activar el subbot en este grupo*."
    }, { quoted: msg });
  }

  const rawID = conn.user?.id || "";
  const subbotID = rawID.split(":")[0] + "@s.whatsapp.net";

  const filePath = path.join(process.cwd(), "grupo.json");
  let data = {};

  if (fs.existsSync(filePath)) {
    try {
      data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch {
      data = {};
    }
  }

  if (!Array.isArray(data[subbotID])) {
    data[subbotID] = [];
  }

  if (data[subbotID].includes(groupID)) {
    return await conn.sendMessage(groupID, {
      text: "ℹ️ Este grupo ya está autorizado para usar el subbot."
    }, { quoted: msg });
  }

  data[subbotID].push(groupID);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  await conn.sendMessage(groupID, {
    text: "✅ *Grupo autorizado correctamente.* Ahora el subbot responderá a todos los usuarios en este grupo. 💠"
  }, { quoted: msg });
};

handler.command = ['addgrupo'];
module.exports = handler;
