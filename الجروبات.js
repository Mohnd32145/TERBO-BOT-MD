let handler = async (m, { conn, participants }) => { 
    let now = new Date() * 1 
    let groups = Object.entries(conn.chats)
        .filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce)
        .map(v => v[0]) 
    let txt = '' 
  
    for (let [jid, chat] of Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)) { 
        txt += `${await conn.getName(jid)}\n${jid} [${chat?.metadata?.read_only ? 'مقفولة' : 'مفتوحة'}]\n${db.data.chats[jid] == undefined ? db.data.chats[jid] = { 
            welcome: false, 
            antiLink: false, 
            delete: true, 
        } : db.data.chats[jid].expired ? msToDate(db.data.chats[jid].expired - now) : 'مجموعة منتهية الصلاحية غير منظمة'} 
        ${db.data.chats[jid].welcome ? '✅' : '❌'} *الترحيب التلقائي*
        ${db.data.chats[jid].antiLink ? '✅' : '❌'} *الروابط المضادة*\n\n` 
    }
    m.reply(`*📑 قائمه الجروبات اللي تربو بداخلها:*
    *🚀 مجموع الجروبات:* ${groups.length} 
  
    ${txt} 
  
    `.trim()) 
} 

handler.help = ['grouplist'] 
handler.tags = ['group'] 
handler.command = /^(group(s|list)|(s|list)group)|الجروبات$/i 

export default handler

function msToDate(ms) { 
    let temp = ms 
    let days = Math.floor(ms / (24 * 60 * 60 * 1000)); 
    let daysms = ms % (24 * 60 * 60 * 1000); 
    let hours = Math.floor((daysms) / (60 * 60 * 1000)); 
    let hoursms = ms % (60 * 60 * 1000); 
    let minutes = Math.floor((hoursms) / (60 * 1000)); 
    let minutesms = ms % (60 * 1000); 
    let sec = Math.floor((minutesms) / (1000)); 
    return `${days} يوم ${hours} ساعة ${minutes} دقيقة ${sec} ثانية`; 
                                                  }
