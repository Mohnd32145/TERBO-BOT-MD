import axios from 'axios';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import { mediafiredl } from '@bochilteam/scraper';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  const sticker = 'https://qu.ax/Wdsb.webp';

  if (!args[0] || !isValidMediafireURL(args[0])) {
    return conn.reply(
      m.chat,
      `⚠️ يرجى تقديم رابط Mediafire صالح. مثال:\n${usedPrefix + command} https://www.mediafire.com/file/example/file.zip/file`,
      m
    );
  }

  await m.react('⏳');

  try {
    // **المحاولة الأولى: API خارجي**
    const res = await fetch(`https://delirius-api-oficial.vercel.app/api/mediafire?url=${args[0]}`);
    if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
    const data = await res.json();
    const fileData = data.data;

    const caption = generateCaption(fileData.filename, fileData.size, fileData.mime);
    await m.reply(caption);
    await conn.sendFile(m.chat, fileData.link, fileData.filename, '', m, null, { mimetype: fileData.mime, asDocument: true });
    await m.react('✅');
  } catch (err) {
    try {
      // **المحاولة الثانية: مكتبة mediafiredl**
      const resEX = await mediafiredl(args[0]);

      const captionES = generateCaption(resEX.filename, resEX.filesizeH, resEX.ext);
      await m.reply(captionES);
      await conn.sendFile(m.chat, resEX.url, resEX.filename, '', m, null, { mimetype: resEX.ext, asDocument: true });
      await m.react('✅');
    } catch (error) {
      try {
        // **المحاولة الثالثة: تحليل الروابط يدويًا**
        const result = await mediafireDl(args[0]);
        const { name, size, mime, link } = result;

        const caption = generateCaption(name, size, mime);
        await m.reply(caption);
        await conn.sendFile(m.chat, link, name, '', m, null, { mimetype: mime, asDocument: true });
        await m.react('✅');
      } catch (err) {
        console.error(err);
        await conn.sendFile(m.chat, sticker, 'error.webp', '', m, null, { mimetype: 'image/webp' });
        await m.react('❌');
      }
    }
  }
};

handler.help = ['mediafire', 'mediafiredl'];
handler.tags = ['downloader'];
handler.command = /^(ميديا_فاير|ميديافاير|ميديا-فاير)$/i;
handler.register = true;
handler.limit = 3;
export default handler;

// **دالة استخراج البيانات من Mediafire يدويًا**
async function mediafireDl(url) {
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const link = $('#downloadButton').attr('href');
    const name = $('div.filename').text().trim() || $('div.promoDownloadName.notranslate').text().trim();
    const size = $('li:contains("Size:") span').text().trim();

    if (!link) throw new Error('Failed to extract download link');

    const headRes = await axios.head(link);
    const mime = headRes.headers['content-type'];

    return { name, size, mime, link };
  } catch (err) {
    console.error('Error in mediafireDl:', err);
    throw new Error('Failed to parse Mediafire link');
  }
}

// **دالة توليد رسالة الملف**
function generateCaption(name, size, mime) {
  return `
┏━━『 𝐌𝐄𝐃𝐈𝐀𝐅𝐈𝐑𝐄 』━━•
┃❥ اسم الملف: ${name}
┃❥ الحجم: ${size}
┃❥ النوع: ${mime}
╰━━━⊰ ⊱━━━━•
> ⏳ جاري التحميل...
`.trim();
}

// **دالة التحقق من صحة رابط Mediafire**
function isValidMediafireURL(url) {
  return /^https?:\/\/(www\.)?mediafire\.com\/file\/[a-zA-Z0-9]+\/.+$/.test(url);
}