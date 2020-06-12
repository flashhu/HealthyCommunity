import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed, toJS } from 'mobx'
import { Badge, Tag, Table, Select, Button, Modal, Input, Spin, List, message } from 'antd'
import { ADMIN_MEMBER_TYPE } from '../../constant/data'
import { selectMatchItem } from '../../util/search'
import './index.less'

const { Option } = Select;

@inject('userStore')
@observer
class Organize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddBox: false,
            loading: true,
            deleteConfirm: false,
            outConfirm: false,
            operateMember: {},
            resUserList: [],
            addConfirm: false
        }
    }

    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }

    @computed
    get memberList() {
        return toJS(this.props.userStore.memberList);
    }

    @computed
    get userList() {
        return toJS(this.props.userStore.userList);
    }

    componentDidMount() {
        this.props.userStore.getMemberData()
            .then(r => {
                this.setState({
                    loading: false
                })
            });
    }

    handleDel = (record) => {
        this.setState({
            deleteConfirm: true,
            operateMember: record
        })
    }

    handleDelOk = () => {
        this.setState({
            loading: true
        })
        let params = { phone: this.state.operateMember.phone, isCurr: false }
        this.props.userStore.deleteMember(params)
            .then(r => {
                this.props.userStore.getMemberData()
                    .then(r => {
                        setTimeout(() => {
                            this.setState({
                                loading: false,
                                deleteConfirm: false,
                                operatePhone: ''
                            })
                        }, 500); //防止删除后 搜索添加时仍对应原先列表
                    });
            })
    }

    handleDelCancel = () => {
        this.setState({
            deleteConfirm: false
        })
    }

    handleOut = (record) => {
        this.setState({
            outConfirm: true,
            operateMember: record
        })
    }

    handleOutOk = () => {
        if(this.memberList.length > 1) {
            console.log(this.memberList.length);
            let params = { phone: this.state.operateMember.phone, isCurr: true }
            this.props.userStore.deleteMember(params);
            //logout
            this.props.userStore.logout();
        }else {
            message.error('当前组织仅一人，不可退出！');
            this.handleOutCancel();
        }
    }

    handleOutCancel = () => {
        this.setState({
            outConfirm: false
        })
    }

    handleChangeSelect = (value, record) => {
        this.props.userStore.updateMember({ record: record, type: value, new: false });
        this.props.userStore.getMemberData();
    }

    handleChangeText = e => {
        if (e.target.value === '') {
            this.setState({
                resUserList: []
            })
        } else {
            this.setState({
                resUserList: selectMatchItem(this.userList, e.target.value)
            })
        }

    }

    handleAdd = () => {
        this.setState({
            showAddBox: true
        })
    }

    handleAddOk = e => {
        if (this.state.addConfirm) { //点击确认窗口的确认
            this.setState({
                loading: true
            })
            this.props.userStore.updateMember({ record: this.state.operateMember, type: 1, new: true })
                .then(r => {
                    this.props.userStore.getMemberData()
                        .then(r => {
                            setTimeout(() => {
                                this.setState({
                                    loading: false,
                                    showAddBox: false,
                                    addConfirm: false,
                                    resUserList: []
                                })
                            }, 200);
                        })
                })
        }
    };

    handleAddCancel = e => {
        if (!this.state.addConfirm) {
            this.refs.searchUser.state.value = '';
        }
        this.setState({
            showAddBox: false,
            addConfirm: false,
            resUserList: []
        });
    };

    handleSelectMamber = (item) => {
        if (item.type === 0) {
            this.refs.searchUser.state.value = '';
            this.setState({
                addConfirm: true,
                operateMember: item
            })
        } else {
            message.error('该成员已在管理员组织中！')
        }
    }

    columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '权限',
            key: 'type',
            dataIndex: 'type',
            responsive: ['md'],
            render: (d, record) =>
                <span>
                    {
                        this.currUser && this.currUser.type === 2 &&
                        <Select
                            defaultValue={ADMIN_MEMBER_TYPE[d].name}
                            style={{ width: 120 }}
                            bordered={false}
                            onChange={(value) => this.handleChangeSelect(value, record)}
                        >
                            <Option value={1}>管理员</Option>
                            <Option value={2}>超级管理员</Option>
                        </Select>
                    }
                    {
                        this.currUser && this.currUser.type !== 2 &&
                        <span>{ADMIN_MEMBER_TYPE[d].name}</span>
                    }
                </span>,
        },
        {
            title: '操作',
            key: 'action',
            responsive: ['md'],
            render: (record) =>
                <span>
                    {
                        this.currUser && this.currUser.type === 2 &&
                        record.phone !== this.currUser.phone &&
                        <Tag color='red' onClick={() => this.handleDel(record)}>删除</Tag>
                    }
                    {
                        this.currUser && (record.phone === this.currUser.phone) &&
                        <Tag color='magenta' onClick={() => this.handleOut(record)}>退出</Tag>
                    }
                </span>
            ,
        },
    ];

    render() {
        return (
            <div className="g-org">
                <div className="z-title bold m-line all-width">
                    组织成员
                    <Badge count={this.memberList.length} className="site-badge-count-4" />
                </div>
                {
                    this.currUser && this.currUser.type === 2 &&
                    <Button type="primary" style={{ float: 'right', marginTop: -30 }} onClick={this.handleAdd}>
                        添加
                    </Button>
                }

                <Spin spinning={this.state.loading} size="large" delay={200}>
                    <Table
                        dataSource={this.memberList}
                        columns={this.columns}
                        rowKey={item => item}
                        pagination={{ pageSize: 7 }}
                        className="interval"
                    />
                </Spin>
                <Modal
                    title="搜索添加"
                    visible={this.state.showAddBox}
                    onOk={this.handleAddOk}
                    confirmLoading={this.state.loading}
                    onCancel={this.handleAddCancel}
                >
                    {!this.state.addConfirm &&
                        <div>
                            <Input ref="searchUser" placeholder="请输入用户姓名搜索..." onChange={this.handleChangeText} />
                            <div className="m-listwrapper">
                                <List
                                    bordered
                                    dataSource={this.state.resUserList}
                                    renderItem={item => (
                                        <List.Item className="m-list" onClick={() => this.handleSelectMamber(item)}>
                                            <List.Item.Meta
                                                title={item.name}
                                                description={item.type === 0 ? item.phone : '已加入管理员'}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </div>
                    }
                    {this.state.addConfirm &&
                        <p>确认将<span className="strong"> {this.state.operateMember.name} </span>设为管理员?</p>
                    }
                </Modal>
                <Modal
                    visible={this.state.deleteConfirm}
                    onOk={this.handleDelOk}
                    confirmLoading={this.state.loading}
                    onCancel={this.handleDelCancel}
                >
                    <p>确认将<span className="strong"> {this.state.operateMember.name} </span>从管理员列表移除?</p>
                </Modal>
                <Modal
                    visible={this.state.outConfirm}
                    onOk={this.handleOutOk}
                    confirmLoading={this.state.loading}
                    onCancel={this.handleOutCancel}
                >
                    <p>确认退出管理员列表?</p>
                </Modal>
            </div>
        )
    }
}

export default Organize