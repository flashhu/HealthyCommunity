import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed , toJS} from 'mobx'
import { Divider } from 'antd'
import './index.less'

@inject('noticeStore')
@observer
class Detail extends Component {

    state = {
        noticeDetail : this.noticeList,
    };

    @computed
    get noticeList() {
        return toJS(this.props.noticeStore.noticeList);
    }

    componentDidMount() {
        //get id
        this.getArticle();
    }

    getArticle() {
        this.props.noticeStore.getNoticeData(this.noticeList.id);
    }
    
    render() {
        let id = this.props.match.params.id;
        this.getArticle();
            var title,content,time;
                title = this.noticeList[id-1].title;
                content = this.noticeList[id-1].content;
                time = this.noticeList[id-1].time;
        return (
            <div className="g-detail">
                <div className="m-showArticle">
                    <div className="bolder">
                        <h4 className="m-aTitle">{title}</h4>
                    </div>
                    <Divider orientation="right"><span className="m-time">{time}</span></Divider>
                    <div>
                        <div className="m-aContent">
                            {content}
                        </div>
                    </div>   
                </div>
            </div>

        )
    }
}

export default Detail