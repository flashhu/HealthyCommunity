import { observable } from 'mobx'

class Service {
    @observable
    goodsList = undefined
    @observable
    orderList = undefined
    @observable
    shopCartList = undefined
    
}

export default new Service()