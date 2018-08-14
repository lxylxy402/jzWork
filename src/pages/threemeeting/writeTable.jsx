import React, { Component } from '../../../node_modules/_react@16.4.1@react'
import {Table,Divider,Radio,Button } from '../../../node_modules/_antd@3.7.3@antd'
import axios from '../../../node_modules/_axios@0.18.0@axios';
import option from 'ZbtOption/config';
import moment from '../../../node_modules/_moment@2.22.2@moment';

let user = JSON.parse(localStorage.getItem('user'))
export default class WriteTable extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        dataSource:[],
        total:null,
        sys:null,
        defvalue:311,
    }
    componentWillReceiveProps =()=>{
        console.log('这里值发生改变啦')
        console.log(this.props.dfvalue)
        this.setState({
            defvalue:this.props.dfvalue
        })
    }
    //三会一课选择目录
    ThreeSelct =() =>{
        let arr = [];
        let ThreePm = this.props.ThreePm;
    //    console.log(ThreePm[1].sysId)
        for(let i =0; i < ThreePm.length; i++){
            arr.push(
                <Radio.Button value={ThreePm[i].sysId} key={ThreePm[i].sysId}>
                    {ThreePm[i].sysData}
                </Radio.Button>
            )
        }
    //    console.log(arr)
        return arr
    }
   
    onChange =(e='')=>{
        console.log(123312)
    //    console.log(e.target.value)
        console.log('这是e')
        console.log(e)
        this.setState({
            sys:e.target.value
        })
        this.props.sendThree(e.target.value)
    //    this.sendThree()
    }

   
    //发送给各部门
    sendThreemeeting =(pmId,sysId,record) =>{
        console.log(record)
        let time = new Date(moment(record.bgnDate).format('YYYY-MM')) 
        axios.get(option.api.sendThree+pmId+'/'+sysId+'/'+time).then(
            (data)=>{
                // console.log('发送请求成功')
                // console.log(data.data)
                if(data.data.code==1000){
                    alert('发送成功')
                    this.props.sendThree(this.state.sys)
                }
            }
        )
    }
    //删除
    deleteThreemeeting =(pmId)=>{
        axios.get(option.api.deleteThreemeeting+pmId,{
            params :{
                type:1
            }
        }).then((data)=>{
            console.log(this.state.sys)
            this.props.sendThree(this.state.sys)
            console.log(data.data)
        })
    }



    render() {
        let pagination ={
            total:this.props.total  //分页
        }
        //表头名
        const columns = [{
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
            title: '部门',
            dataIndex: 'org',
            key: 'org',
          },{
                title:'操作',
                dataIndex:'org',
                key:'operate',
                render: (text, record) => {
                    return(
                        <div> 
                        {
                            true ? 
                            (<span>
                                <a href="javascript:;" onClick={()=>this.sendThreemeeting(record.num,record.sysId,record)} >发送</a>
                                <Divider type="vertical" />
                                {/* <a href="javascript:;" onClick={()=>this.props.showModal(record)}>修改</a>
                                <Divider type="vertical" /> */}
                                <a href="javascript:;" className="ant-dropdown-link" onClick={()=>this.deleteThreemeeting(record.num)}>
                                删除 
                                </a>
                             </span>) 
                             :
                             <span>撤回</span>
                        }
                        </div>
                    )
                     
                }
            }
        ];
    //    let dataSource = this.props.sendThree()
        return (
            <div>
                <Radio.Group defaultValue={this.state.defvalue}   buttonStyle="solid" onChange={this.onChange}>
                    {/* <Radio.Button value="" >所有</Radio.Button> */}
                    {this.ThreeSelct()}
                </Radio.Group>
                 
                <Table      
                    columns={columns} 
                    dataSource={this.props.dataSource} 
                    pagination ={pagination}>
                </Table>
                {/* <Button onClick={()=>this.props.modifyThree(186)}>点击</Button>  */}
            </div>
        )
    }
}
