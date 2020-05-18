import { observable, action, runInAction } from 'mobx'
import { message } from 'antd'
import axios from 'axios'
import * as urls from '../constant/urls'
import token from '../util/token.js'
class User {
    @observable
    currUser = undefined
    //currUser = {id:1, name:'张三', phone:'13376546789', address:'1幢201室', passwd:'123456', type: 0}

    @action
    async startHealthPlan(params) {
        const r = await axios.post(urls.API_USER_NEW_HEALTH_PLAN, params);
        if (r && r.status === 200) {
            return r.data;
        } else {
            message.error('网络错误', 0.7);
        }
    }

    @action
    async register(user) {
        const r = await axios.post(urls.API_USER_REGISTER, user)
        if (r && r.status === 200) {
            return r.data
        }
    }

    @action
    async login(params) {
        const r = await axios.post(urls.API_USER_LOGIN, params)
        if (r && r.status === 200) {
            runInAction(() => {
                token.saveUser(r.data.data)
                this.currUser = r.data.data
                // console.log("this is store: "+r.data.data);
            })
            return r.data
        } else {
            message.error("网络错误", 0.7)
        }
    }


}

export default new User()