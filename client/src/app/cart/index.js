import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import { computed, toJS } from 'mobx'
import { Table, InputNumber, Button, Popconfirm, message, Affix, Modal } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import './index.less'


// const EditableContext = React.createContext();

// const EditableRow = ({ index, ...props }) => {
//     const [form] = Form.useForm();
//     return (
//         <Form form={form} component={false}>
//             <EditableContext.Provider value={form}>
//                 <tr {...props} />
//             </EditableContext.Provider>
//         </Form>
//     );
// };

// const EditableCell = ({
//     title,
//     editable,
//     children,
//     dataIndex,
//     record,
//     handleSave,
//     ...restProps
// }) => {
//     let childNode = children;
//     return <td {...restProps}>{childNode}</td>;
// };

@inject('serviceStore', 'userStore')
@observer
class Cart extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '商品图片',
                dataIndex: 'url',
                // width: '15%',
                width:'100px',
                render: (record) => <img src={record} alt='' />
            },
            {
                title: '名称',
                dataIndex: 'name',
                responsive: ['sm'],

            },
            {
                title: '单价 (￥)',
                dataIndex: 'price',
                responsive: ['md'],
            },
            {
                title: '数量',
                dataIndex: 'sale',
                responsive: ['sm'],
                // editable: 'true',
                render: (text, record) => <InputNumber style={{
                    display: 'inline-block',
                    position: 'relative',
                    top: '5px',
                }} defaultValue={text} min={1} onChange={this.handleChange.bind(null, record.key, record.sale)} />
            },
            {
                title: '金额 (￥)',
                dataIndex: 'total',
            },
            {
                title: '操作',
                dataIndex: '操作',
                responsive: ['lg'],
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="您确定要删除吗?" onConfirm={() => this.handleDelete(record.key)}>
                            <Button>删除</Button>
                        </Popconfirm>
                    ) : null,
            },
        ];
        this.state = {
            dataSource: this.shopCartList,
            count: this.count,
            selectedRowKeys: [],
            // visible: false,
            modal1Visible: false,
            modal2Visible: false,
            payment: 0,
        };
    }


    @computed
    get currUser() {
        return toJS(this.props.userStore.currUser);
    }
    @computed
    get goodsList() {
        return toJS(this.props.serviceStore.goodsList);
    }
    @computed
    get shopCartList() {
        return toJS(this.props.serviceStore.shopCartList);
    }
    @computed
    get count() {
        return this.props.serviceStore.count;
    }
    show1Modal = () => {
        this.setState({
            modal1Visible: true,
        });
    };
    show2Modal = () => {
        const dataSource = [...this.state.dataSource];
        const selectedRowKeys = [...this.state.selectedRowKeys];
        var tmp = 0;
        this.setState({
            modal2Visible: true,
        });
        for (var item of dataSource) {
            if (selectedRowKeys.includes(item.key)) {
                tmp += Number.parseFloat(item.total)
            }
        }
        this.setState({
            payment: Math.floor(Number.parseFloat(tmp) * 100) / 100,
        }, () => {
            console.log(this.state.payment);
        })
    };
    hide1Modal = () => {
        this.setState({
            modal1Visible: false,
        });
    };
    hide2Modal = () => {
        this.setState({
            modal2Visible: false,
        });
    };

    selectRow = (record) => {
        const selectedRowKeys = [...this.state.selectedRowKeys];
        if (selectedRowKeys.indexOf(record.key) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
        } else {
            selectedRowKeys.push(record.key);
        }
        this.setState({ selectedRowKeys });
    }
    onSelectedChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }

    componentDidMount = () => { }
    handleChange = (key, sale, value) => {
        const dataSource = [...this.state.dataSource];
        console.log(key, sale, value);
        if (!value || isNaN(value)) {
            dataSource.filter(item => {
                if (item.key === key) {
                    item.total = 0;
                    message.error(`请输入${key}的数量`);
                }
                return item.key;
            })
        } else {
            dataSource.filter(item => {
                if (item.key === key) {
                    item.sale = value
                    let total = (item.price * item.sale).toFixed(2);
                    item.total = total;
                    this.setState({
                        dataSource: this.state.dataSource
                    }, () => {
                        this.props.serviceStore.setShopCartList(this.state.dataSource);
                    })

                }
                return dataSource;
            })
        }
    }
    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        const selectedRowKeys = [...this.state.selectedRowKeys];
        selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
        this.setState({
            selectedRowKeys,
            dataSource: dataSource.filter(item => item.key !== key),
        }, () => {
            this.props.serviceStore.setShopCartList(this.state.dataSource);
            dataSource.filter((item) => {
                if (item.key === key) {
                    this.props.serviceStore.decrCount();
                }
                return item.key;
            });

        })
    }

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            dataSource: newData,
        });
    };

    doDeal = () => {
        var tmp = [];
        var order = [];
        const dataSource = [...this.state.dataSource];
        const selectedRowKeys = [...this.state.selectedRowKeys];
        // this.props.serviceStore.resetCount();
        for (var item of dataSource) {
            if (selectedRowKeys.includes(item.key)) {
                order.push(item)
            } else {
                tmp.push(item)
            }
        }
        for (let i = 0; i < order.length; i++) {
            this.props.serviceStore.decrCount();
        }
        this.setState({
            selectedRowKeys: [],
            dataSource: tmp,
            modal2Visible: false,
        }, () => {
            this.props.serviceStore.setOrderList(order);
            this.props.serviceStore.setShopCartList(this.state.dataSource);
            let uid = this.currUser.id;
            let payment = this.state.payment;
            let date = moment().format('YYYY-MM-DD HH:mm:ss');

            let name = [];
            let num = [];
            let price = [];
            let goodsName;
            let goodsNum;
            let goodsPrice;

            for (let i = 0; i < order.length; i++) {
                name.push(order[i].name);
                num.push(order[i].sale);
                price.push(Number.parseFloat(order[i].total).toString());
            }
            goodsName = name.join('|');
            goodsNum = num.join('|');
            goodsPrice = price.join('|');
            this.props.serviceStore.submitOrder({ uid, goodsName, goodsNum, goodsPrice, payment, date })
                .then(r => {
                    if (r && r.code === 1) {
                        message.success('结算成功！')
                    } else if (r && r.code === 0) {
                        message.error(r.msg)
                    }
                })
        })

    }

    delSelected = () => {
        var tmp = [];
        // console.log('this is keys', this.state.selectedRowKeys);
        const dataSource = [...this.state.dataSource];
        const selectedRowKeys = [...this.state.selectedRowKeys];
        for (let i = 0; i < selectedRowKeys.length; i++) {
            for (let j = 0; j < dataSource.length; j++) {
                if (selectedRowKeys[i] === dataSource[j].key) {
                    this.props.serviceStore.decrCount();
                }
            }
        }
        for (var item of dataSource) {
            if (!selectedRowKeys.includes(item.key)) {
                tmp.push(item)
            }
        }
        // console.log('this is tmp', tmp);
        for (let i = 0; i < selectedRowKeys.length; i++) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(i), 1);
            i--;
        }
        console.log(selectedRowKeys);
        this.setState({
            modal1Visible: false,

            selectedRowKeys,
            dataSource: tmp,
        }, () => {
            this.props.serviceStore.setShopCartList(this.state.dataSource);
        })
    }
    render() {
        const { dataSource, selectedRowKeys } = this.state;
        // console.log('this is cart:', this.shopCartList);
        // console.log('this is render ds', dataSource);
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectedChange,
        }
        const hasSelected = selectedRowKeys.length > 0;
        // const components = {
        //     body: {
        //         // row: EditableRow,
        //         // cell: EditableCell,
        //     },
        // };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                // onCell: record => ({
                //     record,
                //     editable: col.editable,
                //     dataIndex: col.dataIndex,
                //     title: col.title,
                //     handleSave: this.handleSave,
                // }),
            };
        });
        return (

            <div className='g-cart'>
                <div className='container'>

                    <Table
                        rowSelection={rowSelection}
                        // components={components}
                        rowClassName={() => 'editable-row'}
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                    />
                </div>
                <div className='footer'>
                    <span style={{ marginLeft: 8 }}>
                        {/* {hasSelected ? `已选商品${selectedRowKeys.length}件` : ''} */}
                        {hasSelected ?
                            <div className='m-deal'>
                                <div className='m-bottom'>
                                    <Affix offsetBottom={10}>

                                        <>
                                            <Button className='del' size='large' shape='round' onClick={this.show1Modal}>删除</Button>
                                            <Modal
                                                title="删除商品"
                                                visible={this.state.modal1Visible}
                                                onOk={this.delSelected}
                                                onCancel={this.hide1Modal}
                                                okText="确认"
                                                cancelText="取消"
                                            >
                                                <p>您确定要删除所选内容吗？</p>
                                            </Modal>
                                        </>
                                        <>
                                            <Button type="primary" className='clear' size='large' shape='round' onClick={this.show2Modal}>结算</Button>
                                            <Modal
                                                title="结算"
                                                visible={this.state.modal2Visible}
                                                onOk={this.doDeal}
                                                onCancel={this.hide2Modal}
                                                okText="确认"
                                                cancelText="取消"
                                            >
                                                <p>您确定要结算吗？</p>
                                                <p>已选商品{selectedRowKeys.length}件，您需支付{this.state.payment}元</p>
                                            </Modal>
                                        </>

                                    </Affix>
                                </div>
                            </div>
                            : <></>}
                    </span>
                </div>
            </div>
        );
    }
}

export default Cart