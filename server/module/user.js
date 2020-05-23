const db = require('./db');
const { genPassword } = require('./crypto');
const Core = require('@alicloud/pop-core');

var client = new Core({
    accessKeyId: 'LTAI4GKjjedCZS2Hj9dUhCTZ',
    accessKeySecret: 'R6H4ZsGZrwPPudU58tGUMYXRjF2xO3',
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
});
var conf = {
    "RegionId": "cn-hangzhou",
    "PhoneNumbers": "",
    "SignName": "智能社区健康管理",
    "TemplateCode": "SMS_190781753",
    "TemplateParam": "{\"code\":\"\"}",
}

var requestOption = {
    method: 'POST'
};
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
            if (ret.rows.length > 0) {
                user = ret.rows[0]
                data = { name: user.name, sex: user.sex, age: user.age, phone: user.phone, address: user.address, passwd: params.passwd, remember: params.remember, type: user.type, weight: user.weight, height: user.height, level: user.level, target: user.target, dailyIngest: user.dailyIngest, score: user.score }
                cb(err, { code: 1, data: data, msg: '登录成功' })
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
                conf.PhoneNumbers = params.phone
                captcha = JSON.parse(conf.TemplateParam)
                captcha.code = Math.random().toFixed(6).slice(-6)
                conf.TemplateParam = JSON.stringify(captcha);
                client.request('SendSms', conf, requestOption).then((result) => {
                    console.log(JSON.stringify(result));
                }, (ex) => {
                    console.log(ex);
                })
                cb(err, { code: 1, data: params.phone, msg: '已发送', captcha: captcha.code })

            }
        }
    })
}


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