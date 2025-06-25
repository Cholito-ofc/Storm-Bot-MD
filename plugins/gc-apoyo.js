const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;

  // Reacción inicial
  await conn.sendMessage(chatId, {
    react: { text: '🔄', key: msg.key }
  });

  try {
    const texto = `*_Aca tienes los 2 bancos para transferir dinero para la mejora del bot!_*

*💸 Paypal:* colapsuspaypal2005@gmail.com (Benjamin Chacon)

*🏦 Banco Virtual (Mercado Pago, Uala, Etc)*
• Alias: COLAPSUSHD2020.UALA
• CBU/CVU: 0000007900204654633937`;

    await conn.sendMessage(chatId, {
      text: texto
    }, { quoted: msg });

    // Reacción final
    await conn.sendMessage(chatId, {
      react: { text: '✅', key: msg.key }
    });

  } catch (err) {
    console.error('❌ Error en el comando apoyo:', err);
    await conn.sendMessage(chatId, {
      text: '❌ No se pudo mostrar la información de apoyo en este momento.'
    }, { quoted: msg });
  }
};

// ✅ Cambio clave: evitar uso de RegExp
handler.command = ['apoyo', 'mejorar', 'apoyobot', 'mejorarbot'];
handler.help = ['apoyo'];
handler.tags = ['grupo'];
handler.group = true;
handler.reaction = '🔄';

module.exports = handler;
