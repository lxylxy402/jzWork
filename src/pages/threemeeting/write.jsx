import React, { Component } from '../../../node_modules/_react@16.4.1@react'
import { Button,Modal,Select,DatePicker,TreeSelect,Table} from '../../../node_modules/_antd@3.7.3@antd';
import  isMoment from '../../../node_modules/_moment@2.22.2@moment';
import axios from '../../../node_modules/_axios@0.18.0@axios';
import option from 'ZbtOption/config';
import WriteTable from './writeTable';  //表格
import  moment from '../../../node_modules/_moment@2.22.2@moment';

const   Option = Select.Option
const SHOW_ALL = TreeSelect.SHOW_ALL;
let users = JSON.parse(localStorage.getItem('user'))
let ThreePms = JSON.parse(localStorage.getItem('ThreePm'));



const op = ()=>{
    let arr=[]
    for(let i=2015; i<=2030; i++){
        arr.push( <Option key={i} value={i+"年"} style={{textAlign:"center"}}>{i}年</Option>)
    }
    return arr
}
export default class ThreeWrite extends Component {
    state = {
        ThreePm:[],  //三会一课的三会和一课
        value: [],
        orgTree:null,
        visible:false,
        confirmLoading:false,
        meeting:'',
        year:'',
        month:'',
        title:'',
        user:'',
        bgnDate:null,
        userId:null,
        orgId:null,
        sysId:null,
        toOrgId:null,
        toOrgName:null,   
        datas:[],   //所有获取的数据，方便便利
        dataSource:[],  //传给writeTable子组件的值，渲染表格
        total:0,
    }
    onChangevalue = (value,label) => {
    //    console.log('onChange ', value);
        this.setState({ 
            value:value,
            toOrgName:label.toString(),
            toOrgId:value.toString()
        });
    }
    

    showModal = (record='')=>{
    //    console.log(record)
    //    console.log(record.org.split(','))
    //    console.log(this.state.pmId)
        
        let values='';
        if(record !='' ){
            values = record.org.split(',')
        }
        console.log(record)
        console.log(ThreePms)
        this.setState({
            visible:true,
         //   {key: 195, num: 195, meetingname: "2018年8月支委会", org: "长龙华侨农场党委,驻泸流动党委,驻武汉流动党委"}
            title: record.meetingname,
        //    value: values,
            pmId:record.key,
        })
    }

    //发送请求，创建政策
    handleOk = (e)=>{
        console.log(e)
        axios.post(option.api.newPm+'/'+this.state.userId,{  
                mainPmId:1, 
                pmId:this.state.pmId,
                hzNumber:1,
                bgnDate:this.state.bgnDate,
                mainPmId:1,             
                name: this.state.title,
                orgId: this.state.orgId,      
                pmNo: "1",
                pmTypeId: this.state.sysId,  //两者一致
                state: 0,     //0为创建编辑，1.在用 
                toOrgId: this.state.toOrgId,   //选择部门的所有id
                toOrgName: this.state.toOrgName,      //选择的所有部门信息      
        }).then((data)=>{
            if(data.data.code==1000){
                alert('创建成功')
                console.log(data)
                console.log('这是pmTypeIda!!')
                console.log(data.data.data.pmTypeId)
                this.sendThree(data.data.data.pmTypeId)
                this.setState({
                    confirmLoading:true,
                    visible:false,
                    pmId:null,
                    dfvalue:data.data.data.pmTypeId,
                })
                console.log('这是pmID')
            //    
            }else{
                alert('创建失败')
            }
        })
     //   this.sendThree(this.state.sys)
    //    console.log('重请求')
    //    console.log(this.state.pmId) 
    }
    handleCancel = (e)=>{
        this.setState({
            visible:false
        })
    }

    //获取选中的值(会议名称，年月份)，填入标题
    gainValue = (a)=>{
    //    console.log(typeof(a))
    //    console.log(a)
        let b = a;
        if(typeof(a)=='string'){
            //获取大会名称
            let three = this.state.ThreePm;
            this.state.meeting = b
            for(let i=0;i<three.length;i++){
                if(three[i].sysData==b){
                //    console.log('获取组织树的名称成功')
                //    console.log(three[i].sysData)
                    this.state.sysId=three[i].sysId
                //    console.log(this.state.sysId)
                }
            }
        }else{
            console.log(a)
            this.state.bgnDate = b;
            this.state.year = isMoment(b).format('YYYY')+'年';
            this.state.month = parseInt(isMoment(b).format('MM'));
        }
        let meet = this.state.meeting;
        let month = this.state.month;
        let isnum = this.state.month;
        let year = this.state.year;
        let title = '';
        if(meet !='' && this.state.month !=''){
            if(meet=='党员大会'){
                let quarter ='第' + (month > 9 ? '四季度' : (month > 6 ? '三季度' : (month > 3 ? '二季度' : '一季度')))
                title = year + quarter + meet
            }else{
                title = year + month + '月' + meet
            }
            if(!isnum){
                title=''
            }
            this.setState({
                title:title
            })
        //    console.log(typeof(isnum))    
        }   
    }

    sendThree = (sys) =>{
        let writes = []
        axios.get(option.api.AllPm,{
            params:{
                orgId:users.orgId,
                userId:users.userId,
                states:0,
                pmTypeId:sys,
                page:1,
                num:30,
                year:(new Date()).getFullYear()
            }
        }).then((data)=>{ 
            let datas = data.data.data;
            console.log(data)
        //    console.log(datas)
            for(let i=0 ; i<datas.length; i++){
                // let date = datas[i].createDate
                // let Y = date.getFullYear() + '年';
                // let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
                // let D = date.getDate() + '日';
                // let h = date.getHours() + ':';
                // let m = date.getMinutes() + ':';
                // let s = date.getSeconds();
                writes.push({
                    key: datas[i].pmId,
                    num: datas[i].pmId,
                    meetingname: datas[i].name,
                    org: datas[i].toOrgName,
                    date:moment(datas[i].bgnDate).format('YYYY年MM月DD日'),
                    bgnDate:datas[i].bgnDate,
                    sysId:datas[i].pmTypeId,
                })
            }
            this.setState({
                dataSource :writes, 
                total : data.data.size,
                datas : datas,
            })
            // this.state.dataSource =  writes;   
            // this.state.total=data.data.size
            // console.log(this.state.dataSource)
        })
    }
    //?states=0&pmTypeId=&page=1&num=30 
    componentDidMount = () => {
        this.sendThree(311)
        let a =JSON.parse(localStorage.getItem('user')) ; 
        this.state.orgId = a.orgId
        this.state.userId = a.userId;
    //    this.sendThree()
    //    sendThree
        //ThreePm组织树管理
       
        //console.log(ThreePm+'这是ThreePm')    
        this.setState({
            ThreePm:ThreePms,
            user:a,
        })
        axios.get(option.api.orgTree+'/'+this.state.orgId).then((data)=>{
            let orgTree = data.data.data
            //console.log(orgTree)
            this.setState({
                orgTree:orgTree
            })
            //console.log(user.children[0].label)
        })
    }


    //渲染三会一课内容
    drawThree = ()=>{
        let arr = [];
        let three = this.state.ThreePm
        for(let i =0 ; i< three.length; i++){
            let j = 100+i 
            arr.push(<Option   key={j} value={three[i].sysData} style={{textAlign:"center"}}>{three[i].sysData}</Option>)
        } 
        return arr
    }

    disabledDate=(current)=>{
    //    console.log(current)
        return current && current > moment().endOf('day');
    }


    render() {
        const tProps = {
            treeData:this.state.orgTree,
            value: this.state.value,
            onChange: this.onChangevalue,
            treeCheckable: true,
            showCheckedStrategy: SHOW_ALL,
            searchPlaceholder: '请选择',
            style: {
              width: 300,
            },
        };

        return (
            <div>
                <Button onClick={()=>this.showModal()}>新增会议发布</Button>
                <Modal title='三会一课新增发布'
                    destroyOnClose
                    width='750px'
                    visible={this.state.visible}
                    onOk = {this.handleOk}
                    onCancel = {this.handleCancel}
                    style={{textAlign:"center"}}>
                    <h2>任务名称：{this.state.title}</h2>
                    任务类型：<Select  style = {{width:300,textAlign:"center"}} 
                        onChange={this.gainValue} > 
                        
                       { this.drawThree() }
                    </Select> <br/> <br/>
                    任务年度：
                    <Select  style = {{width:300}}>
                        { op() }
                    </Select> <br/><br/>
                    任务时间：
                    <DatePicker 
                        style={{width:300}} 
                        onChange={this.gainValue} 
                        ref='myDate'
                        disabledDate={this.disabledDate}
                    >    
                    </DatePicker><br/> <br/>
                    选择部门: <TreeSelect {...tProps}/>          
                </Modal>
                <WriteTable 
                    dfvalue = {this.state.dfvalue}
                    dataSource={this.state.dataSource}
                    total = {this.state.total}
                    orgId={this.state.orgId} 
                    userId={this.state.userId} 
                    states={0} 
                    gainValue={this.gainValue}
                    sendThree={this.sendThree}
                    ThreePm={this.state.ThreePm}
                    showModal={this.showModal}
                /> 
            </div>
        )
    }
}
