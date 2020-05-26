import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Modal, Form, InputNumber, message } from 'antd'
import { getCurrDate } from '../../util/date'
import { cardStatusCal, cardScoreCal } from '../../util/healthcal'

@inject('healthStore', 'userStore')
@observer
class CardDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false
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

        if (this.props.card) {
            // setTimeout(() => {
            //     this.formRef.current.setFieldsValue({
            //         temp: this.props.card.temp,
            //         heartrat: this.props.card.heartrat,
            //         blodpres_shrink: this.props.card.blodpres_shrink,
            //         blodpres_relax: this.props.card.blodpres_relax
            //     })
            // }, 100);
        }
    }

    handleOk = () => {
        this.formRef.current.validateFields()
            .then(values => {
                this.setState({
                    confirmLoading: true,
                });
                values['status'] = cardStatusCal(values);
                values['score'] = cardScoreCal(values);
                values['uphone'] = this.currUser.phone;
                values['date'] = getCurrDate();

                this.props.healthStore.addCard(values)
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
                
            }).catch(err => {
                console.log(err);
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
        const layout = { labelCol: { span: 9 }, wrapperCol: { span: 8 } };

        return (
            <div>
                <Modal
                    title="每日打卡"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    afterClose={this.props.afterClose}
                >
                    <Form {...layout} ref={this.formRef}>
                        <Form.Item label="体温" required>
                            <Form.Item 
                                name="temp"
                                rules={[{ required: true,  message: '请输入体温！' }]}
                                noStyle
                            >
                                <InputNumber min={35} max={45} step={0.1} />
                            </Form.Item>
                            <span className="ant-form-text">°C</span>
                        </Form.Item>
                        <Form.Item label="心率">
                            <Form.Item
                                name="heartrat"
                                noStyle
                            >
                                <InputNumber min={20} max={300} />
                            </Form.Item>
                            <span className="ant-form-text">bmp</span>
                        </Form.Item>
                        <Form.Item label="收缩压">
                            <Form.Item
                                name="blodpres_shrink"
                                noStyle
                            >
                                <InputNumber min={10} max={141} />
                            </Form.Item>
                            <span className="ant-form-text">mmHg</span>
                        </Form.Item>
                        <Form.Item label="舒张压">
                            <Form.Item
                                name="blodpres_relax"
                                noStyle
                            >
                                <InputNumber min={10} max={91} />
                            </Form.Item>
                            <span className="ant-form-text">mmHg</span>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default CardDialog