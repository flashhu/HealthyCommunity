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

/**
 * 确认密码是否正确
 * @param {object} params json
 * @param {function} cb 回调
 */
var verifyPwd = async (params, cb) => {
    let where = `where phone='${params.phone}' and passwd='${params.passwd}' and type='${params.type}'`
    db.select('user', where, '', '', (err, ret) => {
        if(err) {
            cb(err, {code: 0, data:null,msg:'数据查询失败！' });
        }else{
            if (ret.rows.length > 0) {
                cb(err, { code: 1, data: params, msg: '登录成功' })
            } else {
                cb(err, { code: 0, data: null, msg: '登录失败！请检查用户名、密码或权限' });
            }
        }
       
    })
}

exports.vertifyUser = vertifyUser;
exports.verifyPwd   = verifyPwd;
