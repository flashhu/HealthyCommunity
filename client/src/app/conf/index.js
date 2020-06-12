import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Modal, message } from 'antd'
import VerifyPhone from '../../component/VerifyPhone'
import './index.less'

@inject('userStore')
@observer
class Conf extends Component {
    state = {
        loading: false,
        time: 59,
        visible: false,
        isVerified: false,
        clickCount: 0,
        modifyType: null
    };

    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }
    @computed
    get captcha() {
        return this.props.userStore.captcha;
    }

    modifyPhone = () => {
        this.setState({
            visible: true,
            modifyType: 'phone'
        });
    }

    modifyPasswd = () => {
        this.setState({
            visible: true,
            modifyType: 'passwd'
        });
    }

    handleOK = () => {
        let num = this.state.clickCount + 1;
        this.setState({
            clickCount: num
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false,
            clickCount: 0,
            isVerified: false
        })
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }

    doValAuth = () => {
        this.props.userStore.valAuth({ phone: this.currUser.phone })
            .then(r => {
                if (r && r.code === 1) {
                    this.setState({ loading: true });
                    console.log('this is valauth captcha:', r.captcha)
                    if (this.state.time !== 0) {
                        this.count();
                    }
                    message.success(r.msg)
                } else {
                    message.error('发送失败！');
                }
            })
    }
    count = () => {
        let setCount = setInterval(() => {
            this.setState({ time: (this.state.time - 1) }, () => {
                if (this.state.time <= 0) {
                    clearInterval(setCount);
                    this.setState({ loading: false, time: 59 })
                }
            });
        }, 1000)
    }


    render() {

        return (
            <div className="g-conf">
                <div className="z-title bold">账户管理</div>
                <div className="m-item m-line">
                    <div>
                        <h3>手机号码</h3>
                        <p>{this.currUser && (this.currUser.phone.substr(0, 3) + '****' + this.currUser.phone.substr(7, 4))}</p>
                    </div>
                    <div className="right z-change" >
                        <div className="change" onClick={this.modifyPhone}>更改</div>
                    </div>
                </div>
                <div className="m-item m-line">
                    <div>
                        <h3>账号密码</h3>
                        <p>已设置，可通过帐户密码登录</p>
                    </div>
                    <div className="right z-change">
                        <div className="change" onClick={this.modifyPasswd}>更改</div>
                    </div>
                </div>

                <Modal
                    title="修改信息"
                    visible={this.state.visible}
                    onOk={this.handleOK}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    {   
                        (!this.state.isVerified || this.state.modifyType === 'phone' ) && 
                        <VerifyPhone 
                            clickCount={this.state.clickCount}
                            isVerified={this.state.isVerified}
                            afterVerified={() => this.setState({isVerified: true})}
                        />
                    }
                    {
                        this.state.modifyType === 'passwd' && this.state.isVerified &&
                        <p>change passwd</p>
                    }
                </Modal>
            </div>
        )
    }
}

export default Conf