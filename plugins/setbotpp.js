let handler = async (m, { conn }) => {
    let bot = conn.user.jid // Bot
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image/.test(mime)) {
        let img = await q.download()
        if (!img) throw `reply to the picture!`
        conn.updateProfilePicture(bot, img)
        m.reply('```Success```')
    }
}
handler.help = ['setbotpp']
handler.command = /^(set(bot)?pp)$/i
handler.owner = true

module.exports = handler
