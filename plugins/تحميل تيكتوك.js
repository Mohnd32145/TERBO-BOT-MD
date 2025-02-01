// استيراد المكتبات والاعتماديات
import fg from 'api-dylux';
import axios from 'axios';
import cheerio from 'cheerio';
import {tiktok} from '@xct007/frieren-scraper';
import {generateWAMessageFromContent} from '@whiskeysockets/baileys';
import {tiktokdl} from '@bochilteam/scraper';

// تعريف رابط API الخاص بـ CFROS
const CFROSAPI = global.APIs.CFROSAPI;

// تعريف الوظيفة الأساسية
const handler = async (m, {conn, text, args, usedPrefix, command}) => {
  if (!text) return conn.reply(
    m.chat, 
    `⚠️ *ما هو رابط تيك توك؟ 🤔*\n\n⚡ *قم بإدخال رابط تيك توك لتنزيل الفيديو *\n*مثال:* ${usedPrefix + command} https://vm.tiktok.com/ZM6T4X1RY/`, 
    m, 
    {
      contextInfo: {
        externalAdReply: { 
          mediaUrl: null, 
          mediaType: 1, 
          description: null, 
          title: '💫 بوت تنزيل تيك توك 🌟', 
          body: '💫 𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 🥳', 
          previewType: 0, 
          thumbnail: img.getRandom(), 
          sourceUrl: redes.getRandom() 
        }
      }
    }
  );

  if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(text)) 
    throw `❌ خطأ: الرابط غير صحيح.`;

  // رسالة انتظار
  const { key } = await conn.sendMessage(m.chat, {text: `⌛   🔰 جاري التحميل...`}, {quoted: m});
  await delay(2000);
  await conn.sendMessage(m.chat, {text: `⌛ الرجاء الانتظار...\n▰▰▰▰▰▱▱▱▱`, edit: key});
  
  try {
    // المحاولة الأولى لاستخدام API لتحميل الفيديو
    const dataFn = await conn.getFile(`${CFROSAPI}/api/tiktokv2?url=${args[0]}`);
    await conn.sendMessage(m.chat, {video: dataFn.data, caption: `✅ *هنا هو فيديو تيك توك الخاص بك!*`}, {quoted: m});
    await conn.sendMessage(m.chat, {text: `✅ تم التحميل بنجاح!`, edit: key});
  } catch (error) {
    // في حال الفشل، محاولات متعددة لتحميل الفيديو باستخدام مكتبات مختلفة
    try {
      const dataF = await tiktok.v1(args[0]);
      await conn.sendMessage(m.chat, {video: {url: dataF.play}, caption: `✅ *هنا هو فيديو تيك توك الخاص بك!*`}, {quoted: m});
    } catch (e1) {
      try {
        const tTiktok = await tiktokdlF(args[0]);
        await conn.sendMessage(m.chat, {video: {url: tTiktok.video}, caption: `✅ *هنا هو فيديو تيك توك الخاص بك!*`}, {quoted: m});
      } catch (e2) {
        try {
          const p = await fg.tiktok(args[0]);
          await conn.sendMessage(m.chat, {video: {url: p.nowm}, caption: `✅ *هنا هو فيديو تيك توك الخاص بك!*`}, {quoted: m});
        } catch (e3) {
          try {
            const {author: {nickname}, video} = await tiktokdl(args[0]);
            const url = video.no_watermark || video.no_watermark_hd;
            await conn.sendMessage(m.chat, {video: {url: url}, caption: `✅ *هنا هو فيديو تيك توك الخاص بك!*`}, {quoted: m});
          } catch (e) {
            // في حال فشل كل المحاولات
            m.reply(`⚠️ *حدث خطأ أثناء التنزيل. الرجاء التحقق من الرابط أو المحاولة لاحقًا.*`);
          }
        }
      }
    }
  }
};

// تعريف تفاصيل الأوامر المساعدة
handler.help = ['tiktok'];
handler.tags = ['downloader'];
handler.command = /^(تيكتوك|تيك?$/i;
handler.limit = 1;
export default handler;

// وظيفة تأخير زمني
const delay = time => new Promise(res => setTimeout(res, time));

// وظيفة مخصصة لتحميل الفيديو من TikTok
async function tiktokdlF(url) {
  if (!/tiktok/.test(url)) 
    return `⚠️ *يرجى إدخال رابط TikTok صالح.*`;

  const getToken = await axios.get('https://tikdown.org/id');
  const $ = cheerio.load(getToken.data);
  const token = $('#download-form > input[type=hidden]:nth-child(2)').attr('value');
  const param = {url: url, _token: token};
  
  const {data} = await axios.request('https://tikdown.org/getAjax?', {
    method: 'post', 
    data: new URLSearchParams(Object.entries(param)), 
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'user-agent': 'Mozilla/5.0'
    }
  });

  const getData = cheerio.load(data.html);
  if (data.status) {
    return {
      status: true, 
      thumbnail: getData('img').attr('src'), 
      video: getData('div.download-links > div:nth-child(1) > a').attr('href')
    };
  } else {
    return {status: false};
  }
}