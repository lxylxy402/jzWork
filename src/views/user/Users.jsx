import React, { Component } from '../../../node_modules/_react@16.4.1@react'
import { Table, Row, Col, Card, Tree,Button } from '../../../node_modules/_antd@3.7.3@antd';
const TreeNode = Tree.TreeNode;

const columns = [{
    title: '姓名',
    dataIndex: 'name',
}, {
    title: '电话',
    className: 'column-money',
    dataIndex: 'money',
}, {
    title: '邮箱',
    dataIndex: 'address',
},{
    title: '操作',
    render: text => [<a href="" key="edit">修改</a>, <a href="" key="del" style={{ color:"#ff5b5b",marginLeft:10}}>删除</a>]
}];

const data = [
    {
        key: '1',
        name: '用户姓名',
        money: '130000000',
        address: 'asdkgyfdyjg@123.com',
    }, {
        key: '2',
        name: '用户姓名',
        money: '125600000',
        address: 'asdkgyfdyjg@123.com',
    }, {
        key: '3',
        name: '用户姓名',
        money: '12000000',
        address: 'asdkgyfdyjg@123.com',
    },
    {
        key: '4',
        name: '用户姓名',
        money: '30000000',
        address: 'asdkgyfdyjg@123.com',
    }, {
        key: '5',
        name: '用户姓名',
        money: '125600000',
        address: 'asdkgyfdyjg@123.com',
    }, {
        key: '6',
        name: '用户姓名',
        money: '12000000',
        address: 'asdkgyfdyjg@123.com',
    },
];
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
export default class componentName extends Component {
    state = {
        gData,
        expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
    }
    onDragEnter = (info) => {
     //   console.log(info);
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
                    <Card title="部门列表" style={{ margin: 10 }}>
                        <Tree
                            checkable
                            className="draggable-tree"
                            defaultExpandedKeys={this.state.expandedKeys}
                            draggable
                            onDragEnter={this.onDragEnter}
                            onDrop={this.onDrop}
                        >
                            {loop(this.state.gData)}
                        </Tree>
                    </Card>
                </Col>
                <Col span={16}>
                    <Card title={<div>用户列表 <Button size="small">新增用户</Button></div>} style={{ margin: 10 }}>
                        <Table
                            columns={columns}
                            dataSource={data}
                            bordered
                            size="small"
                        />
                    </Card>
                </Col>
            </Row>
        )
    }
}
