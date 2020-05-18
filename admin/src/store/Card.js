import { observable } from 'mobx'

class Card{
    @observable
    cardList = undefined
    
}

export default new Card()