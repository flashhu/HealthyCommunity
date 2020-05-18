import React, { Component } from 'react'
import { NavLink, withRouter, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Menu, Button } from 'antd'
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

import { USER_MENU_LIST, ADMIN_MENU_LIST } from '../../constant/data'
import logo from '../../asset/image/favicon.png'
import './index.css'

@inject('userStore')
@observer
class NavWrapper extends Component {

    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }

    render() {
        const path = window.location.pathname;
        // console.log("this is nav type:"+this.currUser.type);
        return (
            <div className='g-navwrapper'>
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
                        {!this.currUser && <Redirect to='/login' />}
                        {this.currUser && this.currUser.type && ADMIN_MENU_LIST.map((item) =>
                            <Menu.Item key={item.path}>
                                <NavLink to={item.path}>
                                    <span>{item.name}</span>
                                </NavLink>
                            </Menu.Item>
                        )}
                        {this.currUser && !this.currUser.type && USER_MENU_LIST.map((item) =>
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
                                <ShoppingCartOutlined />
                                <UserOutlined />
                            </div>
                        }
                        {!this.currUser &&
                            <div className="m-btn">
                                <Button type="primary" shape="round" size="small">
                                    <NavLink to='/login'>
                                        ç™»å½•
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