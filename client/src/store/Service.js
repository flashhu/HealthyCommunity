import { observable, action, runInAction } from 'mobx'
import { message } from 'antd'
import axios from 'axios'
import * as urls from '../constant/urls'
class Service {
    @observable
    goodsList = { main: [], mmne: [], vegetables: [] }
    @observable
    orderList = undefined
    @observable
    shopCartList = []
    @observable
    count = 0

    @action
    incrCount() {
        this.count++;
    }

    @action
    setShopCartList(shopCartList) {
        var list = this.shopCartList;
        if(list.length>0){
            var end = list[list.length - 1];
            if (shopCartList.name === end.name) {
                // console.log('this is end:',end);
                list.pop();
            }
        }
        list.push(shopCartList);

    }

    @action
    async getGoods() {
        const r = await axios.get(urls.API_USER_GOODS);
        if (r && r.status === 200) {
            if (r.data.code) {
                let data = r.data.data;
                // console.log('this is data: ', data);
                runInAction(() => {
                    this.goodsList = data;
                })
                return data;
            } else {
                message.error(r.data.msg)
            }
        } else {
            message.error('网络错误', 0.7);
        }
    }

}

export default new Service()