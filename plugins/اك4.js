let handler = async (m, { conn, usedPrefix }) => {
    let room = Object.values(conn.game).find(room => 
        room.id.startsWith('tictactoe') && 
        [room.game.playerX, room.game.playerO].includes(m.sender)
    );

    if (!room) {
        return conn.sendButton(m.chat, '*[❗] انت لست في لعبة تيك تاك تو (اكس او)*', wm, null, [['ابدأ غرفة جديدة', `${usedPrefix}ttt مباراه جديدة`]], m);
    }

    delete conn.game[room.id];
    await m.reply('*[ ✔ ] تمت إزالة الغرفة*');
};

handler.command = /^(delttt|deltt|delxo|deltictactoe)$/i;
handler.fail = null;

export default handler;