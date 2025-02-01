import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 


global.openai_key = 'sk-0'

global.openai_org_id = 'org-3'



global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f']
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]
global.lolkeysapi = ['BrunoSobrino']
global.itsrose = ['4b146102c4d500809da9d1ff']

global.APIs = { 
  xteam: 'https://api.xteam.xyz',
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  violetics: 'https://violetics.pw',
  neoxr: 'https://api.neoxr.my.id',
  zenzapis: 'https://api.zahwazein.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',	
  fgmods: 'https://api-fgmods.ddns.net',
  botcahx: 'https://api.botcahx.biz.id',
  ibeng: 'https://api.ibeng.tech/docs',	
  rose: 'https://api.itsrose.site',
  popcat : 'https://api.popcat.xyz',
  xcoders : 'https://api-xcoders.site'
},
global.APIKeys = { 
  'https://api.xteam.xyz': `${keysxteam}`,
  'https://api.lolhuman.xyz': '85faf717d0545d14074659ad',
  'https://api.neoxr.my.id': `${keysneoxr}`,	
  'https://violetics.pw': 'beta',
  'https://api.zahwazein.xyz': `${keysxxx}`,
  'https://api-fgmods.ddns.net': 'fg-dylux',
  'https://api.botcahx.biz.id': 'Admin',
  'https://api.ibeng.tech/docs': 'tamvan',
  'https://api.itsrose.site': 'Rs-Zeltoria',
  'https://api-xcoders.site': 'Frieren'
}


/**************************/
global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment	
global.rpg = {
emoticon(string) {
string = string.toLowerCase()
let emot = {
  spoint:'⚡ نقطة',
  speed:'⚡ سرعه',

  
      level: '🧬 لــفــل',              
      limit: '💎 مـــاس',
      exp: '⚡ خــبــره',
      bank: '🏦 الــبــنــك',
      diamond: '💎 الــمــاس',
      health: '❤️ صــحــه',
      kyubi: '🌀 ســحــر',
      joincount: '🪙 عــمــلــات',
      emerald: '💚 إزمــيــرالــدا',
      stamina: '✨ طــاقــه',
      role: '💪 رانـــك',
      premium: '🎟️ بــريــمــيــوم',
      pointxp: '📧 نــقــاط خــبــره',
      gold: '👑 ذهــب',
      trash: '🗑 زبــالــه',
      crystal: '🔮 كــريــســتــال',
      intelligence: '🧠 ذكــاء',
      string: '🕸️ خــيــوط',
      keygold: '🔑 مـفـتـاح ذهــبـي',
      keyiron: '🗝️ مــفــتــاح حــديــدي',
      emas: '🪅 بـيـنـيـاتـا',
      fishingrod: '🎣 عــصــا صــيــد',
      gems: '🍀 احــجــار كــريــمــه',
      magicwand: '⚕️ عــصــا ســحــريــه',
      mana: '🪄 مــانــا',
      agility: '🤸‍♂️ خــفــه الــحــركــه',
      darkcrystal: '♠️ زجــاج اســود',
      iron: '⛓️ حــديــد',
      rock: '🪨 صــخــر',
      potion: '🥤 دواء',
      superior: '💼 تــرقــيـــه',
      robo: '🚔 ســـرقـــه',
      upgrader: '🧰 ابــديــت',
      wood: '🪵 خــشـب',
      strength: '🦹‍ ♀️ قـــوه',
      arc: '🏹 قــوس',
      armor: '🥼 درع',
      bow: '🏹 قــوس اســطــوري',
      pickaxe: '⛏️ بــيــكــاكــس',
      sword: '⚔️ ســيــف',
      common: '📦 صــنــدوق عــادي',
      uncoommon: '🥡 صــنــدوق قــديــم',
      mythic: '🗳️ صــنــدوق نــادر',
      legendary: '🎁 صــنــدوق اســطــوري',
      petFood: '🍖 طــعــام حــيــوانــات',
      pet: '🍱 بــيــت الــحــيــوانــات',
      bibitanggur: '🍇 عــنــب',
      bibitapel: '🍎 تــفــاح',
      bibitjeruk: '🍊 بـــرتــقــال',
      bibitmangga: '🥭 مــانــجــو',
      bibitpisang: '🍌 مــــوز',
      ayam: '🐓 ديـــك',
      babi: '🐖 خــنــزيــر',
      Jabali: '🐗 خــنــزيــر بــري',
      bull: '🐃 ثـــور',    
      buaya: '🐊 تــمــســاح',    
      cat: '🐈 قــطــه',      
      centaur: '🐐 مــعــزه',
      chicken: '🐓 دجــاجــه',
      cow: '🐄 بــقــره', 
      dog: '🐕 كــلــب',
      dragon: '🐉 تــنـيــن',
      elephant: '🐘 فــيــل',
      fox: '🦊 ثــعــلــب',
      giraffe: '🦒 زرافــه',
      griffin: '🦅 نـــســـر',
      horse: '🐎 حــصــان',
      kambing: '🐐 مــعــزه',
      kerbau: '🐃 جــامــوس',
      lion: '🦁 اســـد',
      money: '👾 شــادو كــويــنــز',
      monyet: '🐒 قـــرد',
      panda: '🐼 بــانــدا',
      snake: '🐍 ثــعــبــان',
      phonix: '🕊️ فــيــنــكــس',
      rhinoceros: '🦏 وحــيــد قـــرن',
      wolf: '🐺 ذئــب',
      tiger: '🐅 نــمــر',
      cumi: '🦑 حــبــار',
      udang: '🦐 جــمــبــري',
      ikan: '🐟 قـــرش',
      fideos: '🍝 ســيـديـهــا',
      ramuan: '🧪 عــنــصــر جــديــد',
      knife: '🔪 ســكــيــن'
    }
let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
if (!results.length) return ''
else return emot[results[0][0]]
}}
global.rpgg = {
emoticon(string) {
string = string.toLowerCase()
    let emott = {
      spoint:'⚡ ',
      speed:'⚡',
      level: '🧬',
      limit: '💎',
      exp: '⚡',
      bank: '🏦',
      diamond: '💎+',
      health: '❤️',
      kyubi: '🌀',
      joincount: '🪙',
      emerald: '💚',
      stamina: '✨',
      role: '💪',
      premium: '🎟️',
      pointxp: '📧',
      gold: '👑',
      trash: '🗑',
      crystal: '🔮',
      intelligence: '🧠',
      string: '🕸️',
      keygold: '🔑',
      keyiron: '🗝️',
      emas: '🪅',
      fishingrod: '🎣',
      gems: '🍀',
      magicwand: '⚕️',
      mana: '🪄',
      agility: '🤸‍♂️',
      darkcrystal: '♠️',
      iron: '⛓️',
      rock: '🪨',
      potion: '🥤',
      superior: '💼',
      robo: '🚔',
      upgrader: '🧰',
      wood: '🪵',
      strength: '🦹‍ ♀️',
      arc: '🏹',
      armor: '🥼',
      bow: '🏹',
      pickaxe: '⛏️',
      sword: '⚔️',
      common: '📦',
      uncoommon: '🥡',
      mythic: '🗳️',
      legendary: '🎁',
      petFood: '🍖',
      pet: '🍱',
      bibitanggur: '🍇',
      bibitapel: '🍎',
      bibitjeruk: '🍊',
      bibitmangga: '🥭',
      bibitpisang: '🍌',
      ayam: '🐓',
      babi: '🐖',
      Jabali: '🐗',
      bull: '🐃',    
      buaya: '🐊',    
      cat: '🐈',      
      centaur: '🐐',
      chicken: '🐓',
      cow: '🐄', 
      dog: '🐕',
      dragon: '🐉',
      elephant: '🐘',
      fox: '🦊',
      giraffe: '🦒',
      griffin: '🦅', 
      horse: '🐎',
      kambing: '🐐',
      kerbau: '🐃',
      lion: '🦁',
      money: '👾',
      monyet: '🐒',
      panda: '🐼',
      snake: '🐍',
      phonix: '🕊️',
      rhinoceros: '🦏',
      wolf: '🐺',
      tiger: '🐅',
      cumi: '🦑',
      udang: '🦐',
      ikan: '🐟',
      fideos: '🍝',
      ramuan: '🧪',
      knife: '🔪'
    }
let results = Object.keys(emott).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
if (!results.length) return ''
else return emott[results[0][0]]
}}
global.rpgshop = { //
emoticon(string) {
string = string.toLowerCase()
    let emottt = {
      spoint:'⚡ نقطة',
      speed:'⚡ سرعه',
      exp: '⚡ خــبــره',
      limit: '💎 الــمــاس',
      diamond: '💎 الــمــاس',
      joincount: '🪙 عــمــلــات',
      emerald: '💚 إزمــيــرالــدا',
      berlian: '♦️ جــواهـــر',
      kyubi: '🌀 ســحــر',
      gold: '👑 ذهــب',
      money: '👾 شــادو كــويــنــز',
      tiketcoin: '🎫 تـيــكــت كــويـــن',
      stamina: '✨ طــاقــه',
      potion: '🥤 دواء',
      aqua: '💧 مـــاء',
      trash: '🗑 زبــالــه',
      wood: '🪵 خــشــب',
      rock: '🪨 صــخــور',
      batu: '🥌 حــجــاره',
      string: '🕸️ خــيــوط',
      iron: '⛓️ حــديــد',
      coal: '⚱️ عــلــبــه',
      botol: '🍶 زجــاجــه',
      kaleng: '🥫 عــلــبــه',
      kardus: '🪧 لــافــتــه',
      eleksirb: '💡 كــهــربــاء',
      emasbatang: '〽️ ســبــيـكـه ذهــب',
      emasbiasa: '🧭 ذهــب',
      rubah: '🦊🌫️ ثــعــلــب اســطــوري',
      sampah: '🗑🌫️ قــمــامـــه',
      serigala: '🐺🌫️ ذئــب',
      kayu: '🛷 خــشــب اســطــوري',
      sword: '⚔️ ســيــف',
      umpan: '🪱 طــعــم', 
      healtmonster: '💵 تــذاكــر',
      emas: '🪅 بــيــنـيـاتـا',
      pancingan: '🪝 خــطــاف',
      pancing: '🎣 صــنــاره',
      common: '📦 صــنــدوق عــادي',
      uncoommon: '🥡 صــنــدوق قــديــم',
      mythic: '🗳️ صــنــدوق نــادر',
      pet: '🍱 بــيــت الــحــيــوانــات',//?
      gardenboxs: '💐 بــاقــه ورد',//?
      legendary: '🎁 صــنــدوق اســطــوري',
      anggur: '🍇 عــنــب',
      apel: '🍎 تــفــاح',
      jeruk: '🍊 بـــرتــقــال',
      mangga: '🥭 مــانــجــو',
      pisang: '🍌 مــــوز',
      bibitanggur: '🍇 عــنــب',
      bibitapel: '🍎 تــفــاح',
      bibitjeruk: '🍊 بـــرتــقــال',
      bibitmangga: '🥭 مــانــجــو',
      bibitpisang: '🍌 مــــوز',
      centaur: '🐐 مــعــزه',
      griffin: '🦅 نـــســـر',
      kucing: '🐈 قــطــه',
      naga: '🐉 تــنـيــن',
      fox: '🦊 ثــعــلــب',
      kuda: '🐎 حــصــان',
      phonix: '🕊️ فــيــنــكــس',
      wolf: '🐺 ذئــب',
      anjing: '🐶 كــلــب',
      petFood: '🍖 طــعــام حــيــوانــات', //?
      makanancentaur: '🐐🥩 لــحــم مــاعــز',
      makanangriffin: '🦅🥩 لــحــم نــســر',
      makanankyubi: '🌀🥩 غــذاء مــانــا',
      makanannaga: '🐉🥩 لــحــم تــنــيــن',
      makananpet: '🍱🥩 لــحــم حــيــوانــات الــيــفـــه',
      makananphonix: '🕊️🥩 لــحــم فـيـنـكس'  
    }
let results = Object.keys(emottt).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
if (!results.length) return ''
else return emottt[results[0][0]]
}}
global.rpgshopp = { //Tienda
  emoticon(string) {
    string = string.toLowerCase()
    let emotttt = {
      spoint:'⚡',
      exp: '⚡',
      limit: '💎',
      diamond: '💎+',
      joincount: '🪙',
      emerald: '💚',
      berlian: '♦️',
      kyubi: '🌀',
      gold: '👑',
      money: '👾',
      tiketcoin: '🎫',
      stamina: '✨',
      potion: '🥤',
      aqua: '💧',
      trash: '🗑',
      wood: '🪵',
      rock: '🪨',
      batu: '🥌',
      string: '🕸️',
      iron: '⛓️',
      coal: '⚱️',
      botol: '🍶',
      kaleng: '🥫',
      kardus: '🪧',
      eleksirb: '💡',
      emasbatang: '〽️',
      emasbiasa: '🧭',
      rubah: '🦊🌫️',
      sampah: '🗑🌫️',
      serigala: '🐺🌫️',
      kayu: '🛷',
      sword: '⚔️',
      umpan: '🪱', 
      healtmonster: '💵',
      emas: '🪅',
      pancingan: '🪝',
      pancing: '🎣',
      common: '📦',
      uncoommon: '🥡',
      mythic: '🗳️',
      pet: '📫',//?
      gardenboxs: '💐',//?
      legendary: '🎁',
      anggur: '🍇',
      apel: '🍎',
      jeruk: '🍊',
      mangga: '🥭',
      pisang: '🍌',
      bibitanggur: '🌾🍇',
      bibitapel: '🌾🍎',
      bibitjeruk: '🌾🍊',
      bibitmangga: '🌾🥭',
      bibitpisang: '🌾🍌',
      centaur: '🐐',
      griffin: '🦅',
      kucing: '🐈',
      naga: '🐉',
      fox: '🦊',
      kuda: '🐎',
      phonix: '🕊️',
      wolf: '🐺',
      anjing: '🐶',
      petFood: '🍖', //?
      makanancentaur: '🐐🥩',
      makanangriffin: '🦅🥩',
      makanankyubi: '🌀🥩',
      makanannaga: '🐉🥩',
      makananpet: '🍱🥩',
      makananphonix: '🕊️🥩'  
    }
let results = Object.keys(emotttt).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
if (!results.length) return ''
else return emotttt[results[0][0]]
}}	

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.redBright("Update 'config.js'"))
import(`${file}?update=${Date.now()}`)})