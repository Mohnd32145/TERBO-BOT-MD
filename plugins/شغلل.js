import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import yts from 'yt-search';
import fetch from 'node-fetch';
import fs from 'fs';

let handler = async (m, { conn, args, usedPrefix, command, text }) => {
    if (!text) throw `*⚠️ يرجى كتابة شيء للبحث عنه!*\n\n*🔹 مثال:*\n*${usedPrefix + command} سورة البقرة*`;

    try {
        const searchResults = await yts(text);
        if (!searchResults.videos.length) {
            throw '*❌ لم يتم العثور على نتائج، حاول البحث عن شيء آخر.*';
        }

        const listSections = [];
        searchResults.videos.slice(0, 5).forEach(v => { // تحديد 5 نتائج فقط لعدم إغراق المستخدم بالخيارات
            listSections.push([`${v.title}`, [
                ['🎥 فيديو (MP4)', `${usedPrefix}ytmp4 ${v.url}`, `اختيار: ${v.title}`],
                ['📄 فيديو (ملف)', `${usedPrefix}ytmp4doc ${v.url}`, `اختيار: ${v.title}`],
                ['🎧 صوت (MP3)', `${usedPrefix}ytmp3 ${v.url}`, `اختيار: ${v.title}`],
                ['📄 صوت (ملف)', `${usedPrefix}ytmp3doc ${v.url}`, `اختيار: ${v.title}`]
            ]]);
        });

        conn.sendList(m.chat, '🔍 نتائج البحث:', `🔹 نتائج البحث عن: *${text}*`, 'اختر ما تريد تحميله:', '[ النتائج ]', listSections, m);

    } catch (e) {
        console.error(e);
        await m.reply('*❌ حدث خطأ أثناء البحث، حاول مرة أخرى لاحقًا.*');
    }
};

handler.command = /^شغل2|playlist2|قائمة-يوتيوب$/i;
export default handler;