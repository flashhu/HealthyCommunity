import { observable, action, runInAction } from 'mobx'
import { message } from 'antd'
import axios from 'axios'
import * as urls from '../constant/urls'
import { API_MEMBER_DATA, API_UPDATE_MEMBER, API_DELETE_MEMBER } from '../constant/urls'
import token from '../util/token.js'
class User {
    @observable
    currUser = undefined
    @observable
    captcha = undefined
    @observable
    memberList = []
    @observable
    userList = []

    @action
    async getMemberData() {
        const r = await axios.get(API_MEMBER_DATA);
        if (r && r.status === 200) {
            if (r.data.code) {
                runInAction(() => {
                    this.memberList = r.data.data.memberList;
                    this.userList = r.data.data.userList;
                })
            }
        } else {
            message.error('网络错误', 0.7);
        }
    }

    @action
    async updateMember(params) {
        const r = await axios.post(API_UPDATE_MEMBER, { phone: params.record.phone, type: params.type });
        if (r && r.status === 200) {
            if (r.data.code) {
                if (params.new) { //提升权限
                    message.success('提升权限成功！');
                } else { //修改权限
                    message.success('权限更新成功！');
                }
            }
        } else {
            message.error('网络错误', 0.7);
        }
    }

    @action
    async deleteMember(params) {
        const r = await axios.get(API_DELETE_MEMBER + params.phone);
        if (r && r.status === 200) {
            if (r.data.code) {
                let msg = params.isCurr ? '已退出该组织' : '移除成员成功！';
                message.success(msg);
            }
        } else {
            message.error('网络错误', 0.7);
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
                }
            })
            return r.data
        } else {
            message.error("网络错误", 0.7)
        }
    }


    @action
    logout() {
        token.removeUser();
        this.currUser = undefined
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
            // console.log('this is store:',r.data)
            token.removeUser();
            return r.data;
        }
    }
}

export default new User()