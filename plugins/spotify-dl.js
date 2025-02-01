const axios = require("axios");

module.exports = {
  command: "سبوتيفاي",
  alias: [],
  category: ["downloader"],
  settings: {
    limit: true,
  },
  description: "Mencari/download musik dari Spotify",
  loading: true,
  async run(m, { sock, Func, Scraper, text }) {
    // التحقق إذا كان النص غير موجود وتوضيح كيفية الاستخدام
    if (!text) {
      throw `> *乂 Cara Penggunaan :*
> *-* Masukkan Query untuk mencari video
> *-* Masukkan Url untuk mendownload musik

> *乂 Contoh Penggunaan :*
> *- ${m.prefix + m.command} Video lucu*
> *- ${m.prefix + m.command} https://open.spotify.com/track/057YRaQ57p70MVg4hMIIkB*`;
    }

    // إذا كان النص يحتوي على رابط Spotify، قم بتحميل الموسيقى
    if (/open.spotify.com/.test(text)) {
      try {
        let data = await Scraper.spotify.download(text);
        m.reply({
          audio: {
            url: data.download,
          },
          mimetype: "audio/mpeg",
        });
      } catch (error) {
        m.reply("❌ حدث خطأ أثناء تحميل الموسيقى من Spotify.");
        console.error(error);
      }
    } else {
      // البحث في Spotify إذا كان النص عبارة عن استعلام
      try {
        let data = await Scraper.spotify.search(text);
        let cap = `*– 乂 Spotify - البحث*
`;
        cap += `> اكتب *${m.prefix + m.command} ${data[0].url}* لتحميل الموسيقى من سبوتيفاي\n\n`;
        cap += data
          .map((a) =>
            Object.entries(a)
              .map(([b, c]) => `> *- ${b.capitalize()} :* ${c}`)
              .join("\n")
          )
          .join("\n\n");
        m.reply(cap);
      } catch (error) {
        m.reply("❌ حدث خطأ أثناء البحث في Spotify.");
        console.error(error);
      }
    }
  },
};