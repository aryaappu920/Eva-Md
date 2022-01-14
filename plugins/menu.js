let { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys-md')
let levelling = require('../lib/levelling')
let fs = require('fs')
const util = require('util')
const os = require('os')
let path = require('path')
let { createHash} = require('crypto')
let fetch = require('node-fetch')
let { perfomance } = require('perf_hooks')
let moment = require('moment-timezone')
const defaultMenu = {
          before: `*This bot is still in the development stage, if there is a feature error bug, please report it to the owner or developer of the bot*
Click here=>%readmore`.trimStart(),
  header: '╭─「 *%category* 」',
  body: '│ • %cmd %islimit %isPremium',
  footer: '╰────\n',
          after: ` `,
}

let handler = async (m, { conn, usedPrefix: _p, args, command, DevMode }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'anime', 'update', 'education', 'news', 'random', 'game', 'xp', 'stiker', 'rpg', 'magicshell', 'quotes', 'admin', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'vote', 'nsfw', 'audio', 'jadibot', 'info', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'MAIN',
    'game': 'GAME',
    'anime': 'ANIME', 
    'rpg': 'RPG', 
    'edukasi': 'EDUCATION', 
    'news': 'NEWS', 
    'random': 'RANDOM',
    'xp': 'EXP & LIMIT',
    'sticker': 'STIKER',
    'kerang': 'MAGIC SHELL',
    'quotes': 'QUOTES',
    'admin': `ADMIN ${global.opts['restrict'] ? '' : '(Disabled)'}`,
    'group': 'GRUP',
    'premium': 'PREMIUM',
    'internet': 'INTERNET',
    'anonymous': 'ANONYMOUS CHAT',
    'nulis': 'MAGER NULIS & LOGO',
    'downloader': 'DOWNLOADER',
    'tools': 'TOOLS',
    'fun': 'FUN',
    'database': 'DATABASE',
    'vote': 'VOTING',
    'absen': 'ABSEN',
    'audio': 'Voice Changer',
    'jadibot': 'JADI BOT',
    'info': 'INFO',
    'update': 'UPDATE',
    'nsfw': 'NSFW',
    'host': 'HOST',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'anime') tags = {
    'anime': 'Anime'
  }
  if (teks == 'nsfw') tags = {
    'nsfw': 'Nsfw'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'Rpg'
  }
  if (teks == 'edukasi') tags = {
    'edukasi': 'Education'
  }
  if (teks == 'news') tags = {
    'news': 'News'
  }
  if (teks == 'random') tags = {
    'random': 'Random'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'magicshell') tags = {
    'kerang': 'Magic Shell'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Disabled)'}`,
    'group': 'Grup'
  }
  if (teks == 'group') tags = {
    'group': 'Group'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
  if (teks == 'absen') tags = {
    'absen': 'Absen'
  }
  if (teks == 'audio') tags = {
    'audio': 'Voice Changer'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }
 if (teks == 'nsfw') tags = {
    'nsfw': 'Nsfw'
  }
  if (teks == 'update') tags = {
    'update': 'Update'
  }
 

  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = await registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'en'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let waktuwib = moment.tz('Asia/Kolkata').format('HH:mm:ss')
    
let aoa = `${ucapan()}, ${name}
⏳ 𝕋𝕀𝕄𝔼 : ${time}
💮 𝕎𝔼𝔼𝕂 : ${week}
📆 𝔻𝔸𝕋𝔼: ${date}
☮️ 𝕆𝕎ℕ𝔼ℝ : ANIRUDH S`.trim()
let anu = `Please Select Menu Below!`.trim()
let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
    return {
      help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit,
      premium: plugin.premium,
      enabled: !plugin.disabled,
    }
  })
    if (teks == '404') {
        const template = generateWAMessageFromContent(m.key.remoteJid, proto.Message.fromObject({
        listMessage: {
            title: aoa,
            description: anu,
            buttonText: 'Click Here ',
            listType: 1,
            footerText: wm,
            mtype: 'listMessage',
            sections: [
              {
                "rows": [{
                  "title": `📜 All Commands`,
                  "description": "Show all features",
                  "rowId": `${_p}? all`
                  }],
              }, {
                "rows": [{
                  "title": `🎮 Game`,
                  "description": "Game features",
                  "rowId": `${_p}? anime`
                }],
              }, {
                "rows": [{
                  "title": `Menu Admin & Group`,
                  "description": "Menu untuk admin & grup",
                  "rowId": `${_p}? admin`
                }],
              }, {
                "rows": [{
                  "title": "💸 XP",
                  "description": "Features level & usage limit",
                  "rowId": ".? xp"
                }],
              }, {
                "rows": [{
                  "title": `Menu Audio`,
                  "description": "Menu pengubah suara audio atau convert audio",
                  "rowId": `${_p}? audio`
                }],
              }, {
                "rows": [{
                  "title": `Menu Downloader`,
                  "description": "Menu download media video, foto, dan file",
                  "rowId": `${_p}? downloader`
                }],
              }, {
                "rows": [{
                  "title": `Menu Database`,
                  "description": "Menu cek database bot",
                  "rowId": `${_p}? database`
                }],
              }, {
                "rows": [{
                  "title": `Menu Edukasi`,
                  "description": "Menu edukasi untuk sehari-hari",
                  "rowId": `${_p}? edukasi`
                }],
              }, {
                "rows": [{
                  "title": `Menu Fun`,
                  "description": "Menu fun hanya untuk bersenang-senang, jangan baperan yaa<3",
                  "rowId": `${_p}? fun`
                }],
              }, {
                "rows": [{
                  "title": `Menu Game`,
                  "description": "Menu untuk bermain game dan mendapatkan xp untuk levelup",
                  "rowId": `${_p}? game`
                }],
              }, {
                "rows": [{
                  "title": `Menu Info`,
                  "description": "Menu info seperti pemilik bot dan source code bot",
                  "rowId": `${_p}? info`
                }],
              }, {
                "rows": [{
                  "title": `Menu Internet`,
                  "description": "Menu untuk menjelajah di internet",
                  "rowId": `${_p}? internet`
                 }],
              }, {
                "rows": [{
                  "title": `Menu Jadibot`,
                  "description": "Menu jadibot smentara",
                  "rowId": `${_p}? jadibot`
                }],
              }, {
                "rows":[{
                  "title": `Menu Kerang Ajaib`,
                  "description": "Menu jawaban random dari bot, masa gak tau gak pernah nonton spongebob ya?",
                  "rowId": `${_p}? magicshell`
                }],
              }, {
                "rows": [{
                  "title": `Menu News`,
                  "description": "Menu berita lokal sampai internasional",
                  "rowId": `${_p}? news`
                }],
              }, {
                "rows": [{
                  "title": `Menu Nulis & Logo`,
                  "description": "Menu mager nulis & logo",
                  "rowId": `${_p}? nulis`
                }],
              }, {
                "rows": [{
                  "title": `Menu Nsfw`,
                  "description": "Menu khusus dewasa 🔞",
                  "rowId": `${_p}? nsfw`
                }],
              }, {
                "rows": [{
                  "title": `Menu Premium`,
                  "description": "Menu untuk user premium, jika ingin menggunakannya daftar premium dulu ke owner",
                  "rowId": `${_p}? premium`
                }],
              }, {
                "rows": [{
                  "title": `Menu Quotes`,
                  "description": "Menu random quotes & membuat quotes",
                  "rowId": `${_p}? quotes`
                }],
              }, {
                "rows": [{
                  "title":  `Menu RPG`,
                  "description": "Menu game rpg (role playing game)",
                  "rowId": `${_p}? rpg`
                }],
              }, {
                "rows": [{
                  "title": `Menu Random`,
                  "description": "Menu random foto, video, dan stiker",
                  "rowId": `${_p}? random`
                }],
              }, {
                "rows": [{
                  "title":  `Menu Stiker`,
                  "description": "Menu membuat stiker dan mencari stiker",
                  "rowId": `${_p}? stiker`
                }],
              }, {
                "rows": [{
                  "title":  `Menu Tools`,
                  "description": "Menu alat convert",
                  "rowId": `${_p}? tools`
                }],
              }, {
                "rows": [{
                  "title":  `Menu Update`,
                  "description": "Menu fitur baru bot, silahkan di cek <3",
                  "rowId": `${_p}? update`
                }],
              }, {
                "rows": [{
                  "title":  `Menu Vote & Absen`,
                  "description": "Menu untuk vote dan absen",
                  "rowId": `${_p}? vote`
                }],
                }, {
                "rows": [{
                  "title":  `Menu XP dan Limit`,
                  "description": "Menu cek level, xp, limit, dan pendaftaran user",
                  "rowId": `${_p}? xp`
                }],
                }, {
                "rows": [{
                  "title":  `Menu Owner`,
                  "description": `Menu khusus untuk owner ${conn.user.name}`,
                  "rowId": `${_p}? update`
                }],
                }, {
                "rows": [{
                  "title":  `Shop`,
                  "description": "Jual rdp murah dll",
                  "rowId": `${_p}shop`
                }],
              }
            ], "contextInfo": {
              "stanzaId": m.key.id,
              "participant": m.sender,
              "quotedMessage": m.message
            }
    }}), { userJid: m.participant || m.key.remoteJid, quoted: m });
    return await conn.relayMessage(
        m.key.remoteJid,
        template.message,
        { messageId: template.key.id }
    )
    }
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Presented by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
        before,
        ...Object.keys(tags).map(tag => {
          return header.replace(/%category/g, tags[tag]) + '\n' + [
            ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
              return menu.help.map(help => {
                return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                  .replace(/%islimit/g, menu.limit ? '```Limit```' : '')
                  .replace(/%isPremium/g, menu.premium ? '```Premium```' : '')
                  .trim()
              }).join('\n')
            }),
            footer
          ].join('\n')
        }),
        after
      ].join('\n')
      text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      name,
      ucapan: ucapan(),
      name, weton, week, date, dateIslamic, time,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    //let pp = await conn.profilePictureUrl(conn.user.jid, 'image').catch(_ => path.join(__dirname, '../src/avatar_contact.png'))
    await conn.send3TemplateButtonLoc(m.chat, text.trim(), wm, await(await require('node-fetch')(img)).buffer(), `🏅Owner`, `${_p}owner`, `🎗  Info Bot  🎗`, `${_p}infobot`, m)
    } catch (e) {
    conn.reply(m.chat, 'Maaf, try again', m)
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Kolkata').format('HH')
  if (time >= 4) {
    res = "Good Morning ☀"
  }
  if (time > 10) {
    res = "Good Afternoon 🌞"
  }
  if (time >= 15) {
    res = "Good Evening🌝"
  }
  if (time >= 18) {
    res = "Good Night 🌚"
  }
  return res
}