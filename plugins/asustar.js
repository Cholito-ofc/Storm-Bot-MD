module.exports = {
  name: 'asustar',
  alias: ['hackwa', 'broma'],
  description: 'Simula un hackeo de WhatsApp (solo broma)',

  async execute(sock, m, args) {
    try {
      const nombreVictima = args.join(' ') || 'la víctima';

      const fases = [
        `🔒 INICIANDO ATAQUE A ${nombreVictima}...`,
        `⚙️ DESCIFRANDO CLAVES ENCRIPTADAS...`,
        `📡 INTERCEPTANDO MENSAJES PRIVADOS...`,
        `📲 CLONANDO WHATSAPP EN LA NUBE...`,
        '⚠️ PROGRESO: 10%',
        '⚠️ PROGRESO: 30%',
        '⚠️ PROGRESO: 50%',
        '⚠️ PROGRESO: 70%',
        '⚠️ PROGRESO: 90%',
        '✅ ATAQUE COMPLETO: 100%',
        `✅ SE HA ACCEDIDO A WHATSAPP DE ${nombreVictima}... ERA BROMA 😄`
      ];

      for (let fase of fases) {
        await sock.sendMessage(m.key.remoteJid, { text: fase }, { quoted: m });
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('❌ Error en el comando asustar:', error);
      await sock.sendMessage(m.key.remoteJid, { text: '❌ Hubo un error al ejecutar el comando.' }, { quoted: m });
    }
  }
};