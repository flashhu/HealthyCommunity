import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {computed } from 'mobx'

@inject('userStore')
@observer
class Register extends Component{

    render() {
        return (
            <div className="g-register">
                <div>admin register page</div>
            </div>
        )
    }
}

export default Register

