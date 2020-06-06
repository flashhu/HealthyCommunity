import { observable, action, runInAction } from 'mobx'
import { message } from 'antd'
import axios from 'axios'
import * as urls from '../constant/urls'
import { healthScoreCal } from '../util/healthcal'
import { HEALTH_MEAL_SCALE } from '../constant/data'

class Health{
    @observable
    cardList = { tempList: [], heartList: [], bloodList: [] }
    @observable
    cardData = {
        date: '暂未',
        temp: '??.?',
        heartrat: '??',
        blodpres_relax: '??',
        blodpres_shrink: '???' 
    }
    @observable
    scoreList = { score: '??' }
    @observable
    isSubmitHabit = false

    @observable
    ingest = {
        bIngest: 540,
        lIngest: 720,
        dIngest: 540,
    }
    //所有可用的食物列表
    @observable
    foodList = {
        bFoodList: { staple: [], meat: [], vegetable: [] },
        lFoodList: { staple: [], meat: [], vegetable: [] },
        dFoodList: { staple: [], meat: [], vegetable: [] }
    }
    //推荐食物（3个）
    @observable
    bSugstList = {}
    @observable
    lSugstList = {}
    @observable
    dSugstList = {}
    //推荐运动（3个）
    @observable
    sportsList = []

    @action
    setSportsList(sportsList) {
        runInAction(()=>{
            this.sportsList = sportsList
        })
    }

    @action
    setFoodList(foodList) {
        runInAction(() => {
            this.foodList = foodList
        })
    }

    @action
    setBSugstList(bSugstList) {
        runInAction(()=>{
            this.bSugstList = bSugstList
        })
    }

    @action
    setLSugstList(lSugstList) {
        runInAction(() => {
            this.lSugstList = lSugstList
        })
    }

    @action
    setDSugstList(dSugstList) {
        runInAction(() => {
            this.dSugstList = dSugstList
        })
    }

    @action
    async getCardData(id) {
        const r = await axios.get(urls.API_USER_CARD_DATA + id);
        if (r && r.status === 200) {
            if (r.data.code) {
                let data = r.data.data;
                let date = data.tempList.length > 0 ? data.tempList[data.tempList.length - 1].date : '暂未';
                let temp = data.tempList.length > 0 ? data.tempList[data.tempList.length - 1].temp : '??.?';
                let heartrat = data.heartList.length > 0 ? data.heartList[data.heartList.length - 1].heartrat : '??';
                let blodpres_relax = data.bloodList.length > 0 ? data.bloodList[data.bloodList.length - 1].blodpres_relax : '??';
                let blodpres_shrink = data.bloodList.length > 0 ? data.bloodList[data.bloodList.length - 1].blodpres_shrink : '???';
                runInAction(() => {
                    this.cardList = data;
                    this.cardData = {
                        date: date,
                        temp: temp,
                        heartrat: heartrat,
                        blodpres_relax: blodpres_relax,
                        blodpres_shrink: blodpres_shrink
                    }
                })
            } else {
                message.error(r.data.msg);
            }
        } else {
            message.error('网络错误', 0.7);
        }
    }

    @action
    async getScore(id) {
        const r = await axios.get(urls.API_USER_SCORE + id);
        if (r && r.status === 200) {
            if (r.data.code) {
                if(r.data.status) {
                    let data = r.data.data;
                    data['score'] = healthScoreCal(data);
                    let ingest = !data.dailyIngest ? 1800 : data.dailyIngest;
                    let isSubmitHabit = !data.dailyIngest ? false : true;
                    let cardNum = !data.cardNum ? 0 : data.cardNum;
                    let cardDate = !data.cardDate ? null : data.cardDate;
                    runInAction(() => {
                        this.scoreList = data;
                        this.isSubmitHabit = isSubmitHabit;
                        this.ingest =  {
                            // 90为油脂
                            bIngest: parseInt(ingest * HEALTH_MEAL_SCALE[0]) - 90,
                            lIngest: parseInt(ingest * HEALTH_MEAL_SCALE[1]) - 90,
                            dIngest: parseInt(ingest * HEALTH_MEAL_SCALE[2]) - 90
                        }
                    })
                    return { status: r.data.data.status, cardNum: cardNum, cardDate: cardDate };
                }else {
                    // message.error(r.data.msg);
                    return {status: '', cardNum: 0, cardDate: null};
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
    async addStatus(params) {
        const r = await axios.post(urls.API_USER_HEALTH_STATUS, params);
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