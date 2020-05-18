import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'

@inject('noticeStore', 'userStore')
@observer
class Detail extends Component {
    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }

    render() {
        return (
            <div className="g-notice">
                <div>admin detail page</div>
                <div>{this.currUser.name}</div>
                <div>{this.props.match.params.id}</div>
            </div>
        )
    }
}

export default Detail