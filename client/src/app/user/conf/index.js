import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'

@inject('userStore')
@observer
class Conf extends Component {
    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }

    render() {
        return (
            <div className="g-conf">
                <div>user conf page</div>
                <div>{this.currUser.name}</div>
            </div>
        )
    }
}

export default Conf