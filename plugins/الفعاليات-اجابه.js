import similarity from 'similarity'
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !/^/i.test(m.quoted.text)) return !0
    this.tekateki = this.tekateki ? this.tekateki : {}
    if (!(id in this.tekateki)) return
    if (m.quoted.id == this.tekateki[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tekateki[id][1]))
        let answer = json.response;
        if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tekateki[id][2]
            m.reply(`
╮───────────────────────╭ـ
│ 👏🏻 *أحسنت لقد فزت إجابتك صحيحة 🧞*
│ 💰 *جائزتـك : ❲ ${this.tekateki[id][2]} ❳ نقطه 🧞*
╯───────────────────────╰ـ`.trim())
            clearTimeout(this.tekateki[id][3])
            delete this.tekateki[id]
        } else if (m.text.toLowerCase() == 'انسحاب') {
            global.db.data.users[m.sender].exp - this.tekateki[id][2]
            m.reply(`
╮───────────────────────╭ـ
│ 😒 *يالك من فاشل لقد انسحبت 🧞*
│ 💰 *الخسـارة : ❲ ${this.tekateki[id][2]} ❳ نقطه 🧞*
╯───────────────────────╰ـ`.trim())
            clearTimeout(this.tekateki[id][3])
            delete this.tekateki[id]
        } else if (m.text.toLowerCase() == 'تلميح') {            
        m.reply(`
╮───────────────────────╭ـ
│ 😒 *يالك من فاشل لا تستطيع الإجابة بمفردك 🧞*
│ ❗ *الاجـابة : ❲ ${answer} ❳ 🧞*
╯───────────────────────╰ـ`.trim())          
        } else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) {
            m.reply(`
╮───────────────────────╭ـ
│ *قربت من الإجابة، أتأكد من النص وجرب تاني* ┃❌ ❯
╯───────────────────────╰ـ`.trim())
        } else {
            m.reply(`
╮───────────────────────╭ـ
│ *أجابه خاطئه يا فاشل، جرب تاني* ┃❌ ❯
╯───────────────────────╰ـ`.trim())
        }
    }
    return !0
}

handler.exp = 0

export default handler
