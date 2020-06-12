import { observable, action, runInAction } from 'mobx'
import { message } from 'antd'
import axios from 'axios'
import { API_NOTICE_DATA, API_NOTICE_SEARCH, API_DELETE_NOTICE} from '../constant/urls'

class Notice {
    @observable
    noticeList = []

    @action
    async getNoticeData() {
        const r = await axios.get(API_NOTICE_DATA);
        if (r && r.status === 200) {
            if (r.data.code) {
                runInAction(() => {
                    this.noticeList = r.data.rows;
                })
            }
        } else {
            message.error('网络错误', 0.7);
        }
    }

    @action
    async search(params) {
        const r = await axios.post(API_NOTICE_SEARCH, params);
        if (r && r.status === 200) {
            if (r.data.code) {
                console.log(r.data);
                runInAction(() => {
                    this.noticeList = r.data.rows;
                })
            }
        } else {
            message.error('网络错误', 0.7);
        }
    } 

    @action
    async delNotice(id) {
        const r = await axios.get(API_DELETE_NOTICE + id);
        if (r && r.status === 200) {
            if (r.data.code) {
                message.success(r.data.msg);
                this.getNoticeData();
            }
        } else {
            message.error('网络错误', 0.7);
        }
    }
}

export default new Notice()