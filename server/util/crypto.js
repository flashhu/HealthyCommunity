const crypto = require('crypto')

// 密匙
const SECRET_KEY = 'HealtH_z02O#' // 密匙是自定的，但需要保存好

// md5 加密
function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex') // 把输出编程16进制的格式
}

// 加密函数
function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}` // 拼接方式是自定的，只要包含密匙即可
    return md5(str)
}

module.exports = {
    genPassword
}
