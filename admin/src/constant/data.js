export const ADMIN_MENU_LIST = [
    { name: '健康', path: '/' },
    { name: '公告', path: '/notice' },
]

export const ADMIN_CONF_MENU_LIST = [
    { name: '账户管理', path: '/conf' },
    { name: '组织成员', path: '/conf/org' },
]

export const ADMIN_HEALTH_CARD_TYPE = [
    { id: 0, name: '未打卡', color: 'red'}, 
    { id: 1, name: '已打卡', color: 'green'}
]

export const ADMIN_HEALTH_TEMP_TYPE = [
    { id: 0, name: '异常', color: 'volcano' }, 
    { id: 1, name: '正常', color: 'geekblue' }, 
]

export const ADMIN_MEMBER_TYPE = [
    { id: 0, name: '成员', color: '#87d068'},
    { id: 1, name: '管理员', color: '#2db7f5' },
    { id: 2, name: '超级管理员', color: '#108ee9' },
]