import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { isValidPhoneNumber } from 'react-phone-number-input'
import {
    Form,
    Input,
    Cascader,
    Button,
    message,
    Row,
    Col,
} from 'antd'
import './index.less'

var isVal;
const residences = [
    {
        value: '1单元',
        label: '1单元',
        children: [
            {
                value: '1幢',
                label: '1幢',
                children: [
                    {
                        value: '101室',
                        label: '101室',
                    },
                    {
                        value: '201室',
                        label: '201室',
                    },
                ],
            },
        ],
    },
    {
        value: '2单元',
        label: '2单元',
        children: [
            {
                value: '1幢',
                label: '1幢',
                children: [
                    {
                        value: '101室',
                        label: '101室',
                    },
                ],
            }, {
                value: '2幢',
                label: '2幢',
                children: [
                    {
                        value: '101室',
                        label: '101室',
                    }
                ]
            }
        ],
    },
];
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
        md: {
            span: 4,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
        md: {
            span: 16,
            offset: 0,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
        md: {
            span: 16,
            offset: 4,
        },
    },
};

@inject('userStore')
@observer
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            succ: false,
            loading: false,
            time: 59,
            phone: '',
            isable:false,
        }
    }

    formRef = React.createRef();
    @computed
    get captcha() {
        return this.props.userStore.captcha;
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
    onFinish = values => {
        // console.log('Received values of form: ', values);
    }
    doRegist = () => {
        this.formRef.current.validateFields().then((values) => {
            let address = values.address.join('')
            values.address = address
            var match = (values.captcha===this.captcha)
            console.log('this is input: ' + values.captcha + ' this is send: ' + this.captcha+'this is match: '+match);
            this.props.userStore.register({ name: values.name, phone: values.phone, address: values.address, passwd: values.passwd, type: 0 ,match:match})
                .then(r => {
                    if (r && r.code === 1) {
                        message.success(r.msg)
                        this.setState({
                            succ: true
                        })
                    } else if (r && r.code === 0) {
                        message.error(r.msg)
                    }
                })
        });
    }
    inputChange = (e) => {
        this.setState({
            phone: e.target.value,
        })
    }
    doValidateNum = (e) => {
        this.setState({isable:true})
        this.props.userStore.valPhone({ phone: this.state.phone })
            .then(r => {
                if (r && r.code === 1) {
                    this.setState({ loading: true });
                    console.log('this is captcha: '+r.captcha)
                    if (!this.state.time == 0) {
                        this.count();
                    }
                    message.success(r.msg)
                } else if (r && r.code === 0) {
                    message.error(r.msg)
                }
            })
    }
    doReturn = ()=>{
        this.props.userStore.logout();
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }
    render() {

        return (
            <div className='g-login'>
                {this.state.succ && <Redirect to='/' />}
                <div className='m-regist'>
                    <div className='m-intro'>创建您的账号</div>
                    <div className='m-title'>加入智慧社区</div>
                    <div className='m-content'>
                        <Form
                            {...formItemLayout}
                            ref={this.formRef}
                            name="register"
                            onFinish={this.onFinish}
                            initialValues={{
                                residence: ['1单元', '1幢', '101室'],
                                prefix: '86',
                            }}
                            size="large"
                            scrollToFirstError
                        >

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
                                            if (!value || (isValidPhoneNumber(phone) && getFieldValue('phone').length == 11)) {
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

                            <Form.Item
                                name="passwd"
                                label="密码 "
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入您的密码',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                label="确认密码 "
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: '请确认密码',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('passwd') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('两次输入不一致');
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="name"
                                label={
                                    <span>
                                        {/* 真实姓名&nbsp; */}
                                        真实姓名
                                    </span>
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入您的真实姓名',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="address"
                                label="住址 "
                                rules={[
                                    {
                                        type: 'array',
                                        required: true,
                                        message: '请选择您的住址',
                                    },
                                ]}
                            >
                                <Cascader options={residences} />
                            </Form.Item>
                            <Form.Item label="验证码" extra="我们将向您的手机发送验证码">
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
                                            <Input disabled={!this.state.isable}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Button loading={this.state.loading} htmlType="button" onClick={this.doValidateNum} disabled={!isVal}>{this.state.loading ? this.state.time + '秒' : '获得验证码'}</Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" onClick={this.doRegist} block>
                                    注册
                                </Button>
                                <div className="toLogin">
                                    已有账号？
                                    <a href="/" onClick={this.doReturn}>立即登录</a>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}



export default Register

