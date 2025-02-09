import axios from 'axios';
const { proto, generateWAMessageFromContent, generateWAMessageContent } = (await import("@whiskeysockets/baileys")).default;

let handler = async (message, { conn, text, usedPrefix, command }) => {
  // مصفوفة الكلمات المفتاحية الإسلامية
  const searchQueries = ['حديث', 'الرسول صلى الله عليه وسلم', 'حديث شريف', 'حديث نبوي'];
  
  // اختيار كلمة عشوائية من المصفوفة
  const searchQuery = searchQueries[Math.floor(Math.random() * searchQueries.length)];

  async function createVideoMessage(url) {
    const { videoMessage } = await generateWAMessageContent({ video: { url } }, { upload: conn.waUploadToServer });
    return videoMessage;
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  try {
    let results = [];
    let { data: response } = await axios.get('https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=' + searchQuery);
    let searchResults = response.data;
    shuffleArray(searchResults);
    let selectedResults = searchResults.splice(0, 7);
    
    for (let result of selectedResults) {
      results.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: "𝐁𝐘┋❥ 𝐓𝐄𝐑𝐁𝐎☞𝐁𝐎𝐓┋" }), // ضع العلامة المائية هنا
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '' + result.title,
          hasMediaAttachment: true,
          videoMessage: await createVideoMessage(result.nowm)
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
      });
    }
    
    const responseMessage = generateWAMessageFromContent(message.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({ text: 'نتائج البحث يا اخي الكريم❤️' + searchQuery }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: '🔎 `حديث`' }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...results] })
          })
        }
      }
    }, { quoted: message });
    
    await conn.relayMessage(message.chat, responseMessage.message, { messageId: responseMessage.key.id });
  } catch (error) {
    await conn.reply(message.chat, error.toString(), message);
  }
};

handler.help = ['دين'];
handler.tags = ['شانكس'];
handler.command = ['tiktoksearch','تصفح2','احاديث'];

export default handler;
