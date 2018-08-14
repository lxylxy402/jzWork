import React, { Component } from '../../../node_modules/_react@16.4.1@react'
import axios from '../../../node_modules/_axios@0.18.0@axios';
import option from 'ZbtOption/config'
import { Table, Button, Modal, Collapse,Divider,Icon } from '../../../node_modules/_antd@3.7.3@antd'
import moment from '../../../node_modules/_moment@2.22.2@moment';

const user = JSON.parse(localStorage.getItem('user'))
const Panel = Collapse.Panel;

export default class Partymerge extends Component {
    state = {
        DataSource: [],
        Sta: null,
        Total: 0,
        Page: 1,
        Num: 1,
        Visible: false,
        FFF: null,
        Datas: null,
        See:0,
    }
    componentDidMount = () => {
        this.state.isporg = user.roleId == 2 ?  0 : 1
        this.accept()
    }

    accept = ()=>{
        axios.get(option.api.wait,
            {
                params: {
                    orgId: user.orgId,
                    isporg: this.state.isporg,   //1查询自己，0查询下属部门
                    ppmtypeid: 32, //党务公开33村务公开
                    page: this.state.Page,
                    num: 10,
                }
            }
        ).then((data) => {
            console.log(data)
            let datas = data.data.data
            let arr = []
            datas.map((v, i) => {
                arr.push({
                    num: i + this.state.Num,
                    rptId: v.rptId,
                    bgnDate: moment(v.bgnDate).format('YYYY年MM月DD日'),
                    cbgnDate: v.bgnDate,
                    pmId: v.pmId,
                    title: v.rptName,
                    org: v.rptOrgName,
                    rptId: v.rptId,
                    pmTypeId: v.pmTypeId,
                    key: v.rptId,
                    See:v.state,
                })
            })
            this.setState({
                DataSource: arr,
                Total: data.data.size,
            })
        })
    }

    changeSize = (e, f) => {
        this.state.Page = e
        this.accept()
    }
    showTotal = (e, f) => {
        // console.log(e)
        // console.log(f)
        this.state.Num = f[0]
    }

    // 打开编辑窗口
    edit = (e) => {
        console.log(e)
        axios.get(option.api.seeParty + e.rptId, {
            params: {
                pSysId: 44,   //44查看党务，45查看村务公开
                state: 1,    //1查看未上报的，2查看已上报的
            }
        }).then((data) => {
            console.log(data)
            let datas = data.data.data
            this.setState({
                Datas: datas,
                Visible: true
            })
        })
    }

    //渲染折叠面板
    Face = (Datas) => {
        let arr = []

        console.log('进入了face')
        console.log(Datas)
        Datas.map((v, i) => {
            arr.push(
                <Panel header={v.label} key={v.key}>
                    {
                        v.children.length !== 0 ?
                            <Collapse defaultActiveKey="1">
                                {
                                    this.faceface(v.children)
                                }

                            </Collapse>
                            :
                            <Panel header={v.label} key={v.key}>
                                <p>333333</p>
                            </Panel>
                    }
                </Panel>
            )
        })
        return arr
    }
    faceface = (v) => {
        let farr = []
        v.map((f, i) => {
            farr.push(
                <Panel header={f.label} key={f.key}>
                    {
                        f.children == null ?
                            <p> 2222</p>
                            : this.faceface(f.children)
                    }
                </Panel>
            )

        })
        return farr
    }


    handleOk = () => {
        this.setState({
            Visible: false
        })
    }

    handleCancel = () => {
        this.setState({
            Visible: false
        })
    }

    todetail=(ss,state)=>{
        console.log(ss)
        this.props.history.push('wait/detail',{pmdata:ss,state:state})
    }


    // 根据角色的不同，push进去不同的操作
    tableTitle = () => {
        let tTitle = [
            {
                title: '序号',
                dataIndex: 'num',
                key: 'name'
            }, {
                title: '标题',
                dataIndex: 'title',
                key: 'title'
            }, {
                title: '日期',
                dataIndex: 'bgnDate',
                key: 'bgnDate'
            }, {
                title: '组织',
                dataIndex: 'org',
                key: 'org'
            }
        ]
        if (user.roleId) {
            tTitle.push({
                title: '编辑',
                dataIndex: 'edit',
                key: 'edit',
                render: (text, record) => {
                    return (
                        <div>
                            {/* <a href="javascript:;" onClick={() => this.edit(record)}>编辑</a> */}
                            <div>
                                {user.roleId == 2   ? 
                                    <div>
                                        {
                                            record.See == 1 ? <div>
                                                <Icon type="check" style={{color:'red',fontSize: 23,}}/>
                                                <Divider type="vertical" />
                                                <a href="javascript:;" onClick={()=>this.todetail(record,2)}>查看</a> 
                                            </div>
                                            : 
                                            <div>
                                                待上报
                                            </div> 
                                        }        
                                    </div>
                                    :  
                                        <div>
                                        {
                                            record.See == 1  ? 
                                            <div>
                                                <Icon type="check" style={{color:'red',fontSize: 23,}}/>
                                                <Divider type="vertical" />
                                                <a href="javascript:;" onClick={()=>this.todetail(record,2)}>查看</a>     
                                            </div>
                                            :
                                            <a href="javascript:;" onClick={() => this.todetail(record,1)}>编辑</a>
                                        }
                                        </div>                
                                }
                            </div>
                        </div>
                    )
                }
            })
        }
        return tTitle
    }

    render() {
        let tableTitle = this.tableTitle()
        const Pagination = {
            total: this.state.Total,
            onChange: this.changeSize,
            showTotal: this.showTotal,
        }
        return (
            <div>
                <Table
                    pagination={Pagination}
                    dataSource={this.state.DataSource}
                    columns={tableTitle}
                >
                </Table>

                <Modal
                    width ={1000}
                    destroyOnClose
                    visible={this.state.Visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >

                    {/* <Panel header="This is panel header 1" key="1">
                            <p>213123</p>
                        </Panel> */}
                    <Collapse>
                        {this.state.Visible ? (this.Face(this.state.Datas)) : (<div />)}
                    </Collapse>
                </Modal>
            </div>
        )
    }
}
