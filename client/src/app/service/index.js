import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'

@inject('serviceStore', 'userStore')
@observer
class Notice extends Component {
    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }

    @computed
    get goodsList() {
        return this.props.serviceStore.goodsList;
    }

    @computed
    get orderList() {
        return this.props.serviceStore.orderList;
    }

    @computed
    get shopCartList() {
        return this.props.serviceStore.shopCartList;
    }

    render() {
        return (
            <div className="g-notice">
                <div>user service page</div>
                <div>{this.currUser.name}</div>
                <div>{this.goodsList}</div>
                <div>{this.orderList}</div>
                <div>{this.shopCartList}</div>
            </div>
        )
    }
}

export default Notice