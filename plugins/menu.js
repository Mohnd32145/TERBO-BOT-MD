function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms % 3600000 / 60000);
    let s = Math.floor(ms % 60000 / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg;

const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
    let d = new Date(new Date + 3600000);
    let locale = 'ar';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender)
    let { money, joincount } = global.db.data.users[m.sender];
    let { exp, limit, level, role } = global.db.data.users[m.sender];
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
    let more = String.fromCharCode(8206);
    let readMore = more.repeat(850);
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
  await conn.sendMessage(m.chat, { react: { text: '📂', key: m.key } })
  const zack = 'https://envs.sh/aiS.jpg'
  const mentionId = m.key.participant || m.key.remoteJid;
 
conn.relayMessage(m.chat, { viewOnceMessage: { message: { interactiveMessage: { header: { title: `harley`}, body: { text: `˼⚡˹↜ مـࢪحـبـا بـك/ي @${mentionId.split('@')[0]}
> ˼🪪˹↜ مــعــلــومــاتــك ↶
╮───────────────────⟢ـ
┆⚡↜ بـريـمـيـوم↞⌊ ${user.premiumTime > 0 ? 'مــمـ🔱ـيز' : (isPrems ? 'مــمـ🔱ـيز' : 'عــ🍁ــادي') || ''} ⌉
┆⚜️↜ مـــســـتواك↞⌊ ${level} ⌉
┆💫↜ رتـبـتـك↞⌊ ${role} ⌉
┆🧰↜ الـخـبـرة↞⌊ ${exp} ⌉
┆💎↜ الـمـاس↞⌊ ${limit} ⌉
╯───────────────────⟢ـ
> ˼🤖˹↜ الــبــوت↶
╮───────────────────⟢ـ
┆⚙️ ↜اسـم الـبـوت↶﹝𝑻𝑬𝑹𝑩𝑶〔⚡️〕𝑩𝑶𝑻﹞
┆🪄 ↜الـمـطـور ↶﹝𝑻𝑬𝑹𝑩𝑶﹞
┆📌 ↜الـتـشـغـيـل ↶﹝${uptime}﹞
┆🔖 ↜الــمــســتـخـدمـيـن ↶﹝${rtotalreg}﹞
╯───────────────────⟢ـ
> © 𝑻𝑬𝑹𝑩𝑶〔⚡️〕𝑩𝑶𝑻 2025`,subtitle: "Araab Zack",},header: { hasMediaAttachment: true,...(await prepareWAMessageMedia({ image : { url: zack } }, { upload: conn.waUploadToServer }, {quoted: m}))},
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: false,
                    },nativeFlowMessage: { buttons: [


                            {
                                name: 'single_select',
                                buttonParamsJson: JSON.stringify({
                                    title: '⌈🛡╎الــقــوائـــم╎🛡⌋',
                                    sections: [
                                        {
                                            title: 'مــرحـ🛡ـبــا بــك فـي مــ☑هــام تيربو بـ🤖ـوت',
                                            highlight_label: 'بعبص براحتك في البوت يا برو 🤖',
                                            rows: [
                                                {
                                                    header: 'الــقـ👑ـســم الـاول',
                                                    title: 'استدعاء_قسم_الاعضاء #الاعضاء',
                                                    description: '',
                                                    id: '.ق1'
                                                },
                                                {
                                                    header: 'الــقـ👨🏻‍💻ـســم الــثــانــي',
                                                    title: 'استدعاء_قسم_المشرفين #المشرفين',
                                                    description: '',
                                                    id: '.ق10'
                                                },
                                                {
                                                    header: 'الــقـ🕋ـســم الــثــالــث',
                                                    title: 'استدعاء_قسم_الدين #الدين',
                                                    description: '',
                                                    id: '.ق4'
                                                },
                                                {
                                                    header: 'الــقـ👑ـســم الــرابــع',
                                                    title: 'استدعاء_قسم_المطور #المطور',
                                                    description: '',
                                                    id: '.ق6'
                                                },
                                                {
                                                    header: 'الــقـ🛡ـســم الــخــامــس',
                                                    title: 'استدعاء_قسم_التنزيلات #التنزيلات',
                                                    description: '',
                                                    id: '.ق9'
                                                },
                                                {
                                                    header: 'الــقـ🕹ـســم الــســادس',
                                                    title: 'استدعاء_قسم_الالعاب #الالعاب',
                                                    description: '',
                                                    id: '.ق5'
                                                },
                                                {
                                                    header: 'الــقـ🌀ـســم الــســابــع',
                                                    title: 'استدعاء_قسم_التحويلات #التحويلات',
                                                    description: '',
                                                    id: '.ق2'
                                                },
                                                {
                                                    header: 'الــقـ🤖ـســم الــتــاســع',
                                                    title: 'استدعاء_قسم_الذكاء #الذكاء',
                                                    description: '',
                                                    id: '.ق12'
                                                },
                                                {
                                                    header: 'الــقـ🏦ـســم الــعــاشــر',
                                                    title: 'استدعاء_قسم_البنك #البنك',
                                                    description: '',
                                                    id: '.ق10'
                                                },
                                                {
                                                    header: 'الــقـ🎙سم �لــحــاديــة عــشــر',
                                                    title: 'استدعاء_قسم_الاصوات #الاصوات',
                                                    description: '',
                                                    id: '.ق8'
                                               },
{
                                                    header: 'الــقـ🔧سم �لــثـانيــة عــشــر',
                                                    title: 'استدعاء_قسم_الادوات #الادوات',
                                                    description: '',
                                                    id: '.ق7'
                                               },
{                                          
                                                    header: 'الــقـ🪪سم �الـثـالثــة عــشــر',
                                                    title: 'استدعاء_قسم_الالقاب #الالقاب',
                                                    description: '',
                                                    id: '.ق15' 
                                                    }‚
                                                {
                                                header: 'الــقـ🖼️سم �الـرابعــة عــشــر',
                                                    title: 'استدعاء_قسم_تعديل الصور #الصور',
                                                    description: '',
                                                    id: '.ق16' 
                                                }
                                            ]
                                        }
                                    ]
                                }),
                  messageParamsJson: ''
                     },
                     {
               name: "cta_url",
               buttonParamsJson: '{"display_text":"⌈📲╎قـنـاة الــبــوت╎📲⌋","url":"https://whatsapp.com/channel/0029Vazqdf8CnA81ELXDcq2c","merchant_url":"https://whatsapp.com/channel/0029Vazqdf8CnA81ELXDcq2c"}'
                            }
                        ]
                    }
                }
            }
        }
    }, {});
}

handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['menu', 'مهام', 'اوامر','الاوامر','قائمة','القائمة']

export default handler;
