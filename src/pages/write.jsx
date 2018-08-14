import React, { Component } from 'react'
import {Button,Table,Modal,DatePicker,TreeSelect,Divider} from 'antd';
import moment from 'moment';
import option from 'ZbtOption/config';
import axios from 'axios';

const SHOW_ALL = TreeSelect.SHOW_ALL;
const user = JSON.parse(localStorage.getItem('user'))

export default class Partywrite extends Component {
    constructor(props){
        super(props)
    }
    state ={
        Visible:false,
        BgnDate:null,
        CBegDate:'',
        OrgTree:null,
        ToOrgId:'',
        ToOrgName:'',
        Value:[],
        DataSource:[], 
        Page:1,
        Num:1,
        Total:0,
    }
    componentDidMount =()=>{
        this.state.sysId =this.props.sysId
        //获取组织树
        axios.get(option.api.orgTree+'/'+user.orgId).then((data)=>{  
            this.setState({
                OrgTree:data.data.data
            })
        })
        this.sendAllparty(this.state.sysId)
    }
    
    sendAsk = (pmTypeId,pmId='',state=0)=>{
        axios.post(option.api.newPm+'/'+user.userId,{
            pmId:pmId,          //没有为创建，有为修改
            state:state ,   //0未修改保存，3为假删除，
            name:this.state.CBegDate,
            pmTypeId:pmTypeId,   //341党务公开，342村务公开
            pmNo:"1",   //不知道是什么，随意写个1，
            hzNumber:1,  //同上，
            bgnDate:this.state.BgnDate,
            toOrgId:this.state.ToOrgId.toString(),
            toOrgName:this.state.ToOrgName.toString(),
            orgId:user.orgId,
            mainPmId:1,//随便填
        }).then((data)=>{
            console.log('请求到数据')
            console.log(data)
            this.sendAllparty(this.state.sysId)   
            this.setState({
                Visible:false,
            })
        })
    }

    sendAllparty =(pmTypeId,year)=>{
        axios.get(option.api.AllPm,{
            params:{
                orgId:user.orgId,
                userId:user.userId,
                pmTypeId:pmTypeId,   //341党务，342村务
                states:0,
                page:this.state.Page,
                num:10 ,
                year:2018,
            }
        }).then((data)=>{
            let arr =[]
            data.data.data.map((v,i)=>{
                arr.push({
                    num:this.state.Num+i,
                    pmId:v.pmId,
                    pmTypeId:v.pmTypeId,
                    name:v.name,
                    state:v.state,
                    toOrgName:v.toOrgName,
                    toOrgId:v.toOrgId,
                    createDate:v.createDate,
                //    CcreateDate:v.createDate,
                    bgnDate:moment(v.createDate).format('YYYY年MM月DD日'),//moment(v.bgnDate).format('YYYY年MM月DD日'),
                    key:v.pmId,
                })
            })
            console.log('这是arr')
            console.log(arr)
            this.state.DataSource = arr
            this.setState({
                DataSource:arr,
                Total:data.data.size
            })
            console.log(data)
        })
    }

    showOk = ()=>{
        //判断是否选择了时间或者部门
        if(this.state.BgnDate==null||new Date(this.state.BgnDate)<new Date(1972)){
            alert('请选择时间')
        }else if(this.state.ToOrgName==''){
            alert('请选择发送部门')
        }else{
            this.sendAsk(this.state.sysId)  
        }
         
    }
    CancleShow = ()=>{
        this.setState({
            Visible:false,
        })
    }
    showModal =()=>{
        console.log(this.state.orgTree)
        this.setState({
            Visible:true
        })
    }

    //chooseDate选择日期
    chooseDate =(e)=>{
        console.log(e)
        let a =e
        this.setState({
            BgnDate:new Date(e),
            CBegDate:moment(e).format('YYYY年MM月')+this.props.Alltitle
        })
        console.log(new Date(a))
    }

    chooseThreeDate=(value,label,extra)=>{
        // console.log('这是选择组织树的结构')
        console.log(value)
        console.log(label)
        console.log(extra)
        this.setState({ 
            Value:value, 
            ToOrgId:value,
            ToOrgName:label
        });
    }
   
    //序号
    showTotal =(e,f)=>{  
        this.setState.Num = f[0]
    }
    
    //页码
    changeTotal = (e,f)=>{
        this.setState.Page = e
        this.sendAllparty(this.state.sysId)
    }


    //发送会议
    sendTO =(r)=>{
        console.log(r) 
        let time =moment(r.createDate).format('YYYY-MM') 
        let times = new Date(time)
        axios.get(option.api.sendThree+r.pmId+'/'+r.pmTypeId+'/'+times).then((data)=>{
            console.log(data)
            this.sendAllparty(this.state.sysId)
        })
    }
    //删除请求
    deletePolicy =(r)=>{
        axios.get(option.api.deleteThreemeeting+r.pmId,{
            params:{
                type:1
            }
        }).then((data)=>{
            this.sendAllparty(this.state.sysId)
            console.log(data)
        })
    }   
    render() {
        const Pagination ={
            total: this.state.Total,
            pagesize:10,
            defaultCurrent:1,
            showTotal:this.showTotal,
            onChange:this.changeTotal,
        }
        const columns =[
            {
                title: '序号',
                dataIndex: 'num',
                key: 'num',
            },{
                title:'发布时间',
                dataIndex:'bgnDate',
                key:'bgnDate',
            },{
                title:'标题',
                dataIndex:'name',
                key:'name',
            },{
                title:'部门',
                dataIndex:'toOrgName',
                key:'toOrgName',
            },{
                title:'操作',
                dataIndex:'operation',
                key:'operation',
                render:(text,record)=>{
                    return (
                        <div>
                            {/* <a href="javascript:;" onClick={} >修改</a>
                            <Divider type="vertical" /> */}
                            <a href="javascript:;" onClick={()=>{this.sendTO(record)}} >发送</a>
                            <Divider type="vertical" />
                            <a href="javascript:;" onClick={()=>{this.deletePolicy(record)}} >删除</a>
                        </div>
                    )
                }
            }
        ]
        const tProps = {
            treeData:this.state.OrgTree,
            value:this.state.Value,
            onChange: this.chooseThreeDate,
            treeCheckable: true,
            showCheckedStrategy: SHOW_ALL,
            searchPlaceholder: '请选择下发部门',
            style: {
                width: 300,
            },
        }
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>新增{this.props.Alltitle}</Button>
                <Modal
                    destroyOnClose
                    title={this.props.Alltitle}
                    visible={this.state.Visible}
                    onOk={this.showOk}
                    onCancel={this.CancleShow}
                    style={{textAlign:'center'}}
                >   
                    <br/>
                    <div style={{textAlign:'left'}}>
                        <h2>标题：{this.state.CBegDate}</h2>
                        <br/>
                        请选择日期：<DatePicker onChange={this.chooseDate} />
                        <br/><br/>
                        请选择部门：<TreeSelect {...tProps} />
                        <br/><br/>
                        <br/><br/>
                    </div>
                </Modal>   
                <Table
                    pagination={Pagination}
                    dataSource={this.state.DataSource}
                    columns={columns}
                ></Table>
            </div>
        )
    }
}
