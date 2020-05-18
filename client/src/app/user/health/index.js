import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Carousel } from 'antd'
import { DoubleRightOutlined } from '@ant-design/icons'
import HabitDialog from '../../../component/HabitDialog'
import CardDialog from '../../../component/CardDialog'
import './index.css'

@inject('cardStore', 'userStore')
@observer
class Health extends Component {
    constructor(props){
        super(props);
        this.state = {
            showCard: false,
            showHabit: false,
            loadingCard: false
        }
    }

    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }

    @computed
    get cardList() {
        return this.props.cardStore.cardList;
    }

    showListDialog = (type) => {
        if (type === 'card') {
            this.setState({
                showCard: true
            })
        }
        if (type === 'habit') {
            this.setState({
                showHabit: true
            })
        }
    }

    render() {
        return (
            <div className="g-health">
                <Carousel autoplay>
                    <div onClick={() => this.showListDialog('card')}>
                        <h1>每日打卡</h1>
                        <div className="m-line">
                            <p>守护邻里健康，共建平安社区</p> 
                            <div className="m-link">点击填写<DoubleRightOutlined /></div>
                        </div>
                    </div>
                    <div onClick={() => this.showListDialog('habit')}>
                        <h1>习惯养成计划</h1>
                        <div className="m-line">
                            <p>21天收获保持健康的小秘诀</p> 
                            <div className="m-link">立即加入<DoubleRightOutlined /></div>
                        </div>
                    </div>
                </Carousel>
                {/* 每日打卡弹窗 */}
                <CardDialog
                    visible={this.state.showCard}
                    afterClose={() => this.setState({ showCard: false })}
                />
                {/* 习惯打卡弹窗 */}
                <HabitDialog
                    visible={this.state.showHabit}
                    afterClose={() => this.setState({ showHabit: false })}
                />
                <div className="m-data">

                </div>
            </div>
        )
    }
}

export default Health