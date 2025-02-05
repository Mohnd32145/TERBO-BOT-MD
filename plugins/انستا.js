import fetch from 'node-fetch';
import axios from 'axios';
import instagramGetUrl from 'instagram-url-direct';
import { instagram } from '@xct007/frieren-scraper';
import { instagramdl } from '@bochilteam/scraper';
import instagramDl from '@sasmeee/igdl';
import { fileTypeFromBuffer } from 'file-type';

const handler = async (m, { conn, args, command, usedPrefix }) => {
  if (!args[0]) throw `*[❗معلومه❗] أمر خاطئ، استخدم: ${usedPrefix + command}* https://www.instagram.com/reel/C5GSbqyKXeN/?igsh=Z293NGlmbzRhdGFl`;
  
  m.reply(global.wait);

  try {
    const img = await instagramDl(args[0]);
    for (let media of img) {
      const bufferInfo = await getBuffer(media.download_link);
      if (bufferInfo && bufferInfo.detectedType) {
        const mediaType = bufferInfo.detectedType.mime.startsWith('image/') ? 'image' : 'video';
        await conn.sendMessage(m.chat, { [mediaType]: { url: media.download_link } }, { quoted: m });
      }
    }
  } catch (e1) {
    try {
      const data = await instagram.download(args[0]);
      for (const item of data) {
        await sendMedia(conn, m, args[0], item.url);
      }
    } catch (e2) {
      try {
        const result = (await instagramGetUrl(args[0])).url_list[0];
        await sendMedia(conn, m, args[0], result);
      } catch (e3) {
        try {
          const results = await instagramdl(args[0]);
          for (const { url } of results) await sendMedia(conn, m, args[0], url);
        } catch (e4) {
          try {
            const response = await fetch(`https://api.lolhuman.xyz/api/instagram?apikey=${lolkeysapi}&url=${args[0]}`);
            const json = await response.json();
            await sendMedia(conn, m, args[0], json.result);
          } catch (e5) {
            throw `*[❗معلومه❗] حدث خطأ أثناء محاولة جلب الوسائط.*`;
          }
        }
      }
    }
  }
};

handler.command = /^(instagramdl|instagram|انستغرام|ig|انستا|instagram2|igdl2|ig2|instagramdl3|instagram3|igdl3|ig3)$/i;
export default handler;

const getBuffer = async (url, options = {}) => {
  try {
    const res = await axios({
      method: 'get',
      url,
      headers: { 'DNT': 1, 'Upgrade-Insecure-Request': 1 },
      ...options,
      responseType: 'arraybuffer',
    });

    const buffer = Buffer.from(res.data, 'binary');
    const detectedType = await fileTypeFromBuffer(buffer);
    if (!detectedType || !['image/jpeg', 'image/png', 'video/mp4'].includes(detectedType.mime)) {
      return null;
    }

    return { buffer, detectedType };
  } catch (error) {
    console.error(`Error fetching buffer: ${error}`);
    return null;
  }
};

const sendMedia = async (conn, m, originalUrl, mediaUrl) => {
  try {
    const shortUrl = await (await fetch(`https://tinyurl.com/api-create.php?url=${originalUrl}`)).text();
    const text = `🔗 *URL:* ${shortUrl}`.trim();
    await conn.sendFile(m.chat, mediaUrl, 'media.mp4', text, m);
  } catch (error) {
    console.error(`Error sending media: ${error}`);
  }
};