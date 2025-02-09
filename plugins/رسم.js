import fetch from 'node-fetch';

const handler = async (m, {conn, text, usedPrefix, command}) => {
    if (!text) throw `*"يا دوب! محتاج نص لإني أقدر أشتغل عليه. جرب حاجة زي كده:\n${usedPrefix + command} افتار*`;

    await conn.sendMessage(m.chat, {text: `*خلينا نشوف إيه الصورة اللي ممكن نطلعها من "${text}"...*`}, {quoted: m});
    
    try {
        // ترجمة النص من العربية إلى الإنجليزية باستخدام API Google Translate
        const translateResponse = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`);
        if (!translateResponse.ok) throw new Error('رد API الترجمة مش مظبوط');
        
        const translateData = await translateResponse.json();
        const translatedText = translateData[0][0][0];  // الحصول على النص المترجم من JSON

        // استدعاء API النص إلى صورة مع النص المترجم
        const response = await fetch(`https://api-xovvip.vercel.app/text2img?text=${encodeURIComponent(translatedText)}`);
        if (!response.ok) throw new Error('رد API تحويل النص إلى صورة مش مظبوط');
        
        const buffer = await response.buffer();
        
        // إرسال الصورة مع النص الأصلي والمترجم
        const link = `https://api-xovvip.vercel.app/text2img?text=${encodeURIComponent(translatedText)}`;
        let captionn = `🔎 *النتيجة لـ:* ${text}\n🔗 *الرابط:* ${link}\n🌎 *محرك البحث:* Google`;

        await conn.sendButton(m.chat, captionn, '𝙱𝙾𝚃 𝙴𝙻 𝚃𝙰𝚁𝙱𝙾𝙾 | 🐼❤️', link, [['🔄 صورة تانية 🔄', `#imagen ${text}`]], m);
        
    } catch (error) {
        // عرض تفاصيل الخطأ لتحديد السبب
        console.error('حدث خطأ:', error);
        throw `🚫 حدث خطأ أثناء معالجة طلبك. حاول مرة تانية!`;
    }
}

handler.command = ['dall-e', 'ارسم', 'رسم', 'تخيل', 'صورة', 'صوره', 'aimg', 'imagine'];
export default handler;
