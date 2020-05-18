import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'

@inject('userStore')
@observer
class Register extends Component{

    render() {
        return (
            <div className="g-register">
                {this.currUser && <Redirect to='/' />}
                <div>admin register page</div>
            </div>
        )
    }
}

export default Register

