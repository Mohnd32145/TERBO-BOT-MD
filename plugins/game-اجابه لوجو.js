import similarity from "similarity";
const threshold = .72;
export async function before(m) {
  let id = m.chat;
  if (!m.quoted || !m.quoted?.fromMe || !m.text || !/لوجو/i.test(m.quoted?.text) || /لوجو/i.test(m.text)) return !0;
  if (this.tebaklogo = this.tebaklogo ? this.tebaklogo : {}, !(id in this.tebaklogo)) return await this.reply(m.chat, "انتهي السؤال", m);
  if (m.quoted?.id === this.tebaklogo[id][0]?.id) {
    if (/^((me)?nyerah|surr?ender|انسحب)$/i.test(m.text)) return clearTimeout(this.tebaklogo[id][3]),
      delete this.tebaklogo[id], await this.reply(m.chat, "*اجابه خاطئه جرب مجددا*", m);
    let json = JSON.parse(JSON.stringify(this.tebaklogo[id][1]));
    m.text.toLowerCase() === json.hasil.data.jawaban.toLowerCase().trim() ? (db.data.users[m.sender].exp += this.tebaklogo[id][2], await this.reply(m.chat, `✅ *اجابه صحيحه*\n+${this.tebaklogo[id][2]} XP`, m), clearTimeout(this.tebaklogo[id][3]), delete this.tebaklogo[id]) : similarity(m.text.toLowerCase(), json.hasil.data.jawaban.toLowerCase().trim()) >= .72 ? m.reply("❗ *Dikit Lagi!*") : await this.reply(m.chat, "❌ *Salah!*", m);
  }
  return !0;
}
export const exp = 0;
const buttontebaklogo = [
  ["tebaklogo", "/tebaklogo"]
];
