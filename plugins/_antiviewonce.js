import { downloadContentFromMessage } from '@whiskeysockets/baileys'

export async function before(m, { isAdmin, isBotAdmin }) {
  let chat = db.data.chats[m.chat]
  
  // تحقق من إذا كان الخيار لإعادة إرسال الرسائل للعرض مرة واحدة مفعّل أو إذا كانت المحادثة محظورة
  if (!chat.viewonce || chat.isBanned) return
  
  // لو الرسالة هي رسالة للعرض مرة واحدة
  if (m.mtype == 'viewOnceMessageV2') {
    let msg = m.message.viewOnceMessageV2.message
    let type = Object.keys(msg)[0]
    let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video')
    let buffer = Buffer.from([])

    for await (const chunk of media) {
      buffer = Buffer.concat([buffer, chunk])
    }

    // لو كانت الرسالة فيديو أو صورة، يبعتها تاني كرسالة عادية
    let caption = msg[type].caption || ''
    if (/video/.test(type)) {
      return this.sendFile(m.chat, buffer, 'error.mp4', `${caption}\n\n🚩 *إخفاء أي فيديو غير مسموح به هنا.*`, m)
    } else if (/image/.test(type)) {
      return this.sendFile(m.chat, buffer, 'error.jpg', `${caption}\n\n🚩 *إخفاء أي صوره غير مسموح به هنا.*`, m)
    }
  }
}
