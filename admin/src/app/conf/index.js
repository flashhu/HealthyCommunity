import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import './index.less'

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
                <div className="z-title bold">账户管理</div>
                <div className="m-item m-line">
                    <div>
                        <h3>手机号码</h3>
                        <p>{this.currUser.phone.substr(0, 3) + '****' + this.currUser.phone.substr(7, 4)}</p>
                    </div>
                    <div className="right z-change">更改</div>
                </div>
                <div className="m-item m-line">
                    <div>
                        <h3>账号密码</h3>
                        <p>已设置，可通过帐户密码登录</p>
                    </div>
                    <div className="right z-change">更改</div>
                </div>
            </div>
        )
    }
}

export default Conf