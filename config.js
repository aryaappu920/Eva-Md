global.owner = ['919539102851'] // Put your number here
global.mods = ['919539102851'] // Want some help?
global.prems = ['919539102851'] // Premium user has unlimited limit
global.APIs = { // API Prefix
  // name: 'https://website'
  nrtm: 'https://nurutomo.herokuapp.com',
  bg: 'http://bochil.ddns.net',
  xteam: 'https://api.xteam.xyz',
  zahir: 'https://zahirr-web.herokuapp.com',
  zeks: 'https://api.zeks.xyz',
  pencarikode: 'https://pencarikode.xyz',
  LeysCoder: 'https://leyscoders-api.herokuapp.com',
  neoxr: 'https://neoxr-api.herokuapp.com',
  lolhum: 'https://api.lolhuman.xyz'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://neoxr-api.herokuapp.com': 'yntkts',
  'https://api.xteam.xyz': 'yourapikey',
  'https://api.lolhuman.xyz': 'yourapikey',
  'https://zahirr-web.herokuapp.com': 'zahirgans',
  'https://api.zeks.xyz': 'chika-key',
  'https://pencarikode.xyz': 'pais',
  'https://leyscoders-api.herokuapp.com': 'dappakntlll'
}

//===========Sticker WM============//
global.packname = 'Eva'
global.author = 'Sticker' 

global.wm = 'Eva'
global.wait = '*Wait a minute,*'
global.eror = '*Sorry the server is busy*'

//========Url 1 Template Buttons=========//
global.dtu1 = 'Instagram Owner'
global.urlnya1 = 'https://www.instagram.com/ani._.rudh_s/'

//=============callButtons=============//
global.dtc = 'Add Me'
global.phn = '+91 95391 02851'


global.multiplier = 69 // The higher, The harder levelup

global.rpg = {
  emoticon(string) {
    string = string.toLowerCase()
    let emot = {
      exp: 'βοΈ',
      money: 'π΅',
      potion: 'π₯€',
      diamond: 'π',
      common: 'π¦',
      uncommon: 'π',
      mythic: 'π³οΈ',
      legendary: 'ποΈ',
      pet: 'π',
      sampah: 'π',
      armor: 'π₯Ό',
      sword: 'βοΈ',
      kayu: 'πͺ΅',
      batu: 'πͺ¨',
      string: 'πΈοΈ',
      kuda: 'π',
      kucing: 'π' ,
      anjing: 'π',
      petFood: 'π',
      gold: 'π',
      emerald: 'π'
    }
    let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
    if (!results.length) return ''
    else return emot[results[0][0]]
  }
}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
