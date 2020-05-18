import React, { Component, useState } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import {
    Form,
    Input,
    Cascader,
    Select,
    Button,
} from 'antd'
import './index.less'

const { Option } = Select;
const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
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
    formRef = React.createRef();
    onFinish = values => {
        console.log('Received values of form: ', values);
    }
    render() {

        return (
            <div className='g-login'>
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
                                residence: ['zhejiang', 'hangzhou', 'xihu'],
                                prefix: '86',
                            }}
                            size="large"
                            scrollToFirstError
                        >

                            <Form.Item
                                name="phone"
                                label="手机号"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入您的手机号',
                                    },
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
                                name="password"
                                label="密码"
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
                                label="确认密码"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: '请确认密码',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
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
                                        真实姓名&nbsp;
                                            {/* <Tooltip title="What do you want others to call you?">
                                            <QuestionCircleOutlined />
                                        </Tooltip> */}
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
                                label="住址"
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

                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" block>
                                    注册
                                </Button>
                                <div className="toLogin">
                                    已有账号？
                                    <a href="../login">立即登录</a>
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

