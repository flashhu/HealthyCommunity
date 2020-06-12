import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Form, Button, Input, Row, Col, message } from 'antd'

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
    componentDidUpdate = () =>{
        if(this.props.clickCount===1){
            console.log('gg');
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
        console.log('this is child',this.props.clickCount);
        return (
            <Form ref={this.formRef}>
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
                                <Input ref="captcha"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Button loading={this.state.loading} htmlType="button" onClick={this.doValAuth}>{this.state.loading ? this.state.time + '秒' : '获得验证码'}</Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        );
    }
}

export default VerifyPhone;