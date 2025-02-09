import fetch from 'node-fetch';

let handler = async (msg, { conn, text }) => {
  if (!text) {
    return msg.reply("تحويل نص إلى تعليق صوتي. مثال:\n\n.قول التربو أحسن بوت في العالم");
  }

  let url = `https://ai.xterm.codes/api/text2speech/elevenlabs?text=${encodeURIComponent(text)}&key=Bell409&voice=echilling`;
  
  await conn.sendMessage(msg.chat, {
    audio: { url: url },
    mimetype: "audio/mpeg",
    ptt: true
  }, { quoted: msg });
};

handler.command = ["elevenlab2", "انطق"];
handler.help = ["elevenlab2", "echilling"];
handler.tags = ['ai'];

export default handler;