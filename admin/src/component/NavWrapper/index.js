import React, { Component } from 'react'
import { NavLink, withRouter, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Menu, Button, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons';

import { ADMIN_MENU_LIST, ADMIN_CONF_MENU_LIST } from '../../constant/data'
import logo from '../../asset/image/favicon.png'
import './index.less'

@inject('userStore')
@observer
class NavWrapper extends Component {

    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }
    
    doLogout = () => {
        this.props.userStore.logout();
    }
    menu = (
        <Menu>
            {ADMIN_CONF_MENU_LIST.map((item) =>
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
        // 通过this.props使用history
        const path = this.props.location.pathname;

        return (
            <div className='g-navwrapper'>
                {!this.currUser && <Redirect to='/login' />}
                <div className="m-nav">
                    <NavLink to='/login'>
                        <div className="m-logo">
                            <img src={logo} alt='logo' />
                        </div>
                    </NavLink>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={ADMIN_MENU_LIST[0].name}
                        selectedKeys={[path]}
                    >
                        {ADMIN_MENU_LIST.map((item) =>
                            <Menu.Item key={item.path}>
                                <NavLink to={item.path}>
                                    <span>{item.name}</span>
                                </NavLink>
                            </Menu.Item>
                        )}
                    </Menu>
                    <div className="right">
                        {this.currUser &&
                            <div className="m-icon">
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
                                </Button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(NavWrapper)