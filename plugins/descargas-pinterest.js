import { pinterest } from '@bochilteam/scraper'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) 
    throw `*❌ يبدو أنك نسيت كتابة الكلمة المراد البحث عنها. استخدم:*\n${usedPrefix + command} انمي قاتل الشياطين`

  try {
    const json = await pinterest(text)
    
    if (!json || json.length === 0) 
      throw '*❌ عذرًا، لم يتم العثور على نتائج. حاول بكلمة بحث مختلفة.*'

    const imageUrl = json[Math.floor(Math.random() * json.length)] // اختيار صورة عشوائية
    await conn.sendFile(m.chat, imageUrl, 'pinterest.jpg', `
*✨💜💫*
نتيجة البحث: *${text}*
`.trim(), m)
  } catch (err) {
    console.error(err)
    throw '*❌ حدث خطأ أثناء جلب النتائج. حاول مرة أخرى لاحقًا.*'
  }
}

handler.help = ['pinterest <الكلمة>']
handler.tags = ['internet']
handler.command = /^(pinterest|بينت|بنترست)$/i

export default handler