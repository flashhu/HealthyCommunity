import { observable, action, runInAction } from 'mobx'
import { message } from 'antd'
import axios from 'axios'
import * as urls from '../constant/urls'
import { healthScoreCal } from '../util/healthcal'

class Health{
    @observable
    cardList = undefined
    @observable
    scoreList = { score: '??' }
    
    @action
    async addCard(params) {
        const r = await axios.post(urls.API_USER_NEW_CARD, params);
        if (r && r.status === 200) {
            return r.data;
        } else {
            message.error('网络错误', 0.7);
        }
    }

    @action
    async getCardData(phone) {
        const r = await axios.get(urls.API_USER_CARD_DATA + phone);
        if (r && r.status === 200) {
            if (r.data.code) {
                runInAction(() => {
                    this.cardList = r.data.data;
                })
                return r.data.data;
            } else {
                message.error(r.data.msg);
            }
        } else {
            message.error('网络错误', 0.7);
        }
    }

    @action
    async getScore(phone) {
        const r = await axios.get(urls.API_USER_SCORE + phone);
        if (r && r.status === 200) {
            if (r.data.code) {
                let data = r.data.data;
                runInAction(() => {
                    data['score'] = healthScoreCal(data);
                    this.scoreList = data;
                })
                return r.data.data.status;
            } else {
                message.error(r.data.msg);
            }
        } else {
            message.error('网络错误', 0.7);
        }
    }

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

export default new Health()