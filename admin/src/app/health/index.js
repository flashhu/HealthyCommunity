import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Select, Input, Table, Tag } from 'antd';
import  NormalRateChart from '../../component/NormalRateChart'
import CompletionRateChart from '../../component/CompletionRateChart'
import { ADMIN_HEALTH_CARD_TYPE, ADMIN_HEALTH_TEMP_TYPE } from '../../constant/data'
import { getCurrDate } from '../../util/date'
import './index.css'

const { Option } = Select;
const { Search } = Input;

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
        responsive: ['md']
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
        responsive: ['lg']
    },
    {
        title: '体温状态',
        dataIndex: 'tempStatus',
        key: 'tempStatus',
        render: d => <span>
                        <Tag color={ADMIN_HEALTH_TEMP_TYPE[d].color}>{ADMIN_HEALTH_TEMP_TYPE[d].name}</Tag>
                    </span>
    },
    {
        title: '打卡状态',
        dataIndex: 'latestCard',
        key: 'latestCard',
        render: d => <span>
                        {
                            d === getCurrDate() && 
                            <Tag color={ADMIN_HEALTH_CARD_TYPE[1].color}>{ADMIN_HEALTH_CARD_TYPE[1].name}</Tag>
                        }
                        {
                            d !== getCurrDate() &&
                            <Tag color={ADMIN_HEALTH_CARD_TYPE[0].color}>{ADMIN_HEALTH_CARD_TYPE[0].name}</Tag>
                        }
                    </span>
    }
];

@inject('healthStore')
@observer
class Health extends Component{
    constructor(props){
        super(props);
        this.state = {
            cardType: 0
        }
    }

    @computed
    get dataList() {
        return this.props.healthStore.dataList;
    }

    @computed
    get completionData() {
        return this.props.healthStore.completionData;
    }

    @computed
    get tempNormalData() {
        return this.props.healthStore.tempNormalData;
    }

    componentDidMount() {
        //0 -> 未打卡
        this.props.healthStore.getData({ type: 0, date: getCurrDate()});
        this.props.healthStore.getChartData();
    }

    handleChange = (value) => {
        this.setState({
            cardType: value
        })
        let params = {type: value, date: getCurrDate()};
        this.props.healthStore.getData(params);
    }

    handleSearch = (value) => {
        let params = { type: this.state.cardType, name: value, date: getCurrDate() };
        this.props.healthStore.search(params);
        this.refs.searchBar.input.state.value = '';
    }

    render() {
        return (
            <div className="g-health">
                <div className="m-data">
                    <div className="z-title bold">数据总览</div>
                    <div className="m-line column center m-chart">
                        <NormalRateChart data={this.tempNormalData} />
                        <CompletionRateChart data={this.completionData} />
                    </div>
                </div>
                <div className="m-table interval">
                    <div className="z-title bold">信息总览</div>
                    <div className="m-line interval">
                        <Select defaultValue="未打卡" style={{ width: 120 }} onChange={this.handleChange}>
                            <Option value={2} key='allstatus'>所有状态</Option>
                            {ADMIN_HEALTH_CARD_TYPE.map((item) => 
                                <Option value={item.id} key={item.name + 'status'}>{item.name}</Option>
                            )}
                        </Select>
                        <Search 
                            ref="searchBar"
                            placeholder="姓名" 
                            onSearch={value => this.handleSearch(value)} 
                            style={{width: 250, marginLeft: 10}} 
                            enterButton 
                            allowClear
                        />
                    </div>
                    <Table 
                        dataSource={this.dataList} 
                        columns={columns} 
                        rowKey={item => item.id + 'table'}
                        pagination={{ pageSize: 4 }}
                        className="interval"
                    />
                </div>
            </div>
        )
    }
}

export default Health