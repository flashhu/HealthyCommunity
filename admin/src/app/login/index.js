import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Form, Input, Checkbox, Button, message, Tag } from 'antd'
import { PhoneOutlined, LockOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import logo from '../../asset/image/favicon.png'
import './index.less'
import token from '../../util/token.js'
@inject('userStore')
@observer
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
        }

        let user = token.getUser()
        if (user && user.type > 0) {
            this.props.userStore.login(user)
                .then(r => {
                    if (r && r.code === 1) {
                        message.success(r.msg)
                    } else if (r && r.code === 0) {
                        message.error(r.msg)
                    }
                })
        }
    }

    formRef = React.createRef()

    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }
    doLogin = () => {
        this.formRef.current.validateFields().then(values => {
            this.props.userStore.login({ phone: values.phone, passwd: values.passwd, remember: values.remember, identity: 1 })
                .then(r => {
                    if (r && r.code === 1) {
                        message.success(r.msg)
                    } else if (r && r.code === 0) {
                        message.error(r.msg)
                    }
                })
        });
    }
    // onFinish = values => {
    //     console.log('Received values of form: ', values);
    // };
    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {

        return (

            <div className='g-login'>
                {this.currUser && <Redirect to='/' />}
                <div className='m-login'>
                    <Tag color="blue" className='identity' style={{float: 'right', marginRight: -1}}>管理端</Tag>
                    <div className='m-logo'>
                        <img src={logo} alt='' />
                    </div>
                    <div className='m-title'>智慧社区</div>
                    <div className='m-intro'>您身边的健康专家</div>
                    <div className='m-input'>
                        <Form
                            onFinish={this.onFinish}
                            name="normal_login"
                            ref={this.formRef}
                            className="login-form"
                            initialValues={{
                                remember: true,
                                'type': 0,
                            }}
                            size="large"
                        >
                            <Form.Item
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入正确的手机号',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<PhoneOutlined className="site-form-item-icon" />}
                                    placeholder="请输入手机号"
                                    className="input" />
                            </Form.Item>
                            <Form.Item
                                name="passwd"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入正确的密码',
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="请输入密码"
                                    className="input"
                                />
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked" className="remember-me" noStyle>
                                <Checkbox >记住我</Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.doLogin} block>
                                    登录
                                </Button>
                                

                            </Form.Item>
                            
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login