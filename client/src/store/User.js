import { observable, action } from 'mobx'
import { message } from 'antd'
import axios from 'axios'
import * as urls from '../constant/urls'

class User {
    @observable
    currUser = {id:1, name:'张三', phone:'13376546789', address:'1幢201室', passwd:'123456', type: 0}
    
    @action
    async startHealthPlan(params) {
        const r = await axios.post(urls.API_USER_NEW_HEALTH_PLAN, params);
        if (r && r.status === 200) {
            return r.data;
        } else {
            message.error('网络错误', 0.7);
        }
    }
}

export default new User()