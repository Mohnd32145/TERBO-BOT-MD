import { sticker } from '../lib/sticker.js'
import fetch from 'node-fetch'
import fs from "fs"

let handler = async (m, { conn, text, args }) => {
    if (!text || !text.includes('+')) {
        throw '*باستخدام هذا الأمر يجب أن يكون بالشكل التالي:*\n*مثال:*\n*.دمج 🤨+😣*'
    }

    let [emoji1, emoji2] = text.split`+`
    if (!emoji1 || !emoji2) {
        throw '*يرجى إدخال رموز تعبيرية صحيحة مفصولة بـ "+"*'
    }

    try {
        let apiKey = 'YOUR_TENOR_API_KEY' // استبدل بمفتاح API صالح من Tenor
        let url = `https://tenor.googleapis.com/v2/featured?key=${apiKey}&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`

        let response = await fetch(url)
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`)

        let anu = await response.json()
        if (!anu.results || anu.results.length === 0) throw '*لم يتم العثور على دمج مناسب لهذه الرموز التعبيرية.*'

        for (let res of anu.results) {
            let stiker = await sticker(false, res.url, global.packname, global.author)
            await conn.sendFile(m.chat, stiker, null, { asSticker: true })
        }
    } catch (error) {
        console.error(error)
        throw '*حدث خطأ أثناء جلب الصورة. تأكد من صحة الرموز التعبيرية أو جرّب لاحقًا.*'
    }
}

handler.help = ['دمج <ايموجي1>+<ايموجي2>']
handler.tags = ['fun']
handler.command = /^(دمج)$/i

export default handler