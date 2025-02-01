import { downloadContentFromMessage } from "@whiskeysockets/baileys"
import db from '../database.js' // تأكد من أنك تستورد قاعدة البيانات إذا كانت في ملف منفصل

export async function before(m, { isAdmin, isBotAdmin }) {
    let chat = db.data.chats[m.chat]
    
    // التأكد من تفعيل antiver وعدم حظر الدردشة
    if (!chat.antiver || chat.isBanned) return
    
    // التحقق من نوع الرسالة (عرض لمرة واحدة)
    if (m.mtype === 'viewOnceMessageV2' || m.mtype.hasOwnProperty("viewOnce")) {
        try {
            let msg = m.message.viewOnceMessageV2.message
            let type = Object.keys(msg)[0]

            // تحميل المحتوى من الرسالة
            let media = await downloadContentFromMessage(msg[type], type === 'imageMessage' ? 'image' : 'video')
            let buffer = Buffer.from([])
            
            // تجميع البيانات
            for await (const chunk of media) {
                buffer = Buffer.concat([buffer, chunk])
            }

            // إرسال الملف حسب نوعه
            if (/video/.test(type)) {
                await this.sendFile(m.chat, buffer, 'error.mp4', `${msg[type].caption || ''}` + lenguajeGB.smsAntiView1(), m)
            } else if (/image/.test(type)) {
                await this.sendFile(m.chat, buffer, 'error.jpg', `${msg[type].caption || ''}` + lenguajeGB.smsAntiView2(), m)
            }

        } catch (err) {
            console.error('خطأ أثناء معالجة الرسالة ذات العرض لمرة واحدة:', err)
            await this.sendMessage(m.chat, { text: '❌ حدث خطأ أثناء محاولة عرض الرسالة المخفية، حاول مرة أخرى لاحقاً.' }, { quoted: m })
        }
    }
}