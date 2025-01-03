const axios = require("axios");

module.exports = {
  command: "فيدو2",
  alias: ["ytv", "ytvideo"],
  category: ["downloader"],
  description: "Download video dari link YouTube",
  settings: {
    limit: true,
  },
  loading: true,
  async run(m, { sock, Func, Scraper, config, text }) {
    if (!/youtube.com|youtu.be/.test(text) || !text)
      throw "> Masukan Link YouTube nya";
    let data = await Scraper.YouTube.mp4(text);
    let cap = `*– 乂 YouTube - Video*\n`;
    cap += Object.entries(data.metadata)
      .map(([a, b]) => `> *- ${a.capitalize()} :* ${b}`)
      .join("\n");
    let size = await Func.formatSize(data.download.length);
    let limit = Func.sizeLimit(size, db.list().settings.max_upload);
    if (limit.oversize)
      throw `> Gagal mengunduh audio karena telah ukuran file untuk pengguna gratis *( ${size} )*, upgrade status mu ke premium agar dapat mengunduh audio hingga *1GB* !`;
    m.reply({
      video: data.download,
      caption: cap,
    });
  },
};
