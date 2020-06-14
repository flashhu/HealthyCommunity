export const USER_MENU_LIST = [
    { name: '健康', path: '/' },
    { name: '服务', path: '/service' },
    { name: '公告', path: '/notice' },
]

export const ADMIN_MENU_LIST = [
    { name: '健康', path: '/admin/health' },
    { name: '公告', path: '/admin/notice' },
]

export const USER_CONF_MENU_LIST = [
    { name: '账户管理', path: '/conf' },
    { name: '我的订单', path: '/conf/order' },
]

// 健康状态对应的提示
export const HEALTH_MESSAGE = [
    '低烧，注意休息，尽早就医',
    '当前处于健康状态，继续保持',
    '高烧，注意休息，尽早就医',
    '适量运动，合理调节运动强度',
    '血压偏低，调节饮食，适当加强锻炼',
    '血压偏高，少油少盐，适当加强锻炼',
    '适当运动，均衡膳食，保持规律的作息，维持良好的生活习惯，有助于保持健康哦~'
]

//健康模块svg
export const HEALTH_ICON = {
    temp: 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/svg/temperature.svg',
    heartrate: 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/svg/heartrate.svg',
    blodpres: 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/svg/bloodpressure.svg'
}

//健康模块膳食推荐每顿所占比例
export const HEALTH_MEAL_SCALE = [0.3, 0.4, 0.3]

//健康模块膳食推荐每顿传入的计算主食，肉蛋奶比例 
export const HEALTH_DIET_SCALE = {
    breakfast: '0.4|0.45',
    lunch: '0.5|0.35',
    dinner: '0.5|0.35'
}

//健康模块 三餐对应的蔬果摄入
export const HEALTH_VEGETABLE = [60, 50, 50]

// 服务模块
