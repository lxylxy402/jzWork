import React, { Component } from '../../../node_modules/_react@16.4.1@react'
import { Col, Row, Table, Card, Button, Modal,Tree } from '../../../node_modules/_antd@3.7.3@antd'
import OrgForm from './orgForm'

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
generateData(z);

export default class index extends Component {
    state = {
        gData,
        expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
    }
    onDragEnter = (info) => {
        console.log(info);
        // expandedKeys 需要受控时设置
        // this.setState({
        //   expandedKeys: info.expandedKeys,
        // });
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
                            draggable
                            onDragEnter={this.onDragEnter}
                            onDrop={this.onDrop}
                        >
                            {loop(this.state.gData)}
                        </Tree>

                    </Card>
                </Col>
                <Col span={16}>
                    <Card title="部门管理" style={{ margin: 10 }}>
                        <OrgForm/>
                    </Card>
                </Col>
            </Row>
        )
    }
}
