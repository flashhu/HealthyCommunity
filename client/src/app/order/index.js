import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Table, Badge } from 'antd';
import { } from '@ant-design/icons';
import 'antd/dist/antd.css'
import './index.less'


@inject('userStore')
@observer
class Order extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '商品',
                dataIndex: 'firstpic',
                key: 'firstpic',
                width: '150px',
                render: (record) => <img src={record} alt='' />
            },
            {
                title: '详情',
                dataIndex: 'detail',
                key: 'detail',
                ellipsis: true,

            },
            {
                title: '总价 (￥)',
                dataIndex: 'payment',
                key: 'payment',
                responsive: ['sm'],
                width: '15%',
            },
            {
                title: '交易时间',
                dataIndex: 'time',
                key: 'time',
                responsive: ['sm'],
                ellipsis: true,
            },
            {
                title: '完成情况',
                dataIndex: 'status',
                key: 'status',
                width: '15%',
                responsive: ['md'],
                render: () => (
                    <span>
                        <Badge status="success" />
                      已完成
                    </span>
                )
            }
        ]
    }

    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }

    render() {
        const outData = [
            {
                key: 0,
                firstpic: 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/bean_bun.jpg',
                payment: 6,
                detail: '豆沙包x1 南瓜粥x1',
                time: '2020-06-10 19:44:18',
                desc: [
                    {
                        key: 0,
                        goods: 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/bean_bun.jpg',
                        name: '豆沙包',
                        price: 1,
                        sale: 1,
                        total: 1,
                    },
                    {
                        key: 1,
                        goods: 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/pumpkin_prg.jpeg',
                        name: '南瓜粥',
                        price: 5,
                        sale: 1,
                        total: 1,
                    }
                ]

            }
            ,
            {
                key: 1,
                firstpic: 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/fine_dried.jpeg',
                payment: 9.49,
                detail: '挂面x1 豆沙包x1 肉包x1',
                time: '2020-06-10 21:34:41',
                desc: [
                    {
                        key: 0,
                        goods: 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/fine_dried.jpeg',
                        name: '挂面',
                        price: 6.99,
                        sale: 1,
                        total: 6.99,
                    },
                    {
                        key: 1,
                        goods: 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/bean_bun.jpg',
                        name: '豆沙包',
                        price: 1,
                        sale: 1,
                        total: 1,
                    },
                    {
                        key: 2,
                        goods: 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/meat_bun.jpg',
                        name: '肉包',
                        price: 1.5,
                        sale: 1,
                        total: 1.5,
                    }

                ]

            }
            ,
            {
                key: 2,
                firstpic: 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/whole-wheat.jpeg',
                payment: 29,
                detail: '全麦面包x3 红薯x3 豆沙包x2',
                time: '2020-06-10 21:38:00',
                desc: [
                    {
                        key: 0,
                        goods: 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/whole-wheat.jpeg',
                        name: '全麦面包',
                        price: 3,
                        sale: 3,
                        total: 9,
                    },
                    {
                        key: 1,
                        goods: 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/sweet_potato.jpeg',
                        name: '红薯',
                        price: 3,
                        sale: 6,
                        total: 18,
                    },
                    {
                        key: 2,
                        goods: 'https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/main/bean_bun.jpg',
                        name: '豆沙包',
                        price: 1,
                        sale: 2,
                        total: 2,
                    }
                ]
            }
        ];

        const expandedRowRender = (record) => {
            const columns = [
                {
                    title: '商品',
                    dataIndex: 'goods',
                    key: 'goods',
                    width: '15%',
                    render: (record) => <img src={record} className='inner' alt='' />
                },
                {
                    title: '名称',
                    dataIndex: 'name',
                    key: 'name',
                    responsive: ['sm'],
                },
                {
                    title: '单价 (￥)',
                    dataIndex: 'price',
                    responsive: ['sm'],
                },
                {
                    title: '数量',
                    dataIndex: 'sale',
                    responsive: ['sm'],
                },
                {
                    title: '金额 (￥)',
                    dataIndex: 'total',
                },
            ];

            return <Table columns={columns} dataSource={record.desc} pagination={false} />;
        }

        return (
            <div className="g-order" >
                <div className='container'>
                    <Table
                        className="components-table-demo-nested"
                        columns={this.columns}
                        expandable={{ expandedRowRender }}
                        dataSource={outData}
                        pagination={false}
                    />
                </div>
            </div>
        )
    }
}
export default Order