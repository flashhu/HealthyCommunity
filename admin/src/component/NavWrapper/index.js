import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Menu, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons';

import { ADMIN_MENU_LIST } from '../../constant/data'
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
        // 通过this.props使用history
        const path = this.props.location.pathname;

        return (
            <div className='g-navwrapper'>
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