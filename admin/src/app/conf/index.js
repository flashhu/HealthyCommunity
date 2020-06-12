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
        modal1Visible: false,
        modal2Visible: false,
        step: 1,

    };

    clickCount = 0;
    formRef = React.createRef();

    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }
    @computed
    get captcha() {
        return this.props.userStore.captcha;
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    hideModal = () => {
        this.setState({
            visible: false,
        });
    };
    show1Modal = () => {
        this.setState({
            modal1Visible: true,
        });
    };

    hide1Modal = () => {
        this.setState({
            modal1Visible: false,
        });
    };
    hide2Modal = () => {
        this.setState({
            modal2Visible: false,
        });
    };
    show2Modal = () => {
        this.setState({
            modal2Visible: true,
        });
    };

    handleOK = () => {
        this.clickCount++;
        console.log('this is parent',this.clickCount)

        if (this.clickCount === 2) {
            this.setState({
                modal2Visible: false,
            })
            this.clickCount = 0;
        }
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
                        <div className="change" onClick={this.show1Modal}>更改</div>
                        <Modal
                            title="身份验证"
                            visible={this.state.modal1Visible}
                            onOk={this.hide1Modal}
                            onCancel={this.hide1Modal}
                            okText="确认"
                            cancelText="取消"
                        >
                            <p>为了你的帐户安全，请验证身份。验证成功后进行下一步操作。</p>
                            <p>我们将向您的使用手机{this.currUser && (this.currUser.phone.substr(0, 3) + '****' + this.currUser.phone.substr(7, 4))}发送短信</p>
                            <VerifyPhone clickCount={this.clickCount}/>
                        </Modal>
                    </div>
                </div>
                <div className="m-item m-line">
                    <div>
                        <h3>账号密码</h3>
                        <p>已设置，可通过帐户密码登录</p>
                    </div>
                    <div className="right z-change">
                        <div className="change" onClick={this.show2Modal}>更改</div>
                        <Modal
                            title="身份验证"
                            visible={this.state.modal2Visible}
                            onOk={this.hide2Modal}
                            onCancel={this.hide2Modal}
                            okText="确认"
                            cancelText="取消"
                        >
                            <p>为了你的帐户安全，请验证身份。验证成功后进行下一步操作。</p>
                            <p>我们将向您的使用手机{this.currUser && (this.currUser.phone.substr(0, 3) + '****' + this.currUser.phone.substr(7, 4))}发送短信</p>
                            <VerifyPhone clickCount={this.clickCount}/>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

export default Conf