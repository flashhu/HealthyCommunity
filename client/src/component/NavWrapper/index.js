import React, { Component } from 'react'
import { NavLink, withRouter, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Menu, Button, Dropdown, Badge, Affix } from 'antd'
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

import { USER_MENU_LIST, USER_CONF_MENU_LIST } from '../../constant/data'
import logo from '../../asset/image/favicon.png'
import './index.less'



@inject('userStore', 'serviceStore')
@observer
class NavWrapper extends Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }
    @computed
    get count() {
        return this.props.serviceStore.count;
    }
    doLogout = () => {
        this.props.userStore.logout();
    }
    menu = (
        <Menu>
            {USER_CONF_MENU_LIST.map((item) =>
                <Menu.Item key={item.path + 'user'}>
                    <NavLink to={item.path}>
                        <span>{item.name}</span>
                    </NavLink>
                </Menu.Item>
            )}
            <Menu.Item ><a href='/' onClick={this.doLogout} >退出登录</a></Menu.Item>
        </Menu>
    );
    render() {
        const path = this.props.location.pathname;

        return (
            <Affix offsetTop={0}>
                <div className='g-navwrapper'>
                    {!this.currUser && <Redirect to='/login' />}
                    <div className="m-nav">
                        <div className="m-logo">
                            <img src={logo} alt='logo' />
                        </div>
                        <Menu
                            theme="light"
                            mode="horizontal"
                            defaultSelectedKeys={USER_MENU_LIST[0].name}
                            selectedKeys={[path]}
                        >
                            {USER_MENU_LIST.map((item) =>
                                <Menu.Item key={item.path}>
                                    <NavLink to={item.path}>
                                        <span>{item.name}</span>
                                    </NavLink>
                                </Menu.Item>
                            )}
                        </Menu>

                        <div className="right">
                            <NavLink to='/service/cart'>
                                <Badge count={this.count} title='购物车' offset={[35, -10]} className='m-cart' />
                            </NavLink>
                            {this.currUser &&
                                <div className="m-icon">
                                    <NavLink to='/service/cart'>
                                        <ShoppingCartOutlined />
                                    </NavLink>

                                    <Dropdown overlay={this.menu} placement="bottomCenter">
                                        <NavLink to='/conf'>
                                            <UserOutlined />
                                        </NavLink>
                                    </Dropdown>
                                </div>
                            }
                            {!this.currUser &&
                                <div className="m-btn">
                                    <Button type="primary" shape="round" size="small">
                                        <NavLink to='/login'>
                                            登录
                                    </NavLink>

                                        <Dropdown overlay={this.menu} placement="bottomCenter">
                                            <UserOutlined />
                                        </Dropdown>
                                    </Button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Affix>
        )
    }
}

export default withRouter(NavWrapper)