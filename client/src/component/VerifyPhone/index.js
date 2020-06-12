import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Form, Button, Input, Row, Col, message } from 'antd'
import { isValidPhoneNumber } from 'react-phone-number-input'

let isVal;

@inject('userStore')
@observer
class VerifyPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            time: 59,
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
        if (this.props.clickCount !== 0 && this.props.clickCount !== prevProps.clickCount){
            console.log(this.refs.captcha.state.value); //验证码输入框的值
            // 原先手机号校验
            if(!this.props.isVerified){
                //调用后端验证....

                //验证成功
                this.props.afterVerified();
            }else { //新手机号校验

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
                                        isVal = false;
                                        var phone = '+86' + getFieldValue('phone');
                                        if (!value || (isValidPhoneNumber(phone) && getFieldValue('phone').length === 11)) {
                                            if (value) isVal = true;
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
                                <Button loading={this.state.loading} htmlType="button" onClick={this.doValAuth}>{this.state.loading ? this.state.time + '秒' : '获得验证码'}</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default VerifyPhone;