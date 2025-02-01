// By: Pablo & Shadow 
import fetch from 'node-fetch';

let handler = async (m, { usedPrefix, text, command }) => {
  try {
    if (command === 'اختصار' && text) {
      const url = text.trim();
      if (!/^https?:\/\//i.test(url)) return m.reply('❌ يرجى توفير رابط صالح لاختصاره.');

      const apiToken = 'zu8tAv7kMMZMnbiTdUuuo5jhHfJO3AkR48m3FGnNCkMJ4JZHvhzd8f378ShD'; // تحقق من صحة المفتاح

      const response = await fetch(`https://api.tinyurl.com/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiToken}`
        },
        body: JSON.stringify({ url, domain: 'tiny.one' })
      });

      if (!response.ok) {
        return m.reply('❌ حدث خطأ أثناء الاتصال بـ TinyURL API.');
      }

      const data = await response.json();

      if (data.data && data.data.tiny_url) {
        m.reply(`✅ الرابط المختصر: ${data.data.tiny_url}`);
      } else {
        m.reply('❌ لم يتمكن TinyURL من اختصار الرابط.');
      }
    } else {
      m.reply(`❌ الاستخدام: ${usedPrefix}اختصار (الرابط)`);
    }
  } catch (error) {
    console.error('حدث خطأ:', error);
    m.reply('❌ حدث خطأ أثناء معالجة طلبك.');
  }
};

handler.command = ['اختصار'];
handler.tags = ['tools'];

export default handler;