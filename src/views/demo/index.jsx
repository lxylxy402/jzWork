import React, { Component } from 'react'
import { Button, Table, Switch, Checkbox } from 'antd'
import { connect } from 'react-redux'
import { addUser, getUserList, delUser, clearAll } from 'Redux/actions/user'

const columns = [
    {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        render: text => <a href="javascript:;">{text}</a>,
    }, 
    {
        title: '年龄',
        dataIndex: 'name',
        key: 'name',
    }, 
    {
        title: '删除状态',
        dataIndex: 'delete',
        key: 'delete',
        render: text => <Switch checked={text} />,
    }
];

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (variables) => {
            return dispatch(addUser(variables))
        },
        getUserList: () => {
            return dispatch(getUserList())
        },
        delUser: (variables) => {
            return dispatch(delUser(variables))
        },
        clearAll: () => {
            return dispatch(clearAll())
        },
    }
}

class index extends Component {
    state={
        selectedRowKeys:""
    }
    
    componentDidMount() {
        console.log(this.props)
    }
    
    addUser = () => {
        let {addUser} = this.props
        addUser({ 
            name: "用户" + Math.ceil(Math.random() * (100 - 1)), 
            id: Math.ceil(Math.random() * (100 - 1)), 
            delete: false 
        })
        console.log(this.props.user)
    }
    clearAll = () => {
        let { clearAll } = this.props
        clearAll()
    }
    delUser = ()=>{
        let { delUser } = this.props
        // console.log(this.state.selectedRowKeys)
        delUser(this.state.selectedRowKeys)
    }
    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({selectedRowKeys})
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };

        return (
            <div>
                <Button type="primary" onClick={this.addUser}>增加</Button>
                <Button onClick={this.clearAll}>清空</Button>
                <Button type="danger" onClick={this.delUser}>删除</Button>
                <Table columns={columns} rowKey="id" rowSelection={rowSelection} dataSource={this.props.user} />
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(index)