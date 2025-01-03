module.exports = {
  command: "فيدو",
  alias: [],
  category: ["downloader"],
  description: "Download dan upload video dari videy",
  loading: true,
  async run(m, { sock, Func, Uploader, text }) {
    if (!text)
      throw "*– 乂 Cara Penggunaan*\n> *`--upload`* Untuk upload video ke videy\n> *`https://videy.co/xxx`* untuk download video dari videy";
    if (text.includes("--upload")) {
      let q = m.quoted ? m.quoted : m;
      if (!/video/.test(q.msg.mimetype) || !q.isMedia)
        throw `> Reply/kirim video Dengan caption ${m.prefix + m.command} ${text}`;
      let buffer = await q.download();
      let hasil = await Uploader.videy(buffer);
      let cap = "*– 乂 Videy - Uploader*\n";
      cap += `> *- Ukuran :* ${Func.formatSize(buffer.length)}\n`;
      cap += `> *- Link :* ${hasil}`;

      m.reply(cap);
    } else {
      if (!Func.isUrl(text) || !/videy.co/.test(text))
        throw "> Masukan link Videy nya";
      let id = text.split("id=")[1];
      if (!id) throw "> Gada id nya tuh coba pake link lain";
      let hasil = `https://cdn.videy.co/${id}.mp4`;
      let size = await Func.getSize(hasil);
      let limit = Func.sizeLimit(size, db.list().settings.max_upload);
      if (limit.oversize)
        throw `Ukuran File terlalu besar *( ${size} )*, Uprgade ke premium agar dapat download ukuran video hingga *1GB !*`;
      let cap = "*– 乂 Videy - Downloader*\n";
      cap += `> *- Ukuran video :* ${size}`;
      m.reply({
        video: {
          url: hasil,
        },
        caption: cap,
      });
    }
  },
};
