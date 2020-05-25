import React, { Component } from 'react'
import { NavLink, withRouter, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Menu, Button } from 'antd'
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

import { USER_MENU_LIST } from '../../constant/data'
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
        const path = this.props.location.pathname;

        return (
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
                        {this.currUser &&
                            <div className="m-icon">
                                <NavLink to='/service'>
                                    <ShoppingCartOutlined />
                                </NavLink>
                                <NavLink to='/conf'>
                                    <UserOutlined />
                                </NavLink>
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