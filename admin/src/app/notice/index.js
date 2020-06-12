import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { computed, toJS } from 'mobx'
import { Input, Table } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import './index.less'
const { Search } = Input;

@inject('noticeStore')
@observer
class Notice extends Component{
    constructor(props){
        super(props);
        this.state = {
            cardType: 0,
        }
    }

    @computed
    get noticeList() {
        return toJS(this.props.noticeStore.noticeList);
    }

    componentDidMount() {
        this.props.noticeStore.getNoticeData();
    }

    handleSearch = (value) => {
        if( value === '' ) {
            this.props.noticeStore.getNoticeData();
        }else{
            console.log(value);
            let params = { title: value };
            this.props.noticeStore.search(params)
            .then(r => {
            });
        }
        this.refs.searchBar.input.state.value = '';
    }

    handleDelete =(value)=>{
        console.log(value, this.noticeList);
        this.props.noticeStore.delNotice(value);
    }

    columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (d, record) => 
                <Link to={`/detail/${record.id}`}>
                    <span>
                        {record.title}
                    </span>
                </Link>
        },
        {
            title: '发布时间',
            dataIndex: 'time',
            key: 'time',
            responsive: ['md']
        },
        {
            title: '发布人',
            dataIndex: 'writer',
            key: 'writer',
            responsive: ['lg']
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            responsive: ['lg'],
            render: (d, record) =>
            <span onClick={() => this.handleDelete(record.id)}>
              <DeleteOutlined />
            </span>
      },
  ];
    render() {
        return (
            <div className="g-health">
                <div className="m-table interval">
                    <div className="m-line interval">
                        <Search 
                            ref="searchBar"
                            placeholder="标题" 
                            onSearch={value => this.handleSearch(value)} 
                            style={{width: 250, paddingBottom:10}} 
                            enterButton 
                            allowClear
                        />
                    </div>
                    <Table
                        columns={this.columns} 
                        dataSource={this.noticeList}
                        rowKey={item => item.id + 'notice'}
                        pagination={{ pageSize: 8 }}
                    />
                </div>
            </div>
        )
    }
  }


export default Notice