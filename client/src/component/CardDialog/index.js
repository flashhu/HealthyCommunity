import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Modal, Form, Input, message } from 'antd'
import { getCurrDate } from '../../util/date'
import { cardStatusCal, cardScoreCal } from '../../util/healthcal'

@inject('cardStore', 'userStore')
@observer
class CardDialog extends Component {
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
                values['blodpres_relax'] = parseInt(values.blodpres_relax);
                values['blodpres_shrink'] = parseInt(values.blodpres_shrink);
                values['heartrat'] = parseInt(values.heartrat);
                values['temp'] = parseFloat(values.temp);
                values['status'] = cardStatusCal(values);
                values['score'] = cardScoreCal(values);
                values['uid'] = parseInt(this.currUser.id);
                values['date'] = getCurrDate();
                // console.log(values);

                this.props.cardStore.addCard(values)
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
        this.setState({
            visible: false,
            confirmLoading: false,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { visible, confirmLoading } = this.state;
        const layout = { labelCol: { span: 9 }, wrapperCol: { span: 8 } };
        const validateMessages = {
            required: '请输入${label}!',
            number: {
                range: '请输入真实的${label}！',
            },
        };

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
                    <Form {...layout} ref={this.formRef} validateMessages={validateMessages}>
                        <Form.Item
                            label="体温"
                            name="temp"
                            rules={[{ required: true }]}
                        >
                            <Input addonAfter="°C" type="number" min={35} max={45} step={0.1} />
                        </Form.Item>
                        <Form.Item
                            label="心率"
                            name="heartrat"
                        >
                            <Input addonAfter="bmp" type="number" min={20} max={300} />
                        </Form.Item>
                        <Form.Item label="血压">
                            <Form.Item
                                name="blodpres_shrink"
                            >
                                <Input addonAfter="mmHg" type="number" min={10} max={141} placeholder="收缩压" />
                            </Form.Item>
                            <Form.Item
                                name="blodpres_relax"
                            >
                                <Input addonAfter="mmHg" type="number" min={10} max={91} placeholder="舒张压" />
                            </Form.Item>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default CardDialog