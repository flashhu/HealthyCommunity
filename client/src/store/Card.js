import { observable, action } from 'mobx'
import { message } from 'antd'
import axios from 'axios'
import * as urls from '../constant/urls'

class Card{
    @observable
    cardList = undefined
    
    @action
    async addCard(params) {
        const r = await axios.post(urls.API_USER_NEW_CARD, params);
        if (r && r.status === 200) {
            return r.data;
        } else {
            message.error('网络错误', 0.7);
        }
    }
}

export default new Card()