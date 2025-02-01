/*
Developer Rights Obito Sar
...........
اذا كنت مش مثبت المكتبه ها هو الاصدار 
"javascript-obfuscator": "^4.1.1",
ضعه بلي package.json
*/
import obfuscator from 'javascript-obfuscator';

let handler = async (m, { conn, args }) => {
    if (args.length < 2) {
        return m.reply(`*\`استخدم الأمر بهذا الشكل:\`*\n\n*.تشفير-كود <رقم_المستوى> <الكود>*\n> مستوي التشفير من 1 لـ 5`); 
    }

    let level = parseInt(args[0]);
    if (isNaN(level) || level < 1 || level > 5) {
        return m.reply(`يرجى تحديد مستوى بين 1 و 5.`);
    }

    const code = args.slice(1).join(' ');

    let options;
    switch (level) {
        case 1: // مستوى بسيط
            options = {
                compact: true,
                selfDefending: false,
            };
            break;
        case 2: // مستوى متوسط
            options = {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 0.5,
            };
            break;
        case 3: // مستوى قوي
            options = {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 0.75,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 0.4,
                stringArray: true,
                stringArrayThreshold: 0.75,
            };
            break;
        case 4: // مستوى أقوى
            options = {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 1,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 0.7,
                stringArray: true,
                stringArrayEncoding: ['base64'],
                stringArrayThreshold: 1,
                splitStrings: true,
                splitStringsChunkLength: 5,
                transformObjectKeys: true,
            };
            break;
        case 5: // أعلى مستوى
            options = {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 1,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 1,
                stringArray: true,
                stringArrayEncoding: ['rc4'],
                stringArrayThreshold: 1,
                splitStrings: true,
                splitStringsChunkLength: 3,
                transformObjectKeys: true,
                disableConsoleOutput: true,
            };
            break;
    }

    try {
        const obfuscatedCode = obfuscator.obfuscate(code, options).getObfuscatedCode();
        m.reply(`${obfuscatedCode}`);
    } catch (err) {
        m.reply(`حدث خطأ أثناء التشفير: ${err.message}`);
    }
};

handler.help = ['تشفير-كود'];
handler.tags = ['main'];
handler.command = ['تشفير-كود','تشفير'];
export default handler;