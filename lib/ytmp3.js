const axios = require("axios");

module.exports = {
  command: "اغنيه2",
  alias: ["yta", "ytaudio"],
  category: ["downloader"],
  description: "Download audio dari link YouTube",
  settings: {
    limit: true,
  },
  loading: true,
  async run(m, { sock, Func, Scraper, config, text }) {
    if (!/youtube.com|youtu.be/.test(text) || !text)
      throw "> Masukan Link YouTube nya";
    let data = await Scraper.YouTube.mp3(text);
    let cap = `*– 乂 YouTube - Audio*\n`;
    cap += Object.entries(data.metadata)
      .map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`)
      .join("\n");
    let size = await Func.formatSize(data.download.length);
    let limit = Func.sizeLimit(size, db.list().settings.max_upload);
    if (limit.oversize)
      throw `> Gagal mengunduh audio karena telah ukuran file untuk pengguna gratis *( ${size} )*, upgrade status mu ke premium agar dapat mengunduh audio hingga *1GB* !`;
    m.reply({
      image: {
        url: data.metadata.thumbnail,
      },
      caption: cap,
    }).then((a) => {
      m.reply({
        audio: data.download,
        mimetype: "audio/mpeg",
      });
    });
  },
};
