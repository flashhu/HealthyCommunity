import React, { Component } from 'react'
import './index.css'

class ContentWrapper extends Component {
    render() {
        return (
            <div className="g-contentwrapper">
                <div className="m-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default ContentWrapper