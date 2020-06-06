import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { ArrowUpOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import './index.less'

class FixedBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            change: false
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.changeScrollTopShow)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.changeScrollTopShow)
        this.setState({
            change: false
        })
    }

    changeScrollTopShow = () => {
        if (document.documentElement.scrollTop > 200) {
            if (this.state.show === false) {
                this.setState({
                    show: true
                })
            }
        } else {
            if (this.state.show === true) {
                this.setState({
                    show: false
                })
            }
        }
    }

    handleScrollTop = () => {
        window.scrollTo(0, 0);
    }

    handleCheckCart = () => {
        window.scrollTo(0, 0);
        this.setState({
            change: true
        })
        //使重定向后，change变回初始值
        setTimeout(() => {
            this.setState({
                change: false
            })
        }, 1000);
    }

    render() {
        return (
            <div className="g-bar">
                {this.state.change && <Redirect to='/service' />}
                {this.state.show &&
                    <div>
                        
                        <div className="m-wrapper" onClick={this.handleCheckCart}>
                            <ShoppingCartOutlined />
                        </div>
                        <div className="m-wrapper" onClick={this.handleScrollTop}>
                            <ArrowUpOutlined />
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default FixedBar