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

//notice
export const API_NOTICE_DATA = API_SERVER + '/notice/noticeData';
export const API_NOTICE_SEARCH = API_SERVER + '/notice/search';
export const API_DELETE_NOTICE = API_SERVER + '/notice/deleteNotice/';