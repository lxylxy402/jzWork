import React, { Component } from '../../../node_modules/_react@16.4.1@react'
import axios from '../../../node_modules/_axios@0.18.0@axios'
import option from 'ZbtOption/config';
import {Table,Divider,Modal,Radio,Icon,Form,Input,Button,Row,Col,Upload } from '../../../node_modules/_antd@3.7.3@antd'

import Allsee from '../see';


import  moment from '../../../node_modules/_moment@2.22.2@moment';
const FormItem = Form.Item;

let user = JSON.parse(localStorage.getItem('user'))
const { TextArea } = Input;
let arr =[]    
let allImage = []  
let allMessage=''



export default Form.create() (class ThreeOverdue extends Component {
    state ={
        total:0,
        visible:false,
        visible2:false,
        dataSource:[],
        dataSource2:[],
        rptId:null,
        pmId:null,
        devalue:null,
        num:1,
        page:1,
    }
    //获取数据
    achieve = () =>{
        axios.get(option.api.wait,{
            params:{
                orgId:user.orgId,
                isporg:0 ,  //0表示下属机构需要上报，1表示自己需要上报
                ppmtypeid: 31 ,  //31三会一课，32党务公开，33村务公开
                num:10,
                page:this.state.page,
                merge_Id:null,
            }
        }).then((data)=>{
            let datas = data.data.data
            let listf =[];
            for(let i=0; i<datas.length; i++){
                listf.push({
                    num:this.state.num+i,
                    key:datas[i].rptId,
                    meetingname:datas[i].rptName,
                    date:moment(datas[i].bgnDate).format('YYYY年MM月DD日'),
                    enddate:moment(datas[i].rptEndDate).format('YYYY年MM月DD日'),
                    org:datas[i].rptOrgName,
                    pmId:datas[i].pmId,
                    rptId:datas[i].rptId,
                    isState:datas[i].state,  //表示状态，1为上传，0为未上传
                    mergeId:datas[i].mergeId,
                })
            }
            console.log(data)
            console.log('这是当前上报的id')
            this.setState({
                total:data.data.size,
                dataSource:listf
            })
        })
    }

    componentDidMount=()=>{
        this.achieve()  
    }

    //撤回
    withdraw=(pmId)=>{
        if(confirm('是否撤回')){
            axios.get(option.api.withdraw+pmId).then((data)=>{
                    if(data.data.code==1000){
                        alert('撤回成功')
                        this.achieve()
                    }else{
                        alert('撤回失败，已有组织回复')
                    }
                }
            )
        }
    }
    showModal = (rptId,isState) => {
        console.log('这是rtpId='+rptId)
        console.log('这是isState='+isState)
        this.setState({
            rptId:rptId,
            isState:isState,
            visible: true,
        })
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }
    
    handleCancel = (e) => {
        allImage = [],
        allMessage = [],
        this.setState({
            visible: false,
            visible2: false,
        });      
    }

    power = (text,record)=>{
        if(user.roleId==1){
            return (
                <div> 
                    {record.isState==0 ?
                        ( 
                            <span>
                                <a href="javascript:;" onClick={()=>{this.withdraw(record.pmId)}} >撤回</a>
                            </span>
                        ):( 
                            <span>
                                <Icon type='check' style={{width:28,fontSize:21,color:'red'}}/> 
                            </span>
                        )
                    }                    
                    <Divider type="vertical" /> 
                    <span>
                        <a href="javascript:;" onClick={()=>this.isshowModal(record.rptId,record.pmId,record.mergeId)} >编辑</a>
                    </span>
                    <Divider type="vertical" />
                    
                    <span>
                        <a href="javascript:;" onClick={()=>this.isshowModal(record.rptId,record.pmId)} >上传</a>
                    </span>                 
                </div>
            )
        }
        if(user.roleId==2){
            return ( 
                <div> 
                    {record.isState==0 ?
                        ( 
                            <span>
                                <a href="javascript:;" onClick={()=>{this.withdraw(record.pmId)}} >撤回</a>
                            </span>
                        ):( 
                            <span>
                                <Icon type='check' style={{width:28,fontSize:21,color:'red'}}/> 
                            </span>
                        )
                    }                    
                    <Divider type="vertical" /> 
                    <span>
                        <a href="javascript:;" onClick={()=>this.showModal(record.rptId,record.isState)} >查看</a>
                    </span>                
                </div>
            )   
        }
        if(user.roleId==3){
            return (
                <div>
                    {record.isState==0 ?
                    <span>
                        <a href="javascript:;" onClick={()=>this.isshowModal(record.rptId,record.pmId,record.mergeId)} >编辑</a>
                    </span>
                    : <Icon type='check' style={{width:28,fontSize:21,color:'red'}}/> 
                    }
                    <Divider type="vertical" /> 
                    <span>
                        <a href="javascript:;" onClick={()=>this.showModal(record.rptId,record.pmId)} >查看</a>
                    </span> 
                </div>  
            )
        }
    }

    //上传文件
    uploadName =(e,b)=>{
        if(e.file.status=='done'){
            allImage += b +','+e.file.response.data[1]+','+1+'|'     
            console.log('这是上传的文件') 
            console.log(e)
        }
        if(e.file.status=="removed"){
            // console.log('进入remoed移除阶段')
            // console.log(allImage)
            // console.log('输出了allImage')
            // console.log('e开始')
            // console.log(e)
            // console.log('输出了e')
            console.log('这是进入删除的阶段')
            console.log(e)
            let magId 
            let all = allImage.toString().split('|')
            let length = all.length
            if(e.file.uid>0){
                // console.log('进入了编辑阶段判断')
                // console.log(e.file.uid)
                magId = eval("\/"+e.file.uid+"\/")
            }else{
                if(e.file.response.data.length>0){
                    // console.log('进入上传时判断')
                    magId = eval("\/" + e.file.response.data[1] + "\/")
                }   
            }
            for(let i =0; i<length; i++){
                if(magId.test(all[i])){
                    // console.log('进入正则判断')
                    all.splice(i,1)
                }
            }
            all = all.join('|')
            allImage  = all  
            console.log('输出了真正的AllImage')
            console.log(allImage)
        }
    }
    
    uploadOk = (tag) => {
        this.props.form.validateFields((err, values)=> {
            for(let i=0;i<arr.length;i++){ 
                if(values[arr[i].abstract] != null){
                    allMessage += arr[i].key+','+values[arr[i].abstract]+',' +2 +'|'
                }  
            }
        });
        axios.post(option.api.saveFile,{
            rptId:this.state.rptId,
            tag:tag,
            pmId:this.state.pmId,
            userId:user.userId,
            allImage:allImage,
            allMessage:allMessage,
            orgId:user.oleId,
            merge_id:this.state.merge_Id
        }).then((data)=>{
            console.log(data)
            console.log('这是返回给后台的新数据如下')
            console.log(allMessage)
            console.log(allImage)
            allImage =[]
            allMessage = []
            console.log('变为空')
            console.log(allMessage)
            console.log(allImage)
        })
    }
    
    //已经上报的内容详情查看
    isshowModal = (rptId,pmId,mergeId) =>{ 
        arr = []
        allImage = []
        axios.get(option.api.iswait+rptId,{
            params:{
                pSysId:41,
            }
        }).then((data)=>{
            let datas = data.data.data
            for(let j=0;j<datas.length;j++){
                arr.push({
                    abstract:datas[j].sysData,
                    content:datas[j].fileMap.toString(),
                    key:datas[j].sysId,
                    list:datas[j].fileMap
                })
            } 
            //我能怎么办啊，不懂promise，没时间研究，等我懂了，回来报错，回调，回调个屁屁
            axios.get(option.api.iswait+rptId,{
                params:{
                    pSysId:42,
                }
            }).then((data)=>{
                let datas = data.data.data
                for(let j=0;j<datas.length;j++){
                    arr.push({
                        abstract:datas[j].sysData,
                        content:datas[j].fileMap.toString(),
                        key:datas[j].sysId,
                        list:datas[j].fileMap
                    })
                } 
                axios.get(option.api.iswait+rptId,{
                    params:{
                        pSysId:43,
                    }
                }).then((data)=>{
                    let datas = data.data.data
                    for(let j=0;j<datas.length;j++){
                        arr.push({
                            abstract:datas[j].sysData,
                            content:datas[j].fileMap.toString(),
                            key:datas[j].sysId,
                            list:datas[j].fileMap
                        })
                    }
                    this.setState({
                        dataSource2:arr,
                        visible2: true,
                        rptId:rptId,
                        pmId:pmId,
                        merge_Id:mergeId
                    }) 
                    // console.log('这是获得新的arr内容o新返回的内容哦') 
                     console.log(arr)
                     console.log(allImage) 
                    // console.log('这是形参')
                    // console.log(mergeId)
                    // console.log('这是mergeid')   
                    // console.log(this.state.merge_Id)         
                })     
            })      
        })  
    }
    
    showTotal =(e,f)=>{    
        this.state.num = f[0]
    //    
        console.log(e)
        console.log('这里也有一个f')
        console.log(f)
    }
    changeTotal = (e,f)=>{
        this.state.page = e
        this.achieve()  
        // console.log('这是页码的改变')
        // console.log(e)
        // console.log('这是fnum哦')
        // console.log(f)
    }

    render() {
        const columns = 
        [{
                title: '序号',
                dataIndex: 'num',
                key: 'num',
            }, {
                title: '会议名称',
                dataIndex: 'meetingname',
                key: 'meetingname',
            }, {
                title: '创建日期',
                dataIndex: 'date',
                key: 'date',
            },{
                title: '截止日期',
                dataIndex: 'enddate',
                key: 'enddate',
            },{
                title: '部门',
                dataIndex: 'org',
                key: 'org',
            },{
                title: '合并编号',
                dataIndex: 'mergeId',
                key: 'mergeId',
            },{
                title:'操作',
                dataIndex:'org',
                key:'operate',
                render: (text, record) => {
                    return(
                            this.power(text,record)   
                    )
                }
        }]
        const { getFieldDecorator } = this.props.form;
        
        const uploadFile =() =>{
            let formlist =[]
            for(let i=0;i<arr.length;i++){
                var  picturlist =[]
                this.state.devalue = ''
                arr[i].list.map((a,b)=>{
                    if(a.annexType==1){
                        allImage += a.annexTypeId + ','+a.annexId +','+1+ '|'
                        picturlist.push({
                            url: `${option.api.downLoadFile}?fileName=${a.annexName}`,
                            uid: a.annexId,
                            filename: a.name
                        })
                    }else{
                        this.state.devalue = a.annexName
                    }
                })
                let props1 = {
                    action: option.api.uploadFile,
                    listType: 'picture-card',
                    defaultFileList: [...picturlist],
                };
                formlist.push(     
                    <Row key={i+1}>
                        <Col span={8}>
                            <FormItem label={arr[i].abstract} >
                                {getFieldDecorator(arr[i].abstract, {
                                 initialValue:this.state.devalue,
                                //rules: [{ required: true, message: 'Please input the title of collection!' }],
                                })(
                                    <TextArea style={{width:300}}  />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={16}>            
                            <Upload {...props1} onChange={(e)=>this.uploadName(e,arr[i].key)} >
                                <Icon type="upload" /> 
                            </Upload>
                        </Col>
                    </Row>                
                )
            }
            return formlist
        }
        const Pagination ={
            total:this.state.total,
            pagesize:10,
            defaultCurrent:1,
            showTotal:this.showTotal,
            onChange:this.changeTotal,
        }
       
      
        return ( 
            <div>
                <Table 
                    pagination ={Pagination}
                    dataSource={this.state.dataSource} 
                    columns={columns}
                    style={{align:'center'}}
                ></Table>
                <Modal
                    destroyOnClose
                    title="编辑详情"
                    cancelText=''
                    footer={null}
                    visible={this.state.visible2}
                    onCancel={this.handleCancel}
                    width = {800} 
                >
                    <Form layout="vertical"> 
                        <div>
                            {uploadFile()}
                        </div> 
                    </Form>
                    <div style={{marginBottom:20,marginRight:50 }}>
                        <Button type="primary"  style={{float:'right'}} onClick={()=>this.uploadOk(1)}>保存并发送</Button>
                         <div style={{float:'right'}}>&nbsp;&nbsp;</div>
                        <Button type="primary" style={{float:'right'}} onClick={()=>this.uploadOk(0)}>保存 </Button> 
                        <div style={{float:'right'}}>&nbsp;&nbsp;</div> 
                    </div>
                </Modal>
                <Modal
                    title="详细内容"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width = {800}
                >
                    <Allsee ipd={this.state.rptId} sta={this.state.isState}/>  
                </Modal>
            </div>
        )
        
    }
   
})