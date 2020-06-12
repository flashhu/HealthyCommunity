import { observable, action, runInAction } from 'mobx'
import { message } from 'antd'
import axios from 'axios'
import * as urls from '../constant/urls'
class Service {
    @observable
    goodsList = { main: [], mmne: [], vegetables: [] }
    @observable
    orderList = []
    @observable
    shopCartList = []
    @observable
    count = 0
    @action
    setCount(count) {
        this.count = count;
    }
    @action
    incrCount() {
        this.count++;
    }
    @action
    decrCount() {
        this.count--;
    }
    @action
    resetCount() {
        this.count = 0;
    }
    @action
    addToShopCartList(item) {
        var list = this.shopCartList;
        list.push(item);
        if (list.length > 0) {
            // console.log(item.name)
            list.filter((i) => {
                if (i.name === item.name) {
                    if (i.sale > item.sale) {
                        i.sale += item.sale;
                        i.total = i.sale * i.price;
                    } else {
                        i.sale = item.sale
                        i.total = i.sale * i.price;
                    }
                }
                return list;
            })

            for (var i = 0; i < list.length - 1; i++) {
                for (var j = i + 1; j < list.length; j++) {
                    if (list[i].name === list[j].name) {
                        list.splice(j, 1);
                    }
                }
            }
        }
        //this.shopCartList=list;
    }

    @action
    setShopCartList(shopCartList) {
        this.shopCartList = shopCartList;
    }
    @action
    setOrderList(orderList) {
        this.orderList = orderList
    }
    @action
    async submitOrder(params) {
        const r = await axios.post(urls.API_USER_SUBMIT_ORDER, params);
        if (r && r.status === 200) {
            return r.data;
        } else {
            message.error('网络错误', 0.7);
        }
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