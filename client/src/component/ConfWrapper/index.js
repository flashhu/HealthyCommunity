import React, { Component } from 'react'
import { NavLink, withRouter, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { computed } from 'mobx'
import { Menu } from 'antd'
import { USER_CONF_MENU_LIST } from '../../constant/data'
import './index.less'

@inject('userStore')
@observer
class ConfWrapper extends Component {
    @computed
    get currUser() {
        return this.props.userStore.currUser;
    }

    render() {
        // 通过this.props使用history
        const path = this.props.location.pathname;

        return (
            <div className="g-confwrapper">
                <div className="m-line column">
                    {!this.currUser && <Redirect to='/login' />}
                    <Menu
                        defaultSelectedKeys={USER_CONF_MENU_LIST[0].name}
                        selectedKeys={[path]}
                        mode="inline"
                        className="m-menu"
                    >
                        {USER_CONF_MENU_LIST.map((item) => 
                            <Menu.Item key={item.path}>
                                <NavLink to={item.path}>
                                    <span>{item.name}</span>
                                </NavLink>
                            </Menu.Item>
                        )}
                    </Menu>
                    <div className="m-context">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ConfWrapper)