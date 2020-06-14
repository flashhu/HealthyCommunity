import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Form, Button, Input, Row, Col, message } from 'antd'
import { isValidPhoneNumber } from 'react-phone-number-input'

@inject('userStore')
@observer
class VerifyPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            time: 59,
            inputValue: '',
            phone: '',
            isable: false,
            step: 0,
        }
    }
    formRef = React.createRef();
    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }
    @computed
    get captcha() {
        return this.props.userStore.captcha;
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    componentDidUpdate(prevProps) {
        // console.log(this.props.clickCount, prevProps.clickCount)；
        //一次以上点击确认 且 有点击操作
        if (this.props.clickCount !== 0 && this.props.clickCount !== prevProps.clickCount) {
            // console.log(this.refs.captcha.state.value); //验证码输入框的值
            // 原先手机号校验
            if (this.props.modifyType === 'phone') {
                if (!this.props.isVerified) {
                    //调用后端验证....
                    let isMatch = this.captcha === this.refs.captcha.state.value;
                    this.props.userStore.valCaptcha({ isMatch }).then(r => {
                        if (r && r.code === 1) {

                            this.setState({
                                loading: false,
                                time: 59,
                                phone: '',

                            })
                            this.props.afterVerified();
                            this.formRef.current.resetFields();
                            // this.refs.captcha.state.value = '';
                        } else {
                            message.error(r.msg)
                        }
                    })
                    //验证成功

                } else { //新手机号校验
                    if (this.state.phone) {
                        let isMatch = this.captcha === this.refs.captcha.state.value;
                        // console.log(isMatch);
                        this.props.userStore.updatePhone({ isMatch: isMatch, oldphone: this.currUser.phone, newphone: this.state.phone }).then(r => {
                            if (r && r.code === 1 && r.phone && this.state.phone) {
                                message.success(r.msg);
                                this.setState({
                                    loading: false,
                                    time: 59,
                                    phone: '',
                                })

                                this.props.afterVerified();
                                this.formRef.current.resetFields();
                                this.setClose();
                            } else if (!r.phone) {
                                message.error('请填写必要内容！');
                            } else {
                                message.error(r.msg)
                            }
                        })
                    } else {
                        message.error('请填写必要内容！');
                    }
                }
            } else if (this.props.modifyType === 'passwd') {
                let isMatch = this.captcha === this.refs.captcha.state.value;
                // console.log('pwd',isMatch);
                this.props.userStore.valCaptcha({ isMatch }).then(r => {
                    if (r && r.code === 1) {

                        this.setState({
                            loading: false,
                            time: 59,
                            phone: '',

                        })
                        this.props.afterVerified();

                    } else {
                        message.error(r.msg)
                    }
                })
            }

        }
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
    setClose = () => {
        this.props.close()
    }
    doValAuth = () => {
        if (this.props.modifyType === 'phone') {
            this.setState({
                step: this.state.step + 1,
            })
            if (!this.props.isVerified) {
                this.props.userStore.valAuth({ phone: this.currUser.phone })
                    .then(r => {
                        if (r && r.code === 1) {
                            this.setState({ loading: true, time: 59 });
                            console.log('this is valauth captcha:', r.captcha)
                            if (this.state.time !== 0) {
                                this.count();
                            }
                            // if (this.state.step === 1) {
                            //     message.success(r.msg)
                            // }

                        } else {
                            message.error('发送失败！');
                        }
                    })
            } else {
                this.props.userStore.valPhone({ phone: this.state.phone }).then(r => {
                    if (r && r.code === 1) {
                        this.setState({ loading: true, time: 59, });
                        console.log('this is 2nd captcha: ' + r.captcha)
                        // if (this.state.time !== 0) {
                        //     this.count();
                        // }
                        // message.success(r.msg)
                    } else if (r && r.code === 0) {
                        message.error(r.msg)
                    }
                })
            }
        } else if (this.props.modifyType === 'passwd') {
            if (!this.props.isVerified) {
                this.props.userStore.valAuth({ phone: this.currUser.phone })
                    .then(r => {
                        if (r && r.code === 1) {
                            this.setState({ loading: true, time: 59 });
                            console.log('this is valauth captcha:', r.captcha)

                            if (this.state.time !== 0 && this.state.step === 0) {
                                this.count();
                            }
                        } else {
                            message.error('发送失败！');
                        }
                    })
            }
        }
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

    inputChange = (e) => {
        this.setState({
            phone: e.target.value,
        })
    }
    render() {
        return (
            <div>
                {
                    !this.props.isVerified &&
                    <div>
                        <p>为了你的帐户安全，请验证身份。验证成功后进行下一步操作。</p>
                        <p>我们将向您的使用手机{this.currUser && (this.currUser.phone.substr(0, 3) + '****' + this.currUser.phone.substr(7, 4))}发送短信</p>
                    </div>
                }
                <Form ref={this.formRef}>
                    {
                        this.props.isVerified &&
                        <Form.Item
                            name="phone"
                            label="手机号 "

                            onChange={this.inputChange}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的手机号',
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        var phone = '+86' + getFieldValue('phone');
                                        if (!value || (isValidPhoneNumber(phone) && getFieldValue('phone').length === 11)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('手机号非法');
                                    },
                                }),
                            ]}
                        >
                            <Input
                                addonBefore="+86"
                                style={{
                                    width: '100%',
                                }}

                            />
                        </Form.Item>
                    }
                    <Form.Item label="验证码">
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    name="captcha"
                                    noStyle

                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入验证码',
                                        },
                                    ]}
                                >
                                    <Input ref="captcha" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Button loading={this.state.loading} htmlType="button" onClick={this.doValAuth} disabled={!this.state.phone && this.props.isVerified}>{this.state.loading ? this.state.time + '秒' : '获得验证码'}</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default VerifyPhone;