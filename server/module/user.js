const db = require('./db');
const { genPassword } = require('../util/crypto');
const config = require('./config');

var client = config.client;
var argum = config.argum;
var requestOption = config.requestOption;

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
    password = genPassword(params.passwd)
    let where = `where phone='${params.phone}' and passwd='${password}'`
    db.select('user', where, '', '', (err, ret) => {
        if (err) {
            cb(err, { code: 0, data: null, msg: '数据查询失败！' });
        } else {
            if (ret.rows.length > 0 && (!(ret.rows[0].type === 0 && params.identity === 1))) {
                user = ret.rows[0]
                data = { id: user.id, name: user.name, phone: user.phone, address: user.address, passwd: params.passwd, remember: params.remember, type: user.type }
                cb(err, { code: 1, data: data, msg: '登录成功' })
            } else if (params.identity === 1) {
                cb(err, { code: 0, data: null, msg: '登录失败！请检查用户名、密码及权限！' });
            } else {
                cb(err, { code: 0, data: null, msg: '登录失败！请检查用户名或密码！' });
            }
        }
    })
}

/**
 * 确认手机号是否被注册
 * @param {object} params 
 * @param {function} cb 
 */
var verifyPhone = async (params, cb) => {
    let where = `where phone='${params.phone}'`
    db.select('user', where, '', '', (err, ret) => {
        if (err) {
            cb(err, { code: 0, data: null, msg: '数据查询失败！', captcha: null });
        } else {
            if (ret.rows.length > 0) {
                cb(err, { code: 0, data: null, msg: '该手机号已注册！', captcha: null });
            } else {
                argum.PhoneNumbers = params.phone
                captcha = JSON.parse(argum.TemplateParam)
                captcha.code = Math.random().toFixed(6).slice(-6)
                argum.TemplateParam = JSON.stringify(captcha);
                // client.request('SendSms', argum, requestOption).then((result) => {
                //     console.log(JSON.stringify(result));
                // }, (ex) => {
                //     console.log(ex);
                // })
                cb(err, { code: 1, data: params.phone, msg: '已发送', captcha: captcha.code })

            }
        }
    })
}
/**
 * 向数据库添加新用户
 * @param {object} params 
 * @param {function} cb 
 */

var addUser = async (params, cb) => {
    db.add('user', params, (err, ret) => {
        if (err) {
            cb(err, { code: 0, data: null, msg: '数据插入失败！' });
        } else {
            cb(err, { code: 1, data: params, msg: '注册成功！' });
        }
    })
}


exports.vertifyUser = vertifyUser;
exports.verifyPwd = verifyPwd;
exports.verifyPhone = verifyPhone;
exports.addUser = addUser;