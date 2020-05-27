import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed, toJS } from 'mobx'
import { Carousel, Avatar, Tabs } from 'antd'
import { DoubleRightOutlined, SyncOutlined, RightOutlined } from '@ant-design/icons'
import HabitDialog from '../../component/HabitDialog'
import CardDialog from '../../component/CardDialog'
import TempChart from '../../component/TempChart'
import HeartChart from '../../component/HeartChart'
import BloodChart from '../../component/BloodChart'
import { HEALTH_ICON, HEALTH_MESSAGE } from '../../constant/data'
import { convertD2C, getCurrDate } from '../../util/date'
import './index.css'

const { TabPane } = Tabs;

@inject('healthStore', 'userStore')
@observer
class Health extends Component {
    constructor(props){
        super(props);
        this.state = {
            showCard: false,
            showHabit: false,
            loadingCard: false,
            cardData: {
                date: '暂未',
                temp: '??.?',
                heartrat: '??',
                blodpres_relax: '??',
                blodpres_shrink: '???'
            },
            tipList: []
        }
    }

    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }

    @computed
    get cardList() {
        return toJS(this.props.healthStore.cardList);
    }

    @computed
    get scoreList() {
        return toJS(this.props.healthStore.scoreList);
    }

    componentDidMount() {
        this.getData();
        this.getScore();
    }

    getData() {
        this.props.healthStore.getCardData(this.currUser.phone)
        .then(r=>{
            let date = r.tempList.length > 0 ? r.tempList[r.tempList.length - 1].date : '暂未';
            let temp = r.tempList.length > 0 ? r.tempList[r.tempList.length - 1].temp : '??.?';
            let heartrat = r.heartList.length > 0 ? r.heartList[r.heartList.length - 1].heartrat : '??';;
            let blodpres_relax = r.bloodList.length > 0 ? r.bloodList[r.bloodList.length - 1].blodpres_relax : '??';;
            let blodpres_shrink = r.bloodList.length > 0 ? r.bloodList[r.bloodList.length - 1].blodpres_shrink : '???';;
            this.setState({
                cardData:{
                    date: date,
                    temp: temp,
                    heartrat: heartrat,
                    blodpres_relax: blodpres_relax,
                    blodpres_shrink: blodpres_shrink
                }
            })
        })
    }

    getScore() {
        this.props.healthStore.getScore(this.currUser.phone)
        .then(r => {
            let list = r.split('|');
            let tipList = [];
            if(r === '') {
                tipList.push('还没有登记数据哦(•ᴗ•)', '快点击上方每日打卡，或习惯养成计划，开始你的体验吧~');
            }else {
                if (list.length === 1) {
                    tipList.push('快点击上方每日打卡，记录今天的健康数据吧~');
                }
                for (let item of list) {
                    tipList.push(HEALTH_MESSAGE[parseInt(item)]);
                }
            }
            this.setState({
                tipList: tipList
            })
        })
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
        const { cardData, showHabit, showCard, tipList } = this.state;

        return (
            <div className="g-health">
                <Carousel autoplay>
                    <div onClick={() => this.showListDialog('card')}>
                        <h1>每日打卡</h1>
                        <div className="m-line center">
                            <p>守护邻里健康，共建平安社区</p> 
                            <div className="m-link">点击填写<DoubleRightOutlined /></div>
                        </div>
                    </div>
                    <div onClick={() => this.showListDialog('habit')}>
                        <h1>习惯养成计划</h1>
                        <div className="m-line center">
                            <p>21天收获保持健康的小秘诀</p> 
                            <div className="m-link">立即加入<DoubleRightOutlined /></div>
                        </div>
                    </div>
                </Carousel>
                {/* 每日打卡弹窗 */}
                <CardDialog
                    visible = {showCard}
                    card={cardData.date === convertD2C(getCurrDate())? cardData : null}
                    afterClose={() => this.setState({ showCard: false })}
                    onDialogConfirm={() => { this.getData(); this.getScore(); }}
                />
                {/* 习惯打卡弹窗 */}
                <HabitDialog
                    visible={showHabit}
                    afterClose={() => this.setState({ showHabit: false })}
                    onDialogConfirm={() => { this.getData(); this.getScore(); }}
                />
                <div className="m-data">
                    <div className="m-line">
                        <h3 className="m-title bold">我的数据</h3>
                        <div className="m-intro">  {cardData.date === '暂未' ? cardData.date :convertD2C(cardData.date)}更新</div>
                    </div>
                    <div className="m-line space column">
                        <div className="m-card m-line">
                            <Avatar
                                src={HEALTH_ICON.temp}
                                size={54}
                            />
                            <div className="m-info">
                                <h3>体温</h3>
                                <p><span>{cardData.temp}</span> °C</p>
                            </div>
                        </div>
                        <div className="m-card m-line">
                            <Avatar
                                src={HEALTH_ICON.heartrate}
                                size={54}
                            />
                            <div className="m-info">
                                <h3>心率</h3>
                                <p><span>{cardData.heartrat}</span> bpm</p>
                            </div>
                        </div>
                        <div className="m-card m-line">
                            <Avatar
                                src="https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/svg/bloodpressure.svg"
                                size={54}
                            />
                            <div className="m-info">
                                <h3>血压</h3>
                                <p><span>{cardData.blodpres_shrink}/{cardData.blodpres_relax}</span> mmHg</p>
                            </div>
                        </div>
                    </div>
                    <div className="m-line column space doubleinterval">
                        <div className="m-chart">
                            <div className="z-title bold">历史数据</div>
                            <Tabs defaultActiveKey="temperature">
                                <TabPane tab="体温" key="temperature">
                                    <TempChart data={this.cardList ? this.cardList.tempList: {}} />
                                </TabPane>
                                <TabPane tab="心率" key="heartrate">
                                    <HeartChart data={this.cardList ? this.cardList.heartList : {}} />
                                </TabPane>
                                <TabPane tab="血压" key="bloodpreasure">
                                    <BloodChart data={this.cardList ? this.cardList.bloodList : []}/>
                                </TabPane>
                            </Tabs>
                        </div>
                        <div className="m-card">
                            <div className="z-title bold">健康指数</div>
                            <div className={this.scoreList.score !== '??' && this.scoreList.score < 80 ? "m-grade warn":"m-grade normal"}>{this.scoreList.score}</div>
                            <div className="m-tip">
                                {tipList.map((item) =>
                                    <p key={item + 'p'}><span className={this.scoreList.score !== '??' && this.scoreList.score < 80 ? "warn-font" : "normal-font"} key={item + 'span'}>●</span>{item}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="m-data">
                    <div className="m-line">
                        <h3 className="m-title bold">今日推荐</h3>
                        <div className="m-btn">打卡</div>
                    </div>
                    <div className="m-line column space">
                        <div className="m-card middle">
                            <div className="z-title bold">膳食建议</div>
                            <div className="m-tip">
                                <div className="m-line interval">
                                    <div className="m-sum">
                                        412
                                        <p className="m-unit green">kcal</p>
                                    </div>
                                    <div className="m-item">
                                        <h3>早餐</h3>
                                        <p>1份玉米，1份鱼肉，1份菠菜</p>
                                    </div>
                                    <div className="m-change">
                                        换一换<span className="green"> <SyncOutlined /></span>
                                    </div>
                                </div>
                                <div className="m-line interval  border">
                                    <div className="m-sum">
                                        412
                                        <p className="m-unit green">kcal</p>
                                    </div>
                                    <div className="m-item">
                                        <h3>中餐</h3>
                                        <p>1份玉米，1份鱼肉，1份菠菜</p>
                                    </div>
                                    <div className="m-change">
                                        换一换<span className="green"> <SyncOutlined /></span>
                                    </div>
                                </div>
                                <div className="m-line interval">
                                    <div className="m-sum">
                                        412
                                        <p className="m-unit green">kcal</p>
                                    </div>
                                    <div className="m-item">
                                        <h3>晚餐</h3>
                                        <p>1份玉米，1份鱼肉，1份菠菜</p>
                                    </div>
                                    <div className="m-change">
                                        换一换<span className="green"> <SyncOutlined /></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="m-card middle">
                            <div className="z-title bold">运动建议</div>
                            <div className="m-tip">
                                <div className="m-line interval">
                                    <div className="m-sum">
                                        3
                                        <p className="m-unit red">min</p>
                                    </div>
                                    <div className="m-item">
                                        <h3>仰卧剪刀腿</h3>
                                        <p>12个×3组</p>
                                    </div>
                                    <div className="m-change">
                                        动作详解<span className="red"> <RightOutlined /></span>
                                    </div>
                                </div>
                                <div className="m-line interval  border">
                                    <div className="m-sum">
                                        3
                                        <p className="m-unit red">min</p>
                                    </div>
                                    <div className="m-item">
                                        <h3>摸膝卷腹</h3>
                                        <p>12个×3组</p>
                                    </div>
                                    <div className="m-change">
                                        动作详解<span className="red"> <RightOutlined /></span>
                                    </div>
                                </div>
                                <div className="m-line interval">
                                    <div className="m-sum">
                                        3
                                        <p className="m-unit red">min</p>
                                    </div>
                                    <div className="m-item">
                                        <h3>下落屈蹲</h3>
                                        <p>12个×3组</p>
                                    </div>
                                    <div className="m-change">
                                        动作详解<span className="red"> <RightOutlined /></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Health