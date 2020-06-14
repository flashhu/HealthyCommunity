const API_SERVER = 'http://localhost:8080';
// const API_SERVER = 'http://www.flashhu.site:8080';

// health
export const API_USER_NEW_CARD         = API_SERVER + '/health/newCard';
export const API_USER_NEW_HEALTH_PLAN  = API_SERVER + '/health/newPlan';
export const API_USER_CARD_DATA = API_SERVER + '/health/cardData/';
export const API_USER_SCORE = API_SERVER + '/health/score/';
export const API_USER_SUGEST_SPORT = API_SERVER + '/health/sports';
export const API_USER_SUGEST_FOODS = API_SERVER + '/health/foods';
export const API_USER_HABIT_CARD = API_SERVER + '/health/habitCard';
export const API_USER_HEALTH_STATUS = API_SERVER + '/health/healthStatus';

//user
export const API_USER_LOGIN            = API_SERVER + '/user/login';
export const API_USER_REGISTER         = API_SERVER + '/user/register';
export const API_USER_VALIDATE_PHONE   = API_SERVER + '/user/validate';

//service
export const API_USER_GOODS            = API_SERVER + '/service/goods';
export const API_USER_CART             = API_SERVER + '/service/cart';
export const API_USER_SUBMIT_ORDER     = API_SERVER + '/service/submitOrder';

//conf
export const API_USER_VALIDATE_AUTH    = API_SERVER + '/conf/valAuth';
export const API_USER_VALIDATE_CAPTCHA = API_SERVER + '/conf/valCaptcha';
export const API_USER_UPDATE_PHONE     = API_SERVER + '/conf/updatePhone';
export const API_USER_UPDATE_PWD       = API_SERVER + '/conf/updatePwd';

//notice
export const API_NOTICE_DATA = API_SERVER + '/notice/noticeData';
export const API_NOTICE_SEARCH = API_SERVER + '/notice/search';
export const API_NOTICE_DETAIL = API_SERVER + '/notice/detail/';
