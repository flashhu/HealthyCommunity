const API_SERVER = 'http://localhost:8080';
// const API_SERVER = 'http://www.flashhu.site:8080';

// health
export const API_HEALTH_DATA_LIST = API_SERVER + '/health/dataList';
export const API_HEALTH_SEARCH = API_SERVER + '/health/search';
export const API_HEALTH_CHART_DATA = API_SERVER + '/health/chartData';

//user
export const API_MEMBER_DATA = API_SERVER + '/user/memberData';
export const API_UPDATE_MEMBER = API_SERVER + '/user/updateMember';
export const API_DELETE_MEMBER = API_SERVER + '/user/deleteMember/';
export const API_USER_LOGIN = API_SERVER + '/user/login';
export const API_USER_REGISTER = API_SERVER + '/user/register';
export const API_USER_VALIDATE_PHONE = API_SERVER + '/user/validate';
export const API_USER_VALIDATE_AUTH = API_SERVER + '/conf/valAuth';
export const API_USER_VALIDATE_CAPTCHA = API_SERVER + '/conf/valCaptcha';
export const API_USER_UPDATE_PHONE = API_SERVER + '/conf/updatePhone';
export const API_USER_UPDATE_PWD = API_SERVER + '/conf/updatePwd';

//notice
export const API_NOTICE_DATA = API_SERVER + '/notice/noticeData';
export const API_NOTICE_SEARCH = API_SERVER + '/notice/search';
export const API_DELETE_NOTICE = API_SERVER + '/notice/deleteNotice/';
export const API_ADD_NOTICE = API_SERVER + '/notice/addNotice';
export const API_NOTICE_DETAIL = API_SERVER + '/notice/detail/';