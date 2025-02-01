import fetch from "node-fetch";
import yts from "yt-search";

const audioCommands = ['اغنيه', 'اغنية', 'صوت', 'aaa']; // قسم الصوت
const videoCommands = ['فيديو', 'مقطع'];  // قسم الفيديو

let handler = async (m, { conn, command, args, text }) => {
    if (!text) {
        let responseMessage = audioCommands.includes(command)
            ? '> *\`『 اكتب اسم الاغنيه الي عايز تشغلها 🧚🏻‍♀️ 』\`*'.trim()
            : `*\`『 اكتب اسم الفيديو الي انت عيزو 🧚🏻‍♀️ 』\`*`.trim();                                                                                      
        throw responseMessage;
    }

    // إضافة رد فعل الساعة الرملية ⏳ عند بدء المعالجة
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    try {
        let video;
        if (text.includes("youtu.be") || text.includes("youtube.com")) {
            video = await getVideoFromUrl(text);
        } else {
            const yt_play = await search(args.join(" "));
            video = yt_play[0];
        }

        const typeText = audioCommands.includes(command) ? 'الصوت 📖' : 'الفيديو 🎥';

        // إرسال تفاصيل الفيديو بشكل منظم
        conn.sendFile(m.chat, video.thumbnail, 'thumbnail.jpg', `
⚇━━━━━━❰･𓃦･❱━━━━━━⚇
🎵 *\`『 العنوان 』\`* ${video.title}
⏰ *\`『 الوقت 』\`* ${secondString(video.duration.seconds)}
👀 *\`『 المشاهدات 』\`* ${video.views}
🔗 *\`『 الرابط 』\`* ${video.url}
⚇━━━━━━❰･𓃦･❱━━━━━━⚇
🕐 *جاري تحميل طلبك ${typeText}...*
`.trim(), m);

        const apiUrl = `https://api.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(video.url)}`;
        const res = await fetch(apiUrl);
        const data = await res.json();

        console.log('API Response:', data);

        if (!data || !data.result || !data.result.download_url) {
            throw "❌ 🧞 *لم يتم العثور على الوسائط المطلوبة. يرجى المحاولة لاحقًا.*";
        }

        const { download_url, title } = data.result;

        if (audioCommands.includes(command)) {
            await conn.sendMessage(
                m.chat,
                { audio: { url: download_url }, mimetype: 'audio/mpeg' },
                { quoted: m }
            );
        } else if (videoCommands.includes(command)) {
            await conn.sendMessage(
                m.chat,
                {
                    video: { url: download_url },
                    fileName: `${title}.mp4`,
                    mimetype: 'video/mp4',
                    caption: `🧚🏻‍♀️ *اتفضل يحب* ${title}`,
                    thumbnail: await fetch(data.result.thumbnail)
                },
                { quoted: m }
            );
        }

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error(error);
        throw `❌ 🧞 *حدث خطأ أثناء العملية:*\n\`\`\`${error.message || error}\`\`\``;
    }
};

// تسجيل الأوامر
handler.command = [...audioCommands, ...videoCommands];
handler.exp = 0;
export default handler;

async function search(query, options = {}) {
    const search = await yts.search({ query, hl: "ar", gl: "AR", ...options });
    return search.videos;
}

async function getVideoFromUrl(url) {
    const yt_play = await yts.search({ query: url, hl: "ar", gl: "AR" });
    return yt_play.videos[0];
}

function secondString(seconds) {
    seconds = Number(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h > 0 ? `${h} ساعات, ` : ''}${m} دقائق, ${s} ثواني`;
}
