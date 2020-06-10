import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed, toJS } from 'mobx'
import { Carousel, Avatar, Tabs, Modal, message, Tooltip } from 'antd'
import { DoubleRightOutlined, SyncOutlined, RightOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import HabitDialog from '../../component/HabitDialog'
import CardDialog from '../../component/CardDialog'
import TempChart from '../../component/TempChart'
import HeartChart from '../../component/HeartChart'
import BloodChart from '../../component/BloodChart'
import { HEALTH_ICON, HEALTH_MESSAGE, HEALTH_DIET_SCALE, HEALTH_VEGETABLE } from '../../constant/data'
import { convertD2C, getCurrDate, getCurrTime } from '../../util/date'
import { getSugstFood, randomFoodId, getFoodList } from '../../util/healthcal'
import './index.less'

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
            tipList: [],
            selectId: 0,
            bSugstList: null,
            lSugstList: null,
            dSugstList: null,
            cardNum: null,
            isCard: false
        }
    }
    
    @computed
    get currUser() {
        return toJS(this.props.userStore.currUser);
    }

    @computed
    get cardList() {
        return toJS(this.props.healthStore.cardList);
    }

    @computed
    get cardData() {
        return toJS(this.props.healthStore.cardData);
    }

    @computed
    get scoreList() {
        return toJS(this.props.healthStore.scoreList);
    }

    @computed
    get foodList() {
        return toJS(this.props.healthStore.foodList);
    }

    @computed
    get bSugstList() {
        return toJS(this.props.healthStore.bSugstList);
    }

    @computed
    get lSugstList() {
        return toJS(this.props.healthStore.lSugstList);
    }

    @computed
    get dSugstList() {
        return toJS(this.props.healthStore.dSugstList);
    }

    @computed
    get sportsList() {
        return toJS(this.props.healthStore.sportsList);
    }

    @computed
    get isSubmitHabit() {
        return this.props.healthStore.isSubmitHabit;
    }

    @computed
    get ingest() {
        return this.props.healthStore.ingest;
    }

    componentDidMount() {
        //防止切换页面后重复请求相同数据
        if(!this.cardList.tempList.length){
            this.getData();
        }
        this.getScore();
        if (!this.sportsList.length) { 
            this.getSports();
        }
    }

    getData() {
        this.props.healthStore.getCardData(this.currUser.id);
    }

    getScore() {
        this.props.healthStore.getScore(this.currUser.id)
        .then(r => {
            let list = r.status.split('|');
            let tipList = [];
            if(r.status === '') {
                tipList.push('还没有登记数据哦(•ᴗ•)', '快点击上方每日打卡，或习惯养成计划，开始你的体验吧~');
            }else {
                if (list.length === 1) {
                    tipList.push('快点击上方每日打卡，记录今天的健康数据吧~');
                }
                for (let item of list) {
                    tipList.push(HEALTH_MESSAGE[parseInt(item)]);
                }
            }          

            let isCard = r.cardDate === getCurrDate() ? true: false;

            //提示语
            this.setState({
                tipList: tipList,
                cardNum: r.cardNum,
                isCard: isCard
            })

            if (!this.foodList.bFoodList.staple.length){
                //防止切换页面后重复请求相同数据 仅第一次挂载时调用
                this.getFoods(this.ingest.bIngest, this.ingest.lIngest, this.ingest.dIngest);
            }else {
                this.getSugstFoodString();
            }
        })
    }

    getSports() {
        this.props.healthStore.getSports()
        .then(r => {
            r.map((item) => 
                item['descrip'] = item.descrip.split('|')
            )
            this.props.healthStore.setSportsList(r);
        })
    }
    
    //获取匹配的食物列表
    getFoods(bIngest, lIngest, dIngest) {
        let bparams = { ingest: bIngest, scale: HEALTH_DIET_SCALE.breakfast, vege: HEALTH_VEGETABLE[0] };
        let lparams = { ingest: lIngest, scale: HEALTH_DIET_SCALE.lunch, vege: HEALTH_VEGETABLE[1] };
        let dparams = { ingest: dIngest, scale: HEALTH_DIET_SCALE.dinner, vege: HEALTH_VEGETABLE[2] };
        let bFoodList = null;
        let lFoodList = null;
        let dFoodList = null;
        this.props.healthStore.getFoods(bparams)
        .then(r => {
            let index = randomFoodId(r);
            let sugstFood = getFoodList(r, index);
            bFoodList = r;
            this.props.healthStore.setBSugstList(sugstFood);
            this.setState({
                bSugstList: getSugstFood(bIngest, HEALTH_VEGETABLE[0], sugstFood)
            })
        })
        this.props.healthStore.getFoods(lparams)
        .then(r => {
            let index = randomFoodId(r);
            let sugstFood = getFoodList(r, index);
            lFoodList =  r;
            this.props.healthStore.setLSugstList(sugstFood);
            this.setState({
                lSugstList: getSugstFood(lIngest, HEALTH_VEGETABLE[1], sugstFood)
            })
        })
        this.props.healthStore.getFoods(dparams)
        .then(r => {
            let index = randomFoodId(r);
            let sugstFood = getFoodList(r, index);
            dFoodList = r;
            this.props.healthStore.setDSugstList(sugstFood);
            this.setState({
                dSugstList: getSugstFood(dIngest, HEALTH_VEGETABLE[2], sugstFood)
            })
        })
        

        //等异步获取数据结束
        setTimeout(() => {
            if (bFoodList && lFoodList && dFoodList) {
                this.props.healthStore.setFoodList({ bFoodList: bFoodList, lFoodList: lFoodList, dFoodList: dFoodList });
            }
        }, 600); //时间太短，取不到数据就会报错
    }

    getSugstFoodString() {
        this.setState({
            bSugstList: getSugstFood(this.ingest.bIngest, HEALTH_VEGETABLE[0], this.bSugstList),
            lSugstList: getSugstFood(this.ingest.lIngest, HEALTH_VEGETABLE[1], this.lSugstList),
            dSugstList: getSugstFood(this.ingest.dIngest, HEALTH_VEGETABLE[2], this.dSugstList)
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

    handleClickCard = () => {
        if (this.isSubmitHabit) { 
            if (getCurrTime() < '16:30:00'){ //偷懒打卡
                message.error('打卡机器还没有营业，晚点再来吧 (..›ᴗ‹..)');
            }else{
                let cardNum = this.state.cardNum + 1;
                let date = getCurrDate();
                let params = { uid: this.currUser.id, cardNum: cardNum, cardDate: date };
                this.props.healthStore.newHabitCard(params)
                    .then(r => {
                        if (r.code === 1) {
                            this.setState({
                                cardNum: cardNum,
                                isCard: true
                            })
                            let msg = cardNum === 21 ? '习惯养成计划打卡成功！你变得更棒啦~' : '打卡成功！明天继续加油哦~ (●＾o＾●)';
                            message.success(msg);
                        } else {
                            message.error('打卡机器开小差了，请再试一次 (ㄒoㄒ)');
                        }
                    })
            }
        }else { //未填写习惯养成表单
            message.error('从加入习惯养成计划开始吧~ (*/ω＼*)');
            this.showListDialog('habit');
        }
    }

    changeSugstFood = (type) => {
        if (type === 'b'){
            let index = randomFoodId(this.foodList.bFoodList);
            this.props.healthStore.setBSugstList(getFoodList(this.foodList.bFoodList, index));
            this.setState({
                bSugstList: getSugstFood(this.ingest.bIngest, HEALTH_VEGETABLE[0], this.bSugstList)
            })
        }
        if (type === 'l'){
            let index = randomFoodId(this.foodList.lFoodList);
            this.props.healthStore.setLSugstList(getFoodList(this.foodList.lFoodList, index));
            this.setState({
                lSugstList: getSugstFood(this.ingest.lIngest, HEALTH_VEGETABLE[1], this.lSugstList)
            })
        }
        if (type === 'd') {
            let index = randomFoodId(this.foodList.dFoodList);
            this.props.healthStore.setDSugstList(getFoodList(this.foodList.dFoodList, index));
            this.setState({
                dSugstList: getSugstFood(this.ingest.dIngest, HEALTH_VEGETABLE[2], this.dSugstList)
            })
        }
    }

    showSportsDetail = (id) => {
        Modal.info({
            title: '动作详解',
            content: (
                <div>
                    <h2>{this.sportsList[id].name}</h2>
                    <h3>预计时长：{this.sportsList[id].time}分钟</h3>
                    <h3>训练次数：{this.sportsList[id].per}×{this.sportsList[id].group}组</h3>
                    <h3>要点：</h3>
                    {this.sportsList[id].descrip.map((item) =>
                        <p key={item + 'spdetail'}>● {item}</p>
                    )}
                </div>
            ),
            okText: '明白了',
            onOk() {}
        })
    }

    render() {
        const { showHabit, showCard, tipList, cardNum, isCard, bSugstList, lSugstList, dSugstList } = this.state;
        const text = '食物的份量参考自Keep, 仅供参考';
        return (
            <div className="g-health">
                <Carousel autoplay>
                    <div onClick={() => this.showListDialog('card')} className="m-slide">
                        <h1>每日打卡</h1>
                        <div className="m-line center">
                            <p>守护邻里健康，共建平安社区</p> 
                            <div className="m-link">点击填写<DoubleRightOutlined /></div>
                        </div>
                    </div>
                    <div onClick={() => this.showListDialog('habit')} className="m-slide">
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
                    card={this.cardData.date === convertD2C(getCurrDate())? this.cardData : null}
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
                        <div className="m-intro">  {this.cardData.date === '暂未' ? this.cardData.date :convertD2C(this.cardData.date)}更新</div>
                    </div>
                    <div className="m-line space column">
                        <div className="m-card m-line">
                            <Avatar
                                src={HEALTH_ICON.temp}
                                size={54}
                            />
                            <div className="m-info">
                                <h3>体温</h3>
                                <p><span>{this.cardData.temp}</span> °C</p>
                            </div>
                        </div>
                        <div className="m-card m-line">
                            <Avatar
                                src={HEALTH_ICON.heartrate}
                                size={54}
                            />
                            <div className="m-info">
                                <h3>心率</h3>
                                <p><span>{this.cardData.heartrat}</span> bpm</p>
                            </div>
                        </div>
                        <div className="m-card m-line">
                            <Avatar
                                src="https://healthycommunity.oss-cn-hangzhou.aliyuncs.com/img/svg/bloodpressure.svg"
                                size={54}
                            />
                            <div className="m-info">
                                <h3>血压</h3>
                                <p><span>{this.cardData.blodpres_shrink}/{this.cardData.blodpres_relax}</span> mmHg</p>
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
                        <div className={isCard ? "m-intro" : "m-btn"} onClick={() => this.handleClickCard()}>
                            {isCard ? `累计打卡${cardNum}天` : '打卡'}
                        </div>
                    </div>
                    <div className="m-line column space">
                        <div className="m-card middle">
                            <div className="z-title bold">
                                膳食建议
                                <Tooltip placement="right" title={text}>
                                    <QuestionCircleOutlined style={{fontSize: 16, color:'#999', paddingLeft: 5}}/>
                                </Tooltip>
                            </div>
                            <div className="m-tip">
                                { bSugstList && 
                                    <div className="m-line interval">
                                        <div className="m-sum">
                                            {bSugstList.sum}
                                            <p className="m-unit green">kcal</p>
                                        </div>
                                        <div className="m-item">
                                            <h3>早餐</h3>
                                            <p>{bSugstList.food}</p>
                                        </div>
                                    <div className="m-change" onClick={() => this.changeSugstFood('b')}>
                                            换一换<span className="green"> <SyncOutlined /></span>
                                        </div>
                                    </div>
                                }
                                { lSugstList &&
                                    <div className="m-line interval  border">
                                        <div className="m-sum">
                                            {lSugstList.sum}
                                            <p className="m-unit green">kcal</p>
                                        </div>
                                        <div className="m-item">
                                            <h3>中餐</h3>
                                            <p>{lSugstList.food}</p>
                                        </div>
                                    <div className="m-change" onClick={() => this.changeSugstFood('l')}>
                                            换一换<span className="green"> <SyncOutlined /></span>
                                        </div>
                                    </div>
                                }
                                { dSugstList && 
                                    <div className="m-line interval">
                                        <div className="m-sum">
                                            {dSugstList.sum}
                                            <p className="m-unit green">kcal</p>
                                        </div>
                                        <div className="m-item">
                                            <h3>晚餐</h3>
                                            <p>{dSugstList.food}</p>
                                        </div>
                                    <div className="m-change" onClick={() => this.changeSugstFood('d')}>
                                            换一换<span className="green"> <SyncOutlined /></span>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="m-card middle">
                            <div className="z-title bold">运动建议</div>
                            <div className="m-tip">
                                {this.sportsList.length && 
                                    this.sportsList.map((item, i) => 
                                        <div className={i === 1 ? "m-line interval border" : "m-line interval"} key={item.name + 'spline'}>
                                            <div className="m-sum" key={item.name + 'spsum'}>
                                                {item.time}
                                                <p className="m-unit red">min</p>
                                            </div>
                                            <div className="m-item">
                                                <h3 key={item.name + 'sph3'}>{item.name}</h3>
                                                <p key={item.name + 'spp'}>{item.per}×{item.group}组</p>
                                            </div>
                                            <div className="m-change" onClick={() => this.showSportsDetail(i)}>
                                                动作详解<span className="red"> <RightOutlined /></span>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Health