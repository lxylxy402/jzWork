import React, { Component } from 'react'
import {Select,DatePicker,Input,Button,Modal,Table,Divider,Icon,Switch} from 'antd'
import moment from 'moment';
import option from 'ZbtOption/config';
import axios from 'axios';

let user = JSON.parse(localStorage.getItem('user'))
const ThreePm = JSON.parse(localStorage.getItem('ThreePm'))
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const { TextArea } = Input;

//申请会议合并哦！
export default class Merge extends Component {
    state = {
        typeId:0,
        Reason:'',
        begtime:'',
        endtime:'',
        visible:false,
        DataSource:[],
        visible2:false,
        Bgtime:null,
        Edtime:null,
        Total:0,
        Page:0,
        Range:1,
        examId:0,
        mergeId:0,
        tag:1,
        ischangeOrg:false,
        orgId:0,
    }
    componentDidMount = ()=>{
        if(user.roleId==1){
            this.state.ischangeOrg ? this.state.tag=0 :  this.state.tag= 1
        //    this.state.tag=0
        }else if(user.roleId==3){
            this.state.tag=1      
        }else if(user.roleId==2){
            console.log('进入了判断')
            this.state.ischangeOrg ? this.state.tag=0 :  this.state.tag= 1 //1看自己，0看下属是否切换到查看下级部门的状态
            console.log(this.state.tag)
        }  
        this.seeSelect(1)  
    }
    //查看申请情况
    seeSelect = (page=1,state='')=>{
        axios.get(option.api.select,{
            params:{
                orgId:user.orgId,
                state: state,            //0为不通过，1表示通过，2表示待审空为全部
                page:page,
                num:10,
                tag:this.state.tag,     //1表示查询自己，0表是查询下级
            }
        }).then((data)=>{
            console.log(data.data)
            let datas = data.data.data
            let arr = []
            if(datas!=null){
                datas.map((v,i)=>{
                    arr.push({
                        num:this.state.Range+i,
                        applyDate:moment(v.createDate).format('YYYY.MM.DD'),
                        passDate:v.examDate==null? '' : moment(v.examDate).format('YYYY.MM.DD'),
                        //会议申请合并的时间开始-结束
                        bgtime:moment(v.bgnDate).format('YYYY-MM-DD'),
                        edtime:moment(v.endDate).format('YYYY-MM-DD'),
                        mergeDate:moment(v.bgnDate).format('YYYY.MM.DD')+'--'+moment(v.endDate).format('YYYY.MM.DD'),
                        name:v.userName,        //申请人
                        condition: v.state==0 ? '不通过' : (v.state==1 ? '通过' : '待审核'),
                        org:v.orgName,
                        orgId:v.orgId,
                        reason:v.reason,
                        examUserName:v.examUserName,   //审核人
                        mergeMeeting:v.typeName,  //申请的会议
                        typeId:v.typeId,    //后期需要参数好获取 
                        mergeId:v.mergeId,
                        examId:v.examId,
                        key:v.examId,
                    })
                })
                console.log(this.state.Range)
                // arr.push({
                //     num:this.state.Range    
                // })
                this.setState({
                    DataSource:arr,
                    Total:data.data.size,
                })
            }
        })
    }


    handleChange=(value)=> {
        console.log(`selected ${value}`);
        this.setState({
            typeId:value
        })
    }

    inputValue =(e)=>{
        console.log(e.target.value)
        this.setState({
            Reason:e.target.value
        })
    }

    handleOpen = ()=>{
       this.setState({
            visible: true,        
       })
    }

    handleOpen2 =(rec)=>{
        console.log(rec)
        this.setState({
            examId:rec.examId,
            mergeId:rec.mergeId,
            Record:rec,
            Bgtime:rec.bgtime,
            Edtime:rec.edtime,
            begtime:rec.bgtime,
            endtime:rec.edtime,
            orgId:rec.orgId,
            Reason:rec.reason,
            typeId:rec.typeId.split(','),
            mergeMeeting:rec.typeId.split(','),
            visible2:true
        })
    }


    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            visible2:false
        });
    }
    
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            visible2:false
        });
    }

    changeTime = (e)=>{
        this.setState({
            begtime:moment(e[0]).format('YYYY-MM-DD'),
            endtime:moment(e[1]).format('YYYY-MM-DD'),
        })
    }
    changeSize =(page, pageSize)=>{  
        this.seeSelect(page)
    }
    showTotal = (e,b)=>{
        //console.log(e)总条数
        this.state.Range=b[0]
        //console.log(b)页码范围
    }


    //发送请求合并
    sendMerge =  () =>{
        console.log(user.orgId)
        console.log(this.state.typeId.toString())
        console.log(this.state.Reason)
        console.log(user.userId)
        console.log(this.state.begtime)
        console.log(this.state.endtime)
        if(this.state.typeId.toString()==0){
            alert('请选择要合并的会议')
        }else if(this.state.begtime==''||this.state.endtime==''){
            alert('请选择要合并的会议')
        }else if(this.state.Reason==''){
            alert('请填写申请理由')
        }else{
            axios.post(option.api.submit,{
                orgId:user.orgId,
                typeId:this.state.typeId.toString(),
                reason:this.state.Reason,
                userId:user.userId,
                bgnDate:this.state.begtime,
                endDate:this.state.endtime
            }).then((data)=>{
                console.log('申请返回数据')
                console.log(data)
                this.seeSelect(1)
                this.setState({
                    visible: false,
                })
            })
        }      
    }

    //发送请求修改  option.api.select
    sendUpdate = ()=>{
        // console.log(user.orgId)  写这么多，就为了参数好输出
        // console.log(this.state.typeId.toString())
        // console.log('这是会议')
        // console.log(this.state.Reason)
        // console.log(user.userId)
        // console.log(this.state.begtime)
        // console.log(this.state.endtime)
        // console.log(this.state.examId)
        // console.log('这是新加的两个参数')
        // console.log(this.state.mergeId)
        if(this.state.typeId.toString()==0){
            alert('请选择要修改的会议')
        }else if(this.state.begtime==''||this.state.endtime==''){
            alert('请选择要修改的时间')
        }else if(this.state.Reason==''){
            alert('请填修改理由')
        }else{
            axios.post(option.api.update,{
                mergeId:123,
                examId:456,
                orgId:user.orgId,
                typeId:this.state.typeId.toString(),
                reason:this.state.Reason,
                userId:user.userId,
                bgnDate:this.state.begtime,
                endDate:this.state.endtime,
            }).then((data)=>{
                alert('提交审批')
                this.setState({
                    visible2: false,
                })
                console.log('修改返回数据')
                console.log(data)
                this.seeSelect(1)
            })
        }
        
    }


    //审核
    examChange = (record,isexam) =>{
        console.log(record)
        axios.get(option.api.eaxmchange,{
            params:{
                examId:record.examId,
                mergeId:record.mergeId,
                typeId:record.typeId,
                orgId: record.orgId,
                examUserId:user.userId,
                state:isexam,     //0表示不通过，1,表示通过
                bgnDate:record.bgtime,
                endDate:record.edtime,
            }
        }).then((data)=>{
            this.seeSelect(1)
            console.log(data)
        })
    }


    //老哥稳，立马就把角色区分好，你最棒了，加油报哪个bongbongbong
    showIds = ()=>{
        let columns1 =
        [{
            title: '序号',
            dataIndex: 'num',
            key: 'num',
            width: 80,
            fixed:'left',
        },{
            title:'合并编号',
            dataIndex:'mergeId',
            width:100,
            key:'mergeId'
        },{
            title:'申请日期',
            dataIndex:'applyDate',
            width:100,
            key:'applyDate'
        },{
            title:'通过日期',
            width:100,
            dataIndex:'passDate',
            key:'passDate',
        },{
            title:'申请人',
            width:100,
            dataIndex:'name',
            key:'name'
        },{
            title:'申请单位',
            width:100,
            dataIndex:'org',
            key:'org',
        },{
            title:'合并时间',
            width:220,
            dataIndex:'mergeDate',
            key:'mergeDate'
        },{
            title:'合并会议',
            dataIndex:'mergeMeeting',
            width:220,
            key:'mergeMeeting'
        },{
            title:'合并理由',
            dataIndex:'reason',
            key:'reason'
        },{
            title:'审核人',
            dataIndex:'examUserName',
            key:'examUserName'
        },{
            title:'状态',
            dataIndex:'condition',
            key:'condition',
            width: 100,
            fixed:'right',
        }
    ] 
        if(user.roleId==3 ){
            
            columns1.push(
                {
                    title:'修改',
                    dataIndex:'revise',
                    key:'revise',
                    width: 100,
                    fixed:'right',
                    render:(text,record)=>{
                        return (
                            <a href="javascript:;" onClick={()=>this.handleOpen2(record)}>修改</a> 
                        )
                    }
                }
            )
        }
        if(user.roleId==1 || user.roleId==2){
            //console.log("00")
            columns1.push(
                {
                    title:'审批',
                    dataIndex:'revise2',
                    key:'revise2',
                    width: 150,
                    fixed:'right',
                    render:(text,record)=>{
                        //console.log(record.condition)
                        //console.log('审核状态哦') 
                        //alert(9)
                        if(record.condition=='待审核'){  //此时为审核
                            return (
                                <div>
                                    <a href="javascript:;" onClick={()=>this.examChange(record,1)}>通过</a> 
                                    <Divider type='vertical'/>
                                    <a href="javascript:;" onClick={()=>this.examChange(record,0)}>驳回</a> 
                                </div>
                            )
                        }else if(record.condition=='通过'){
                            return (<Icon type='check-circle' style={{color:'green',textAlign:'center'}}/>)
                        }else{
                            return( <Icon type='close-circle' style={{color:'red'}}/>)
                        }
                    }
                }
            )
        }
        return columns1
    }

    fisChangeOrg =(e)=>{
        console.log(e)
       
        if(e){
            console.log('0看下属属')
            this.state.tag = 0
            // this.setState({
            //     ischangeOrg:e,
            //     tag:0
            // })
        }else{  
            console.log('1看自己')
            this.state.tag = 1
            // this.setState({        
            //     ischangeOrg:e,
            //     tag:1
            // })         
        }
        console.log(this.state.tag)
        this.seeSelect(1)  
    } 

    render() { 
        const Pagination = {
            total:this.state.Total,
            onChange:this.changeSize,
            showTotal:this.showTotal
        }
        let columns1= this.showIds()
        return (
            <div>   
                {
                    user.roleId==2 ?
                    <div>
                        查看下属部门：<Switch 
                            checkedChildren="是"
                            unCheckedChildren="否"
                        //    defaultChecked 
                            onChange={(e)=>this.fisChangeOrg(e)} />
                    </div> : 
                    <div></div>
                }
                <div style={{margin:'center'}}>
                {user.roleId==3 || user.roleId==2 ? <Button onClick={this.handleOpen} type="primary">申请合并</Button>:<p/> }    
                    <Modal
                        footer={null}
                        title="申请合并"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        申请会议项： 
                        <Select
                            mode="multiple"
                            style={{ width: '80%' }}
                            placeholder="请选择要合并的会议"
                        //    defaultValue={['a10', 'c12']}
                            onChange={this.handleChange}
                        >
                            <Option key={311} >支委会</Option>
                            <Option key={312}>党员大会</Option>
                            <Option key={313} >党小组会</Option>
                        </Select>
                        <br/><br/>
                        请选择时间： 
                        <RangePicker
                        //    defaultValue={[moment(new Date(), dateFormat), moment(new Date(), dateFormat)]}
                            format={dateFormat}
                            showToday
                            onChange={this.changeTime}
                        /> <br/>
                        <h3>申请的事由：</h3>
                        <TextArea
                            style={{width:470,height:150}}
                            onChange={this.inputValue}
                        />  
                        <br/><br/>
                        <p>
                            <Button type="primary" style={{float:'right'}} onClick={this.sendMerge}>发送请求</Button>  
                        </p>
                    </Modal>


                    {/* 修改的理由 */}

                    <Modal
                        destroyOnClose
                        footer={null}
                        title="申请合并"
                        visible={this.state.visible2}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        申请会议项： 
                        <Select
                            mode="multiple"
                            style={{ width: '80%' }}
                            placeholder="请选择要合并的会议"
                            defaultValue={this.state.mergeMeeting}
                            onChange={this.handleChange}
                        >
                            <Option key={311}>支委会</Option>
                            <Option key={312}>党员大会</Option>
                            <Option key={313}>党小组会</Option>
                        </Select>
                        <br/><br/>
                        请选择时间： 
                        <RangePicker
                            defaultValue={[moment(this.state.Bgtime, dateFormat), moment(this.state.Edtime, dateFormat)]}
                            format={dateFormat}
                            showToday
                            onChange={this.changeTime}
                        /> <br/>
                        <h3>修改的事由：</h3>
                        <TextArea
                            defaultValue={this.state.Reason}
                            style={{width:470,height:150}}
                            onChange={this.inputValue}
                        />  
                        <br/><br/>
                        <p>
                            <Button type="primary" style={{float:'right'}} onClick={this.sendUpdate}>发送修改请求</Button>  
                        </p>
                    </Modal>
                    <Table 
                        pagination={Pagination}
                        scroll={{x:1600}}
                        dataSource={this.state.DataSource}
                        columns={columns1}>
                    </Table>  
                </div>     
            </div>
        )
    }
}
