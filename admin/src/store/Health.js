import { observable, action, runInAction } from 'mobx'
import { message } from 'antd'
import axios from 'axios'
import { API_HEALTH_DATA_LIST, API_HEALTH_SEARCH, API_HEALTH_CHART_DATA } from '../constant/urls'
import { cardStatusCountCal } from '../util/healthCal'
import { getCurrDate } from '../util/date'

class Health{
    @observable
    dataList = []
    @observable
    completionData = []
    @observable
    tempNormalData = []

    @action
    async getData(params) {
        const r = await axios.post(API_HEALTH_DATA_LIST, params);
        if (r && r.status === 200) {
            if(r.data.code){
                runInAction(()=>{
                    this.dataList = r.data.rows;
                })
            }
        } else {
            message.error('网络错误', 0.7);
        }
    }

    @action
    async getChartData() {
        const r = await axios.get(API_HEALTH_CHART_DATA);
        if (r && r.status === 200) {
            if (r.data.code) {
                let data = r.data.data;
                let completionData = cardStatusCountCal(data.completion, getCurrDate());
                runInAction(() => {
                    this.completionData = [
                        { type: "未打卡", value: completionData.unfinish },
                        { type: "已打卡", value: completionData.finish }
                    ];
                    this.tempNormalData = [
                        { type: "体温正常", value: data.tempNormal[1].num },
                        { type: "体温异常", value: data.tempNormal[0].num }
                    ]
                })
            }
        } else {
            message.error('网络错误', 0.7);
        }
    }

    @action
    async search(params) {
        const r = await axios.post(API_HEALTH_SEARCH, params);
        if (r && r.status === 200) {
            if (r.data.code) {
                runInAction(() => {
                    this.dataList = r.data.rows;
                })
            }
        } else {
            message.error('网络错误', 0.7);
        }
    }
}

export default new Health()