import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'

@inject('noticeStore', 'userStore')
@observer
class Edit extends Component {
    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }

    render() {
        return (
            <div className="g-health">
                <div className="m-table interval">
                    <div className="m-line interval">
                </div>
            </div>
        )
    }
}


export default Edit