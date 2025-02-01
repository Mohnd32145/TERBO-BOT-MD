// استيراد الدوال من المكتبات المخصصة لنظام المستويات والرسم
import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'

// تعريف دالة تستدعى قبل تنفيذ العملية الأساسية
export function before(m, { conn }) {

    // إنشاء رسالة تواصل وهمية لإظهارها في الردود
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

    // الحصول على المستخدم أو الشخص المذكور في الرسالة
    let who = m.mentionedJid && m.mentionedJid[0] 
        ? m.mentionedJid[0] 
        : m.fromMe 
            ? conn.user.jid 
            : m.sender
    let mentionedJid = [who] // تعريف قائمة الأشخاص المذكورين
    let username = conn.getName(who) // الحصول على اسم المستخدم

    // الوصول إلى بيانات المستخدم والمحادثة من قاعدة البيانات
    let user = global.db.data.users[m.sender]
    let chat = global.db.data.chats[m.chat]

    // التحقق إذا كانت خاصية الترقية التلقائية معطلة في المحادثة
    if (!chat.autolevelup) return !0

    // حساب المستوى السابق للمستخدم
    let before = user.level * 1

    // التحقق من إمكانية ترقية المستوى وزيادة المستوى إن أمكن
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    
    if (before !== user.level) { // إذا تم تغيير المستوى

        // إرسال رسالة تهنئة للترقية
        conn.reply(m.chat, `*「  تمت ترقيه المستوي 🆙🥳 」*\n\nمبروك يروحي 👏\n\n▢ ${lenguajeGB.smsAutoLv2()} ${before}\n▢ ${lenguajeGB.smsAutoLv3()} ${user.level}\n▢ ${lenguajeGB.smsAutoLv4()} ${user.role}\n\n*_${lenguajeGB.smsAutoLv6()}_*`, 
            fkontak, 
            {
                contextInfo: { 
                    externalAdReply: { 
                        mediaUrl: null, 
                        mediaType: 1, 
                        description: null, 
                        title: wm, 
                        body: ' 💫 𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 🥳 ', 
                        previewType: 0, 
                        thumbnail: img.getRandom(), 
                        sourceUrl: redes.getRandom()
                    }
                }
            }
        )
    }

    // جوائز خاصة تعتمد على مستويات محددة
    // تعريف قوائم للعناصر الخاصة والمكافآت
    let especial = ['limit', 'diamond', 'joincount', 'emerald', 'berlian', 'kyubi', 'gold', 'money', 'tiketcoin', 'stamina'].getRandom()
    let especialCant = [6, 7, 6, 7, 6, 6, 6, 7, 8, 9, 8, 3, 9, 7, 9].getRandom()

    // مثال على حالة لمستوى معين (المستوى 8)
    if (user.level == 8) {
        conn.reply(m.chat, `*تهانينا على الوصول إلى المستوى 8!!* 🏆\n\n𓃠 *${especialCant * 1} ${global.rpgshop.emoticon(especial)}*`, 
            m, 
            {
                contextInfo: { 
                    externalAdReply: { 
                        mediaUrl: null, 
                        mediaType: 1, 
                        description: null, 
                        title: wm, 
                        body: ' 💫 𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 🥳 ', 
                        previewType: 0, 
                        thumbnail: img.getRandom(), 
                        sourceUrl: redes.getRandom()
                    }
                }
            }
        )

        // إضافة الجوائز إلى بيانات المستخدم
        user[especial] += especialCant * 1
    }

    // يمكنك تكرار نفس النمط للمستويات الأخرى (15، 25، 35...) وتغيير الجوائز وفقًا للمستوى
}