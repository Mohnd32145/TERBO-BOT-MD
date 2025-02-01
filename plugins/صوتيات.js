import { unlinkSync, readFileSync } from 'fs';
import { join } from 'path';
import { exec } from 'child_process';

let handler = async (m, { conn, args, __dirname, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg?.mimetype || '');

    let set;
    if (/عميق/.test(command)) set = '-af equalizer=f=94:width_type=o:width=2:g=30';
    if (/منفوخ/.test(command)) set = '-af acrusher=.1:1:64:0:log';
    if (/تخين/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3';
    if (/صاخب/.test(command)) set = '-af volume=12';
    if (/سريع/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"';
    if (/تخينن/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"';
    if (/رفيع/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25';
    if (/تقطيع/.test(command)) set = '-filter_complex "areverse"';
    if (/روبوت/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"';
    if (/بطيء/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"';
    if (/ناعم/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"';
    if (/سنجاب/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"';

    if (!set) return conn.reply(m.chat, `⚠️ لم يتم العثور على التأثير المطلوب!`, m);

    if (/audio/.test(mime)) {
      await m.react('⏳');

      let ran = getRandom('.mp3');
      let filename = join(__dirname, '../tmp/' + ran);
      let media = await q.downloadMediaMessage();

      exec(`ffmpeg -i ${media} ${set} ${filename}`, { shell: true }, async (err) => {
        unlinkSync(media);
        if (err) {
          console.error(err);
          return conn.reply(m.chat, '❌ حدث خطأ أثناء معالجة الصوت!', m);
        }
        let buff = readFileSync(filename);
        await conn.sendFile(m.chat, buff, ran, null, m, true, {
          type: 'audioMessage',
          ptt: true
        });
        unlinkSync(filename);
        await m.react('✅');
      });

    } else {
      conn.reply(m.chat, `⚠️ *رد على رسالة صوتية باستخدام الأمر ${usedPrefix + command}*`, m);
    }
  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ حدث خطأ أثناء تنفيذ الأمر!', m);
  }
};

handler.help = ['bass', 'blown', 'deep', 'earrape', 'fast', 'fat', 'nightcore', 'reverse', 'robot', 'slow', 'smooth', 'tupai'].map(v => v + ' [vn]');
handler.tags = ['audio'];
handler.command = /^(عميق|منفوخ|تخين|صاخب|سريع|تخينن|رفيع|روبوت|بطيء|ناعم|سنجاب)$/i;

export default handler;

const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};