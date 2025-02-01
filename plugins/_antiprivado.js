export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
    try {
        // تعريف رسالة جهة الاتصال
        let fkontak = {
            "key": {
                "participants": "0@s.whatsapp.net",
                "remoteJid": "status@broadcast",
                "fromMe": false,
                "id": "Halo"
            },
            "message": {
                "contactMessage": {
                    "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            },
            "participant": "0@s.whatsapp.net"
        }

        // التحقق من وجود نص في الرسالة
        if (!m.text) return false;

        // تعريف البادئات المسموح بها
        let prefixRegex = new RegExp('^[' + (global.opts?.prefix || '!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

        let usedPrefix, command;
        if (prefixRegex.test(m.text)) {
            usedPrefix = m.text.match(prefixRegex)[0];
            command = m.text.slice(usedPrefix.length).trim().split(' ')[0];
        }

        // استثناء رسائل البوت نفسه
        if (m.isBaileys && m.fromMe) return true;
        
        // عدم تشغيل الكود في المجموعات
        if (m.isGroup) return false;
        
        // منع الرسائل الخاصة إذا كانت الميزة مفعلة
        let botSettings = global.db.data.settings?.[conn?.user?.jid] || {};
        if (botSettings.antiPrivate && !isOwner && !isROwner) {
            await m.reply(`*${lenguajeGB['smsCreA']()}* *@${m.sender.split`@`[0]}*, ${lenguajeGB['smsprivado']()}\n${global.nn || ''}`);
            await conn.updateBlockStatus(m.chat, 'block');
            return true;
        }

        // تجاهل بعض الكلمات المحددة
        let ignoredWords = ['serbot', 'jadibot', 'deletesesion', 'estado', 'bots'];
        if (ignoredWords.some(word => m.text.includes(word))) return true;

        return false;
    } catch (error) {
        console.error("❌ خطأ في دالة `before()`: ", error);
        return false;
    }
}