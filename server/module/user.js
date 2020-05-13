const db = require('./db');

/**
 * 确认账户是否存在
 * @param {object} params json 
 * @param {function} cb 回调
 */
var vertifyUser = async (params, cb) => {
    let where = `where name='${params.name}' and phone='${params.phone}'`
    db.select('user', where, '', '', (err, ret) => {
        if (ret.length > 0) {
            cb(err, true)
        } else {
            cb(err, false)
        }
    })
}

exports.vertifyUser = vertifyUser;