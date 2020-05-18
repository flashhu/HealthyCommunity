import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Redirect } from 'react-router-dom'

@inject('userStore')
@observer
class Login extends Component {
    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }

    render() {
        return (
            <div className="g-login">
                {this.currUser && <Redirect to='/' />}
                <div>login page</div>
                <div>{this.currUser.name}</div>
            </div>
        )
    }
}

export default Login