import { observable } from 'mobx'

class Notice {
    @observable
    noticeList = undefined
}

export default new Notice()