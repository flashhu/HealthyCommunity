import { observable } from 'mobx'

class User {
    @observable
    currUser = {id:1, name:'张三', phone:'13376546789', address:'1幢201室', passwd:'123456', type: 0}
}

export default new User()