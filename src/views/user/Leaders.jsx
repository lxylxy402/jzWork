import React, { Component } from '../../../node_modules/_react@16.4.1@react'
import { Col, Row, Table, Card,Button,Modal} from '../../../node_modules/_antd@3.7.3@antd'

const dataSource = [{
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
}, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
}];

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
}, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
}];

export default class index extends Component {
    state = {
        visible: false,
        cVisible: false,
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    cShowModal = () => {
        this.setState({
            cVisible: true,
        });
    }
    cHandleOk = (e) => {
        this.setState({
            cVisible: false,
        });
    }
    cHandleCancel = (e) => {
        this.setState({
            cVisible: false,
        });
    }
    render() {
        return (
            <Row>
                <Col span={12}>
                    <Card title={<div>人大代表<Button style={{ float: "right" }} onClick={this.showModal}>添加代表</Button></div>} style={{ margin: 10 }}>
                        <Table size="small" dataSource={dataSource} columns={columns} />
                        
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title={<div>政协委员<Button style={{ float: "right" }} onClick={this.cShowModal}>添加委员</Button></div>} style={{ margin: 10 }}>
                        <Table size="small" dataSource={dataSource} columns={columns} />
                    </Card>
                </Col>
                <Modal
                    title="添加人大代表"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    width={650}
                    cancelText="取消"
                >
                </Modal>
                <Modal
                    title="添加政协委员"
                    visible={this.state.cVisible}
                    onOk={this.cHandleOk}
                    onCancel={this.cHandleCancel}
                    okText="确认"
                    cancelText="取消"
                    width={650}
                >
                </Modal>
            </Row>
        )
    }
}
