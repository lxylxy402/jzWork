import React, { Component } from '../../../node_modules/_react@16.4.1@react'
import { Row, Col } from '../../../node_modules/_antd@3.7.3@antd';
import MsgForm from './MsgForm'

export default class index extends Component {
    render() {
        return (
            <Row>
                <Col span={16} style={{ padding: 10 }}>
                    <MsgForm/>
                </Col>
            </Row>
            
                
        )
    }
}
