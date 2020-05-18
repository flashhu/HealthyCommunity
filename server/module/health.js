const db = require('./db');

/**
 * 确认某用户当日是否已打卡
 * @param {object} params json 
 * @param {function} cb 回调
 */
var vertifyCard = async (params, cb) => {
    let where = `where uphone='${params.uphone}' and date='${params.date}'`
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

exports.vertifyCard = vertifyCard;