import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'

@inject('cardStore', 'userStore')
@observer
class Health extends Component{
    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }

    @computed
    get cardList() {
        return this.props.cardStore.cardList;
    }

    render() {
        return (
            <div className="g-health">
                <div>admin health page</div>
                <div>{this.currUser.name}</div>
                <div>{this.cardList}</div>
            </div>
        )
    }
}

export default Health