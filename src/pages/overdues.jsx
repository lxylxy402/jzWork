import React, { Component } from '../../node_modules/_react@16.4.1@react'
import axios from '../../node_modules/_axios@0.18.0@axios'
import option from 'ZbtOption/config';
import {Table,Divider,Alert } from '../../node_modules/_antd@3.7.3@antd'
import  moment from '../../node_modules/_moment@2.22.2@moment';


let user = JSON.parse(localStorage.getItem('user'))

export default class overdue extends Component {
    constructor(props) {
        super(props)
    }
    state ={
        total:0,
        isporg:0,
        rptOrgName:'',
        page:1,
        range:10
    }
    //获取数据逾期未上报
    achieve = (ppmtypeid) =>{
        //console.log('执行申请')
        if(user.roleId==2){
            this.state.isporg = 0
        }else{
            this.state.isporg = 1
        }
        axios.get(option.api.overdue,{
            params:{
                orgId:user.orgId,
                isporg:this.state.isporg ,  //0表示下属机构需要上报，1表示自己需要上报
                ppmtypeid: ppmtypeid ,  //31三会一课，32党务公开，33村务公开
                num:10,
                page:this.state.page
            }
        }).then((data)=>{
            let datas = data.data.data
            let arr =[];
            let pages = this.state.page
            pages = pages > 1 ? (pages = (pages-1)*10)+1  : pages
            //console.log(pages)
            for(let i=0; i<datas.length; i++){
                arr.push({
                    num:pages+i,
                    key:datas[i].rptId,
                    meetingname:datas[i].rptName,
                    date:moment(datas[i].bgnDate).format('YYYY年MM月DD日'),
                    org:datas[i].rptOrgName,
                    pmId:datas[i].pmId,
                    rptOrgName:datas[i].rptOrgName,
                })
            }
           
            //console.log(datas[0].rptOrgName)
            // console.log(moment(datas[1].bgnDate, 'YYYY-MM-DD').valueOf())
            // console.log(moment(datas[1].bgnDate).format('YYYY年MM月DD日'))
        //    console.log(data)
            this.setState({
                total:data.data.size,
                dataSource:arr,
            })
            // console.log(data.data)
            // console.log(arr)
        })
    }

    componentDidMount=()=>{
        this.achieve(this.props.ppmtypeid)
    }


   
   onChange =(pages, ranges)=>{
        this.state.page = pages
        this.achieve(this.props.ppmtypeid)
        // console.log()
        // console.log(range)
   }

    render() {
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
            title:'逾期上报部门',
            dataIndex:'rptOrgName',
            key:'rptOrgName',
        },
        //  {
        //     title: '部门',
        //     dataIndex: 'org',
        //     key: 'org',
        //   },{
        //         title:'操作',
        //         dataIndex:'org',
        //         key:'operate',
        //         render: (text, record) => {
        //             return(
        //                 <div> 
        //                     <span>
        //                         <a href="javascript:;" onClick={()=>{this.withdraw(record.pmId)}} >撤回</a>
        //                     </span>                   
        //                 </div>
        //             )
        //         }
        //     }
        ]
        let pagination= {
            total: this.state.total,
            onChange: this.onChange,       
        }
        return (
           
            <div>
                <Table 
                    dataSource={this.state.dataSource} 
                    columns={columns}
                    pagination ={pagination }
                ></Table>
            </div>
        )
    }
}
