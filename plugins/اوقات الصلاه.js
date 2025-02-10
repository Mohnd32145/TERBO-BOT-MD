export async function before(m) {
    this.autosholat = this.autosholat ? this.autosholat : {};
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender;
    let name = await this.getName(who);
    let id = m.chat;
    if (id in this.autosholat) {
        return false;
    }
    let jadwalSholat = {
        الفجر: "04:43",
        الضحى: "06:05",
        الظهر: "01:01",
        العصر: "04:38",
        المغرب: "07:44",
        العشاء: "09:09"
    };
    const date = new Date(new Date().toLocaleString("ar-US", {
      timeZone:"Africa/Cairo"
    }));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
        if (timeNow === waktu) {
            let caption = `حان موعد صلاة *${sholat}* اذهب و توضأ بسرعة و قم لصلاتك  ولا تنسانا من الدعاء.\n\n*${waktu}*\nهذا توقيت الصلاة في القاهرة`;
            this.autosholat[id] = [
                this.reply(m.chat, caption, null),
                setTimeout(() => {
                    delete this.autosholat[id];
                }, 57000)
            ];
        }
    }
}
