const Core = require('@alicloud/pop-core');
let conf = {
    host: 'rm-bp1booh30eg441m31fo.mysql.rds.aliyuncs.com',
    port: 3306,
    database: 'health_db',
    user: 'healthdbuser',
    password: 'asdf2jkl',
};

var client = new Core({
    accessKeyId: 'LTAI4GKjjedCZS2Hj9dUhCTZ',
    accessKeySecret: 'R6H4ZsGZrwPPudU58tGUMYXRjF2xO3',
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
});
var argum = {
    "RegionId": "cn-hangzhou",
    "PhoneNumbers": "",
    "SignName": "智能社区健康管理",
    // "TemplateCode": "SMS_190781753",
    "TemplateCode": "SMS_192820815",
    "TemplateParam": "{\"code\":\"\"}",
}

var requestOption = {
    method: 'POST'
};

module.exports = {
    conf,
    client,
    argum,
    requestOption
}
