import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { computed, toJS } from 'mobx'
import { Input, Table } from 'antd'
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
            let params = { title: value };
            this.props.noticeStore.search(params)
            .then(r => {
            });
        }
        this.refs.searchBar.input.state.value = '';
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
            title: '摘要',
            dataIndex: 'content',
            key: 'content',
            responsive: ['md'],
            render: item => {
                return (<div
                    content={item}
                    style={{maxWidth: '300px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden',
                        wordWrap: 'break-word', wordBreak: 'break-all'}}
                >
                    <div dangerouslySetInnerHTML={{ __html: item.substr(0, 20) + '...' }} />
                </div>);
            }   
        },
        {
            title: '发布时间',
            dataIndex: 'time',
            key: 'time',
            responsive: ['lg']
        },
  ];

    render() {
        return (
            <div className="g-notice">
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