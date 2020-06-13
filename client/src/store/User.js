import { observable, action, runInAction } from 'mobx'
import { message } from 'antd'
import axios from 'axios'
import * as urls from '../constant/urls'
import token from '../util/token.js'
class User {
    @observable
    currUser = undefined
    captcha = undefined

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
                if (this.currUser && !this.currUser.remember) {
                    token.removeUser();
                    console.log("not remember");
                }
            })
            return r.data
        } else {
            message.error("网络错误", 0.7)
        }
    }

    @action
    async valPhone(params) {
        const r = await axios.post(urls.API_USER_VALIDATE_PHONE, params)
        if (r && r.status === 200) {
            this.captcha = r.data.captcha
            return r.data
        }
    }
    @action
    async valAuth(params) {
        const r = await axios.post(urls.API_USER_VALIDATE_AUTH, params)
        if (r && r.status === 200) {
            this.captcha = r.data.captcha
            return r.data
        }
    }
    @action
    async valCaptcha(params) {
        const r = await axios.post(urls.API_USER_VALIDATE_CAPTCHA, params)
        if (r && r.status === 200) {
            return r.data
        }
    }
    @action
    async updatePhone(params) {
        const r = await axios.post(urls.API_USER_UPDATE_PHONE, params)
        if (r && r.status === 200) {
            runInAction(() => {
                this.currUser.phone = r.data.phone;
                token.removeUser();
            })
            return r.data;
        }
    }
    @action
    async updatePwd(params) {
        const r = await axios.post(urls.API_USER_UPDATE_PWD, params)
        if (r && r.status === 200) {
            console.log('this is store:',r.data)
            token.removeUser();
            return r.data;
        }
    }
    @action
    logout() {
        token.removeUser();
        this.currUser = undefined
    }
}

export default new User()