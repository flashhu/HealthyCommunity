import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import { Input, Button, message } from 'antd';
import moment from 'moment';
import LEdit from 'wangeditor'
import { computed, toJS } from 'mobx'
import './index.less'
@inject('userStore','noticeStore')
@observer

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorContent:'',
            inputTitle:'',
            noticeListLen: null,
            isSubmit: false
         };
    }

    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }

    @computed
    get noticeList() {
        return toJS(this.props.noticeStore.noticeList);
    }

    componentDidMount() {
        const elemMenu = this.refs.editorElemMenu;
        const elemBody = this.refs.editorElemBody;
        const editor = new LEdit(elemMenu, elemBody)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            this.setState({
                editorContent: editor.txt.html()
            })
        }
        editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            // 'image',  // 插入图片
            'table',  // 表格
        ]
        editor.customConfig.uploadImgShowBase64 = true
        editor.create()

        this.props.noticeStore.getNoticeData()
        .then(r => {
            this.setState({
                noticeListLen: r.length
            })
        })
    };

    inputChange = (event) =>{ 
        this.setState({
            inputTitle:event.target.value,
        })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    }

    getInput = (value) => {
        //取编辑器的文章html格式
        let date = moment().format('YYYY/MM/DD');
        let content = this.state.editorContent;  
        if (this.state.inputTitle === '') {
            message.error('请输入标题！');
        }else {
            let params = { id: this.state.noticeListLen + 1, title: this.state.inputTitle, content: content, time: date, writer: this.props.userStore.currUser.name };
            this.props.noticeStore.addNotice(params)
                .then(r => {
                    if (r) {
                        this.setState({
                            isSubmit: true
                        })
                    }
                })
        }
        // console.log(this.state.inputTitle)
        // console.log(content)
        // console.log(date)
        // console.log(this.props.userStore.currUser.name)
    }

    render() {
        return (
            <div className="g-edit">
                {this.state.isSubmit && < Redirect to='/notice'/> }
                 <div className="m-show">
                     <div className="m-title bolder">编辑公告</div>
                     <div className="m-input">
                         <div className="m-inputTitle intervals">
                             <Input placeholder="标题" ref='title' onChange={this.inputChange}/>
                         </div>
                     </div>
            <div className="intervals">
                <div className="text-area" >
                    <div ref="editorElemMenu"
                         style={{backgroundColor:'#f1f1f1',border:"1px solid #ccc"}}
                         className="editorElem-menu">
                    </div>
                    <div
                        style={{
                            padding:"0 10px",
                            height:300,
                            border:"1px solid #ccc",
                            borderTop:"none"
                        }}
                        ref="editorElemBody" className="editorElem-body">
                    </div>
                </div>
                <div className="m-button">
                    <Button type="primary" block className="button intervals center" onClick={()=>this.getInput()} >发布通知</Button>
                </div>
            </div>
        </div>
    </div>
        )
    }
}

export default Edit