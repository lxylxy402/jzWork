import React, { Component } from '../../../node_modules/_react@16.4.1@react'
import { Col, Row, Table, Card, Button, Modal,Tree } from '../../../node_modules/_antd@3.7.3@antd'

const TreeNode = Tree.TreeNode;

const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
    const preKey = _preKey || '部门';
    const tns = _tns || gData;

    const children = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({ title: key, key });
        if (i < y) {
            children.push(key);
        }
    }
    if (_level < 0) {
        return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = [];
        return generateData(level, key, tns[index].children);
    });
};
const dataSource = [{
    key: '1',
    name: '胡彦斌',
    age: 1,
    address: '开个演唱会'
}, {
    key: '2',
    name: '吴彦祖',
    age: 2,
    address: '拍个电影'
}, {
    key: '3',
    name: '刘德华',
    age: 0,
    address: '跟雷军合唱are you ok'
}];

const columns = [{
    title: '人大代表',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '完成情况',
    dataIndex: 'age',
    key: 'age',
    render: (text) => <div style={selectColor(text)}>{selectText(text)}</div>
}, {
    title: '事由详情',
    dataIndex: 'address',
    key: 'address',
}];
generateData(z);
const selectColor = (text) =>{
    if(text===0){
        return {color:"green"}
    } else if (text === 1) {
        return { color: "red" }
    } else {
        return { color: "blue" }
    }
}
const selectText = (text) =>{
    if(text===0){
        return "已完成"
    } else if (text === 1) {
        return "未完成"
    } else {
        return "进行中"
    }
}
export default class index extends Component {
    state = {
        gData,
        expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
        selectedKeys: "部门-0"
    }
    onDragEnter = (info) => {
        console.log(info);
        // expandedKeys 需要受控时设置
        // this.setState({
        //   expandedKeys: info.expandedKeys,
        // });
    }
    onSelect = (selectedKeys, info) => {
        console.log('onSelect', selectedKeys);
        this.setState({ selectedKeys})
    }
    onDrop = (info) => {
        console.log(info);
        const dropKey = info.node.props.eventKey;
        const dragKey = info.dragNode.props.eventKey;
        const dropPos = info.node.props.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
        // const dragNodesKeys = info.dragNodesKeys;
        const loop = (data, key, callback) => {
            data.forEach((item, index, arr) => {
                if (item.key === key) {
                    return callback(item, index, arr);
                }
                if (item.children) {
                    return loop(item.children, key, callback);
                }
            });
        };
        const data = [...this.state.gData];
        let dragObj;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });
        if (info.dropToGap) {
            let ar;
            let i;
            loop(data, dropKey, (item, index, arr) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                ar.splice(i, 0, dragObj);
            } else {
                // drag node and drop node in the same level
                // and drop to the last node
                if (dragKey.length === dropKey.length && ar.length - 1 === i) {
                    i += 2;
                }
                ar.splice(i - 1, 0, dragObj);
            }
        } else {
            loop(data, dropKey, (item) => {
                item.children = item.children || [];
                // where to insert 示例添加到尾部，可以是随意位置
                item.children.push(dragObj);
            });
        }
        this.setState({
            gData: data,
        });
    }
    render() {
        const loop = data => data.map((item) => {
            if (item.children && item.children.length) {
                return <TreeNode key={item.key} title={item.key}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode key={item.key} title={item.key} />;
        });
        return (
            <Row>
                <Col span={8}>
                    <Card title="组织结构列表" style={{ margin: 10 }}>
                        <Tree
                            className="draggable-tree"
                            defaultExpandAll
                            defaultSelectedKeys={["部门-0"]}
                            onDragEnter={this.onDragEnter}
                            onDrop={this.onDrop}
                            onSelect={this.onSelect}
                        >
                            {loop(this.state.gData)}
                        </Tree>

                    </Card>
                </Col>
                <Col span={16}>
                    <Card title={this.state.selectedKeys+"提案承办\协办清单"} style={{ margin: 10 }}>
                        <div style={{hieght:24,padding:4,lineHeight:"24px",fontSize:"1.2em"}}>人大提案</div>
                        <Table 
                            size="small"
                            dataSource={dataSource} 
                            columns={columns} />
                        <div style={{ hieght: 24, padding: 4, lineHeight: "24px", fontSize: "1.2em" }}>政协提案</div>
                        <Table 
                            size="small"
                            dataSource={dataSource} 
                            columns={columns} />
                    </Card>
                </Col>
            </Row>
        )
    }
}
