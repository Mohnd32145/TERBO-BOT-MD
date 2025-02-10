function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms % 3600000 / 60000);
    let s = Math.floor(ms % 60000 / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg;

const handler = async (m, { conn, usedPrefix }) => {
    let d = new Date(new Date + 3600000);
    let locale = 'ar';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender);
    let { money, joincount } = global.db.data.users[m.sender];
    let { exp, limit, level, role } = global.db.data.users[m.sender];
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
    let more = String.fromCharCode(8206);
    let readMore = more.repeat(850);
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
    await conn.sendMessage(m.chat, { react: { text: '⚡', key: m.key } });
    const harley = 'https://telegra.ph/file/b9c7242b2ea534c9fea51.jpg';
    const mentionId = m.key.participant || m.key.remoteJid;

    await conn.relayMessage(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    header: { title: `harley` },
                    body: {
                        text: `
*مــرحــبــا بــك/ي* @${mentionId.split('@')[0]}
╗──────¤
> *⌈🦈╎ بوت التربو ╎🦈⌋*
> •اختار أحد الخيارين في الأسفل
╝───────────────¤
*🚨: الرجاء الضغط على أحد الأزرار أدناه لفتح أو قفل الجروب*

> Copyright © 2024 EL TARBOO`,
                        subtitle: "EL TARBOO ",
                    },
                    header: {
                        hasMediaAttachment: true,
                        ...(await prepareWAMessageMedia({ image: { url: harley } }, { upload: conn.waUploadToServer }, { quoted: m }))
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "quick_reply",
                                buttonParamsJson: "{\"display_text\":\"فتح\",\"id\":\"" + usedPrefix + "جروب فتح\"}"
                            },
                            {
                                name: "quick_reply",
                                buttonParamsJson: "{\"display_text\":\"قفل\",\"id\":\"" + usedPrefix + "جروب غلق\"}"
                            }
                        ]
                    },
                    messageParamsJson: 'TARBOO bot'
                }
            }
        }
    }, {});
}

handler.help = ['group *open/close*'];
handler.tags = ['group'];
handler.command = ['جروب', 'روم','اعدادات'];
handler.admin = true;
handler.botAdmin = true;

export default handler;
