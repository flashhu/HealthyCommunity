import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Divider } from 'antd'
import './index.less'

@inject('noticeStore')
@observer
class Detail extends Component {
    state = {
        noticeDetail: '',
    };

    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.noticeStore.getNotice(id)
        .then(r => {
            this.setState({
                noticeDetail: r
            })
        })
    }
    
    render() {
        const { noticeDetail } = this.state;
        return (
            <div className="g-detail">
                <div className="m-showArticle">
                    <div className="bolder">
                        <h4 className="m-aTitle">{noticeDetail ? noticeDetail.title : ''}</h4>
                    </div>
                    <Divider orientation="right"><span className="m-time">{noticeDetail ? noticeDetail.time: ''}</span></Divider>
                    <div>
                        <div className="m-aContent">
                            <div className="braft-output-content" dangerouslySetInnerHTML={{ __html: noticeDetail ? noticeDetail.content: '' }} />
                        </div>
                    </div>   
                </div>
            </div>

        )
    }
}

export default Detail