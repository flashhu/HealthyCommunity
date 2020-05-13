import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Modal, Form, Input, Radio, message } from 'antd'
import { getIngest } from '../../util/healthcal'

@inject('userStore', 'cardStore')
@observer
class HabitDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
        }
    }

    //获得form实例
    formRef = React.createRef();

    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }

    componentDidUpdate(prevProps) {
        if (this.state.visible === prevProps.visible && prevProps.visible !== this.props.visible) {
            this.setState({
                visible: this.props.visible
            })
        }
    }

    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        this.formRef.current.validateFields()
            .then(values => {
                values['age'] = parseInt(values.age);
                values['height'] = parseInt(values.height);
                values['weight'] = parseFloat(values.weight);
                values['dailyIngest'] = parseInt(getIngest(values));
                values['phone'] = this.currUser.phone;
                // console.log(values);

                this.props.userStore.startHealthPlan(values)
                    .then(r => {
                        if (r.code === 1) {
                            message.success(r.msg);
                        } else {
                            message.error(r.msg);
                        }
                    })
                    
            }).catch(errorInfo => {
                message.error(errorInfo);
            })
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 1000);
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { visible, confirmLoading } = this.state;
        const layout = {labelCol: {span: 6},wrapperCol: {span: 16}};
        const validateMessages = {
            required: '请输入${label}!',
            number: {
                range: '请输入真实的${label}！',
            },
        };

        return (
            <div>
                <Modal
                    title="习惯养成计划"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    afterClose={this.props.afterClose}
                >
                    <Form {...layout} ref={this.formRef} validateMessages={validateMessages}>
                        <Form.Item 
                            label="性别" 
                            name="sex"
                            rules={[{required: true}]}
                        >
                            <Radio.Group>
                                <Radio.Button value={1}>男</Radio.Button>
                                <Radio.Button value={0}>女</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="年龄"
                            name="age"
                            rules={[{required: true}]}
                        >
                            <Input addonAfter="岁" />
                        </Form.Item>
                        <Form.Item
                            label="身高"
                            name="height"
                            rules={[{required: true}]}
                        >
                            <Input addonAfter="厘米" />
                        </Form.Item>
                        <Form.Item
                            label="体重"
                            name="weight"
                            rules={[{required: true}]}
                        >
                            <Input addonAfter="公斤" />
                        </Form.Item>
                        <Form.Item
                            label="活动类型"
                            name="level"
                            rules={[{required: true}]}
                        >
                            <Radio.Group>
                                <Radio.Button value={0.2}>久坐不动</Radio.Button>
                                <Radio.Button value={0.55}>经常走动</Radio.Button>
                                <Radio.Button value={0.8}>体力劳动</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="目标"
                            name="target"
                            rules={[{ required: true }]}
                        >
                            <Radio.Group>
                                <Radio.Button value={1}>增肌</Radio.Button>
                                <Radio.Button value={0}>减肥</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default HabitDialog