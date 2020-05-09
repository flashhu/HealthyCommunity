import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'

@inject('noticeStore', 'userStore')
@observer
class Notice extends Component{
    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }

    @computed
    get noticeList() {
        return this.props.noticeStore.noticeList;
    }

    render() {
        return (
            <div className="g-notice">
                <div>admin notice page</div>
                <div>{this.currUser.name}</div>
                <div>{this.noticeList}</div>
            </div>
        )
    }
}

export default Notice