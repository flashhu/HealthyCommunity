const db = require('./db');

/**
 * 确认某用户当日是否已打卡
 * @param {object} params json 
 * @param {function} cb 回调
 */
var vertifyCard = async (params, cb) => {
    let where = `where uid=${params.uid} and date='${params.date}'`
    db.select('card', where, '', '', (err, ret) => {
        if(err) {
            cb(err, {code: 0, msg:'数据查询失败！', status: false});
        }else{
            if (ret.rows.length > 0) {
                cb(err, { code: 1, msg: '用户已填写今日表单！', status: false });
            } else {
                cb(err, { code: 1, msg: '今日表单未填写！', status: true });
            }
        }
        
    })
}

/**
 * 确认某用户是否开始习惯养成计划
 * @param {object} params json 
 * @param {function} cb 回调
 */
var vertifyHabitStart = async (params, cb) => {
    let where = `where uid=${params.uid} and age > 0`
    db.select('health', where, '', '', (err, ret) => {
        if (err) {
            cb(err, { code: 0, msg: '数据查询失败！', status: false });
        } else {
            if (ret.rows.length > 0) {
                cb(err, { code: 1, msg: '用户已参与计划！', status: true });
            } else {
                cb(err, { code: 1, msg: '用户未参与计划！', status: false });
            }
        }
    })
}

/**
 * 确认某用户是否已填写健康表
 * @param {object} params json 
 * @param {function} cb 回调
 */
var vertifyHabitExist = async (params, cb) => {
    let where = `where uid=${params.uid}`
    db.select('health', where, '', '', (err, ret) => {
        if (err) {
            cb(err, { code: 0, msg: '数据查询失败！', status: false });
        } else {
            if (ret.rows.length > 0) {
                cb(err, { code: 1, msg: '用户已存在', status: true });
            } else {
                cb(err, { code: 1, msg: '用户不存在！', status: false });
            }
        }
    })
}

exports.vertifyCard = vertifyCard;
exports.vertifyHabitStart = vertifyHabitStart;
exports.vertifyHabitExist = vertifyHabitExist; 