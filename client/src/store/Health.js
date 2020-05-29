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
    @observable
    isSubmitHabit = false

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
                if(r.data.status) {
                    let data = r.data.data;
                    let ingest = !data.dailyIngest ? 1800 : data.dailyIngest;
                    let isSubmitHabit = !data.dailyIngest ? false : true;
                    let cardNum = !data.cardNum ? 0 : data.cardNum;
                    let cardDate = !data.cardDate ? null : data.cardDate;
                    runInAction(() => {
                        data['score'] = healthScoreCal(data);
                        this.scoreList = data;
                        this.isSubmitHabit = isSubmitHabit;
                    })
                    return { status: r.data.data.status, ingest: ingest, cardNum: cardNum, cardDate: cardDate };
                }else {
                    message.error(r.data.msg);
                    return {status: '',  ingest: 1800, cardNum: 0, cardDate: null};
                }
                
            } else {
                message.error(r.data.msg);
            }
        } else {
            message.error('网络错误', 0.7);
        }
    }

    @action
    async getSports() {
        const r = await axios.get(urls.API_USER_SUGEST_SPORT);
        if (r && r.status === 200) {
            return r.data.rows;
        } else {
            message.error('网络错误', 0.7);
        }
    }

    @action
    async getFoods(params) {
        const r = await axios.post(urls.API_USER_SUGEST_FOODS, params);
        if (r && r.status === 200) {
            return r.data.data;
        } else {
            message.error('网络错误', 0.7);
        }
    }

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
    async startHealthPlan(params) {
        const r = await axios.post(urls.API_USER_NEW_HEALTH_PLAN, params);
        if (r && r.status === 200) {
            return r.data;
        } else {
            message.error('网络错误', 0.7);
        }
    }

    @action
    async newHabitCard(params) {
        const r = await axios.post(urls.API_USER_HABIT_CARD, params);
        if (r && r.status === 200) {
            return r.data;
        } else {
            message.error('网络错误', 0.7);
        }
    }
}

export default new Health()