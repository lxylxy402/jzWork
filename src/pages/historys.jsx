import React, { Component } from '../../node_modules/_react@16.4.1@react'
import {Table,Modal} from '../../node_modules/_antd@3.7.3@antd'
import axios from '../../node_modules/_axios@0.18.0@axios';
import option from 'ZbtOption/config';

import Allsee from './see'
import  moment from 'moment';

let user = JSON.parse(localStorage.getItem('user'));


export default class History extends Component {
    state = {
        dataSource:[]
    }
    componentDidMount=()=>{
        if(this.props.ppmtypeid !=null){
            this.achieveHistory(this.props.ppmtypeid)
        } 
    }
    achieveHistory = (sysId)=>{
        console.log(sysId)
        axios.get(option.api.history,{
            params:{
                orgId:user.orgId,
                isporg:0,  //0查询下级需要上报的，1表示查询自己需要上报的
                ppmtypeid:sysId, 
                page:1,
                num:10
            }
        }).then((data)=>{
            console.log(data)
            let writes =[]
            let datas = data.data.data;
            console.log(datas)
            for(let i=0 ; i<datas.length; i++){
                writes.push({
                    key: datas[i].rptId,
                    num: datas[i].pmId,
                    meetingname: datas[i].rptName,
                    org: datas[i].rptOrgName,
                    rptId:datas[i].rptId,   
                    rptWarnDate:moment(datas[i].rptWarnDate).format('YYYY年MM月DD日'),
                    pmId:datas[i].pmId,
                })
            }
            console.log(writes)
            this.setState({
                dataSource :writes, 
            //    total : data.data.size,
            //    datas : datas,
            })
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    
    Open = (rptId) =>{
        console.log(rptId)
        this.setState({
            rptId : rptId,
            visible : true,
        })
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }   

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    todetail=(ss,state)=>{
        console.log(ss)
        this.props.history.push('history/detail',{pmdata:ss,state:state})
    }

    render() {
        const columns = [{
            title: '序号',
            dataIndex: 'num',
            key: 'num',
            editable: true,
          }, {
            title: '会议名称',
            dataIndex: 'meetingname',
            key: 'meetingname',
            editable: true,
          }, {
            title: '创建日期',
            dataIndex: 'date',
            key: 'date',
            editable: true,
          },{
            title: '创建日期',
            dataIndex: 'rptWarnDate',
            key: 'rptWarnDate',
            editable: true,
          },{
            title: '部门',
            dataIndex: 'org',
            key: 'org',
            editable: true,
           },
           {
            title:'操作',
            dataIndex:'caoz',
            key:'caoz',
            render: (text,record) => (        
                <div>
                    {
                        this.props.divi==1 ?
                        <a href="javascript:;" onClick={()=>this.todetail(record,2)}>查看历史</a>
                        :
                         <a href="javascript:;" onClick={()=>this.Open(record.rptId)}>查看</a>  
                    }
                </div>
              ),
            }
        ];
        return (
            <div>
                <Table 
                    columns={columns} 
                    dataSource={this.state.dataSource} 

                //    pagination ={pagination}  分页设置
                ></Table>
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width = {800}
                >
                    <Allsee ipd={this.state.rptId} sta={1}/>
                </Modal>
                
            </div>
        )
    }
}
