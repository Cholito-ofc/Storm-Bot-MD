const axios = require('axios');

/*──────────────── banderas ───────────────*/
const flagMap = [
  ['598','🇺🇾'],['595','🇵🇾'],['593','🇪🇨'],['591','🇧🇴'],
  ['509','🇭🇹'],['507','🇵🇦'],['506','🇨🇷'],['505','🇳🇮'],
  ['504','🇭🇳'],['503','🇸🇻'],['502','🇬🇹'],['501','🇧🇿'],
  ['57','🇨🇴'],['56','🇨🇱'],['55','🇧🇷'],['54','🇦🇷'],
  ['52','🇲🇽'],['51','🇵🇪'],['58','🇻🇪'],['34','🇪🇸'],
  ['1','🇺🇸']
];
const withFlag = n=>{
  const c=n.replace(/\D/g,'');
  for(const [p,f] of flagMap) if(c.startsWith(p)) return `${n} ${f}`;
  return n;
};

/*──────── colores ────────*/
const colors = {
  rojo:   '#ff3b30',
  azul:   '#007aff',
  morado: '#8e44ad',
  rosado: '#ff69b4',
  negro:  '#000000',
  verde:  '#34c759'
};

/*──────── helpers nombre (idéntico a qc) ────────*/
const qPush = q=>q?.pushName||q?.sender?.pushName||'';

async function niceName(jid,conn,chatId,push='',fallback=''){
  if(push && !/^\d+$/.test(push)) return push;
  if(chatId.endsWith('@g.us')){
    try{
      const meta=await conn.groupMetadata(chatId);
      const p=meta.participants.find(p=>p.id===jid);
      const n=p?.notify||p?.name;
      if(n && !/^\d+$/.test(n)) return n;
    }catch{}
  }
  try{
    const g=await conn.getName(jid);
    if(g && !/^\d+$/.test(g) && !g.includes('@')) return g;
  }catch{}
  const c=conn.contacts?.[jid];
  if(c?.notify && !/^\d+$/.test(c.notify)) return c.notify;
  if(c?.name   && !/^\d+$/.test(c.name))   return c.name;
  if(fallback && !/^\d+$/.test(fallback))  return fallback;
  return withFlag(jid.split('@')[0]);
}

/*──────── handler qc2 ────────*/
const handler = async (msg,{conn,args})=>{
try{
  const chat   = msg.key.remoteJid;
  const cInfo  = msg.message?.extendedTextMessage?.contextInfo;
  const quoted = cInfo?.quotedMessage;

  /* color */
  const first=(args[0]||'').toLowerCase();
  const bgColor = colors[first] || colors.negro;
  if(colors[first]) args.shift();

  /* texto */
  let texto=args.join(' ').trim();
  if(!texto && quoted)
    texto = quoted.conversation || quoted.extendedTextMessage?.text || '';
  if(!texto)
    return conn.sendMessage(chat,{text:'⚠️ Escribe algo o cita un mensaje.'},{quoted:msg});

  /* target */
  const jidTarget = quoted && cInfo?.participant
        ? cInfo.participant
        : msg.key.participant || msg.key.remoteJid;

  const name = await niceName(jidTarget,conn,chat,qPush(quoted),msg.pushName);

  /* avatar */
  let avatar='https://telegra.ph/file/24fa902ead26340f3df2c.png';
  try{ avatar=await conn.profilePictureUrl(jidTarget,'image'); }catch{}

  await conn.sendMessage(chat,{react:{text:'🎨',key:msg.key}});

  const quoteData={
    type:'quote',format:'png',
    backgroundColor:bgColor,
    width:800,height:0,scale:3, // auto-alto
    messages:[{
      entities:[],
      avatar:true,
      from:{id:1,name,photo:{url:avatar}},
      text:texto,
      replyMessage:{}
    }]
  };

  const {data}=await axios.post(
    'https://bot.lyo.su/quote/generate',
    quoteData,
    {headers:{'Content-Type':'application/json'}}
  );

  const imgBuf=Buffer.from(data.result.image,'base64');
  await conn.sendMessage(chat,
    {image:imgBuf,caption:`🖼️ qc2 (${first||'negro'})`},
    {quoted:msg});
  await conn.sendMessage(chat,{react:{text:'✅',key:msg.key}});

}catch(e){
  console.error('qc2 error:',e);
  await conn.sendMessage(msg.key.remoteJid,
    {text:'❌ Error al generar la imagen.'},
    {quoted:msg});
}};
handler.command=['qc2'];
module.exports=handler;
