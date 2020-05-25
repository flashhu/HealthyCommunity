import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Modal, Form, InputNumber, Radio, message } from 'antd'
import { getIngest, habitScoreCal } from '../../util/healthcal'

@inject('userStore', 'healthStore')
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
        this.formRef.current.validateFields()
            .then(values => {
                this.setState({
                    confirmLoading: true,
                });
                values['dailyIngest'] = parseInt(getIngest(values));
                values['habitScore'] = habitScoreCal(values);
                values['uphone'] = this.currUser.phone;
                // console.log(values);

                this.props.healthStore.startHealthPlan(values)
                    .then(r => {
                        if (r.code === 1) {
                            message.success(r.msg);
                        } else {
                            message.error(r.msg);
                        }
                    })
                setTimeout(() => {
                    this.setState({
                        visible: false,
                        confirmLoading: false
                    });
                    this.props.onDialogConfirm();
                }, 500);   
            }).catch(errorInfo => {
                message.error('表单数据有误，请根据提示填写！');
            })
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { visible, confirmLoading } = this.state;
        const layout = {labelCol: {span: 6},wrapperCol: {span: 16}};

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
                    <Form {...layout} ref={this.formRef}>
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
                        <Form.Item label="年龄" required>
                            <Form.Item
                                name="age"
                                rules={[{ required: true, message: '请输入体温！' }]}
                                noStyle
                            >
                                <InputNumber min={0} max={160} />
                            </Form.Item>
                            <span className="ant-form-text">岁</span>
                        </Form.Item>
                        <Form.Item label="身高" required>
                            <Form.Item
                                name="height"
                                rules={[{ required: true, message: '请输入身高！' }]}
                                noStyle
                            >
                                <InputNumber min={50} max={250} />
                            </Form.Item>
                            <span className="ant-form-text">厘米</span>
                        </Form.Item>
                        <Form.Item label="体重" required>
                            <Form.Item
                                name="weight"
                                rules={[{ required: true, message: '请输入体重！' }]}
                                noStyle
                            >
                                <InputNumber min={0} max={160} />
                            </Form.Item>
                            <span className="ant-form-text">公斤</span>
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