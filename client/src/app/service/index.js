import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { computed, toJS } from 'mobx'
import { Tag, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import LazyLoad from 'react-lazyload';
import loading from '../../asset/image/loading-arrow.gif'
import 'antd/dist/antd.css';
import './index.less'


const { CheckableTag } = Tag;
const tagsData = ['主食', '肉蛋奶', '蔬菜水果'];

@inject('serviceStore', 'userStore', 'healthStore')
@observer
class Notice extends Component {
    state = {
        count: 0,
        show: true,
        selectedTags: ['主食'],
        content: '',
        recommend: '',
    };

    @computed
    get currUser() {
        return toJS(this.props.userStore.currUser);
    }

    @computed
    get goodsList() {
        return toJS(this.props.serviceStore.goodsList);
    }

    @computed
    get orderList() {
        return this.props.serviceStore.orderList;
    }

    @computed
    get shopCartList() {
        return toJS(this.props.serviceStore.shopCartList);
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
    get count() {
        return this.props.serviceStore.count;
    }
    componentDidMount = () => {
        if (!this.goodsList.length) {
            this.getData();
        }
    }
    getData() {
        this.props.serviceStore.getGoods()
            .then(r => {
                this.setState({
                    recommend:
                        this.goodsList.main.map((item) =>
                            item &&
                            (item.name === this.bSugstList.staple.name
                                || item.name === this.lSugstList.staple.name
                                || item.name === this.dSugstList.staple.name)
                            &&
                            <article className='food' key={item.name}>
                                <div className="img-container">
                                    {/* <LazyLoad height={150} placeholder={<img src={loading} alt="loading" />}> */}
                                    <LazyLoad height={150} alt={loading}>
                                        <img src={item.url} alt={item.name} />
                                    </LazyLoad>
                                </div>
                                <div className="img-bottom">
                                    <p>荐</p>
                                    <h5>{item.name} 1{item.unit}</h5>
                                    <h3>￥{item.price}</h3>

                                    <div className="incr">
                                        <Button onClick={() => this.increase(item)} shape="circle">
                                            <PlusOutlined />
                                        </Button>
                                    </div>
                                </div>
                            </article>),
                    content:
                        this.goodsList.main.map((item) =>
                            item && !(item.name === this.bSugstList.staple.name
                                || item.name === this.lSugstList.staple.name
                                || item.name === this.dSugstList.staple.name)
                            &&
                            <article className='food' key={item.name}>
                                <div className="img-container">
                                    {/* <LazyLoad height={150} placeholder={<img src={loading} alt="loading" />}> */}
                                    <LazyLoad height={150} alt={loading}>
                                        <img src={item.url} alt={item.name} />
                                    </LazyLoad>
                                </div>
                                <div className="img-bottom">
                                    <h5>{item.name} 1{item.unit}</h5>
                                    <h3>￥{item.price}</h3>

                                    <div className="incr">
                                        <Button onClick={() => this.increase(item)} shape="circle">
                                            <PlusOutlined />
                                        </Button>
                                    </div>
                                </div>
                            </article>)
                })
            })

    }
    increase = (item) => {
        const count = this.state.count + 1;
        item.sale++;
        this.props.serviceStore.incrCount();
        console.log('this is item: ', item.name, 'sale: ', item.sale);
        this.props.serviceStore.setShopCartList({ name: item.name, sale: item.sale, price: item.price, phone: this.currUser.phone, total: item.sale * item.price });
        this.setState({ count });
    };
    handleChange(tag, checked) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ? tag : selectedTags;
        this.setState({
            selectedTags: nextSelectedTags
        });
        if (tag === '主食') {
            console.log('这是主食');
            this.setState({
                recommend:
                    this.goodsList.main.map((item) =>
                        item && (item.name === this.bSugstList.staple.name
                            || item.name === this.lSugstList.staple.name
                            || item.name === this.dSugstList.staple.name)
                        &&
                        <article className='food' key={item.name}>
                            <div className="img-container">
                                {/* <LazyLoad height={150} placeholder={<img src={loading} alt="loading" />}> */}
                                <LazyLoad height={150} alt={loading}>
                                    <img src={item.url} alt={item.name} />
                                </LazyLoad>
                            </div>
                            <div className="img-bottom">
                                <p>荐</p>
                                <h5>{item.name} 1{item.unit}</h5>
                                <h3>￥{item.price}</h3>

                                <div className="incr">
                                    <Button onClick={() => this.increase(item)} shape="circle">
                                        <PlusOutlined />
                                    </Button>
                                </div>
                            </div>
                        </article>),
                content:
                    this.goodsList.main.map((item) =>
                        item && !(item.name === this.bSugstList.staple.name
                            || item.name === this.lSugstList.staple.name
                            || item.name === this.dSugstList.staple.name)
                        &&
                        <article className='food' key={item.name}>
                            <div className="img-container">
                                {/* <LazyLoad height={150} placeholder={<img src={loading} alt="loading" />}> */}
                                <LazyLoad height={150} alt={loading}>
                                    <img src={item.url} alt={item.name} />
                                </LazyLoad>
                            </div>
                            <div className="img-bottom">
                                <h5>{item.name} 1{item.unit}</h5>
                                <h3>￥{item.price}</h3>

                                <div className="incr">
                                    <Button onClick={() => this.increase(item)} shape="circle">
                                        <PlusOutlined />
                                    </Button>
                                </div>
                            </div>
                        </article>)
            })

        }
        if (tag === '肉蛋奶') {
            console.log('这是肉蛋奶');
            this.setState({
                recommend:
                    this.goodsList.mmne.map((item) =>
                        item && (item.name === this.bSugstList.meat.name
                            || item.name === this.lSugstList.meat.name
                            || item.name === this.dSugstList.meat.name)
                        &&
                        <article className='food' key={item.name}>
                            <div className="img-container">
                                {/* <LazyLoad height={150} placeholder={<img src={loading} alt="loading" />}> */}
                                <LazyLoad height={150} alt={loading}>
                                    <img src={item.url} alt={item.name} />
                                </LazyLoad>
                            </div>
                            <div className="img-bottom">
                                <p>荐</p>
                                <h5>{item.name} 1{item.unit}</h5>
                                <h3>￥{item.price}</h3>

                                <div className="incr">
                                    <Button onClick={() => this.increase(item)} shape="circle">
                                        <PlusOutlined />
                                    </Button>
                                </div>
                            </div>
                        </article>),
                content:
                    this.goodsList.mmne.map((item) =>
                        item && !(item.name === this.bSugstList.meat.name
                            || item.name === this.lSugstList.meat.name
                            || item.name === this.dSugstList.meat.name)
                        &&
                        <article className='food' key={item.name}>
                            <div className="img-container">
                                {/* <LazyLoad height={150} placeholder={<img src={loading} alt="loading" />}> */}
                                <LazyLoad height={150} alt={loading}>
                                    <img src={item.url} alt={item.name} />
                                </LazyLoad>
                            </div>
                            <div className="img-bottom">
                                <h5>{item.name} 1{item.unit}</h5>
                                <h3>￥{item.price}</h3>

                                <div className="incr">
                                    <Button onClick={() => this.increase(item)} shape="circle">
                                        <PlusOutlined />
                                    </Button>
                                </div>
                            </div>
                        </article>)
            })

        }
        if (tag === '蔬菜水果') {
            console.log('这是蔬菜');
            this.setState({
                recommend:
                    this.goodsList.vegetables.map((item) =>
                        item && (item.name === this.bSugstList.vegetable.name
                            || item.name === this.lSugstList.vegetable.name
                            || item.name === this.dSugstList.vegetable.name)
                        &&
                        <article className='food' key={item.name}>
                            <div className="img-container">
                                {/* <LazyLoad height={150} placeholder={<img src={loading} alt="loading" />}> */}
                                <LazyLoad height={150} alt={loading}>
                                    <img src={item.url} alt={item.name} />
                                </LazyLoad>
                            </div>
                            <div className="img-bottom">
                                <p>荐</p>
                                <h5>{item.name} 1{item.unit}</h5>
                                <h3>￥{item.price}</h3>

                                <div className="incr">
                                    <Button onClick={() => this.increase(item)} shape="circle">
                                        <PlusOutlined />
                                    </Button>
                                </div>
                            </div>
                        </article>),
                content:
                    this.goodsList.vegetables.map((item) =>
                        item && !(item.name === this.bSugstList.vegetable.name
                            || item.name === this.lSugstList.vegetable.name
                            || item.name === this.dSugstList.vegetable.name)
                        &&
                        <article className='food' key={item.name}>
                            <div className="img-container">
                                {/* <LazyLoad height={150} placeholder={<img src={loading} alt="loading" />}> */}
                                <LazyLoad height={150} alt={loading}>
                                    <img src={item.url} alt={item.name} />
                                </LazyLoad>
                            </div>
                            <div className="img-bottom">
                                <h5>{item.name} 1{item.unit}</h5>
                                <h3>￥{item.price}</h3>

                                <div className="incr">
                                    <Button onClick={() => this.increase(item)} shape="circle">
                                        <PlusOutlined />
                                    </Button>
                                </div>
                            </div>
                        </article>)
            })
        }
    }
    render() {
        const { selectedTags } = this.state;
        const { content, recommend } = this.state;
        // console.log('this is shoplist:', this.shopCartList);
        return (
            <div className="g-notice">
                <div className="m-title">
                    <h2>菜品采购</h2>
                    <p>品质优选，送货到家</p>
                </div>
                <div className="m-tags">
                    <span style={{ marginRight: 8 }}>全部分类 :</span>
                    {tagsData.map(tag => (
                        <CheckableTag
                            key={tag}
                            checked={selectedTags.indexOf(tag) > -1}
                            onChange={checked => this.handleChange(tag, checked)}
                            color="red"
                        >
                            {tag}
                        </CheckableTag>
                    ))}
                </div>
                <section className='m-food'>
                    <div className='m-food-center'>
                        {recommend}
                        {content}
                    </div>
                </section>
            </div>
        )
    }
}

export default Notice