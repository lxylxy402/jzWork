import React, { Component } from '../../node_modules/_react@16.4.1@react'
import axios from '../../node_modules/_axios@0.18.0@axios'
import option from 'ZbtOption/config';
import {Table,Upload} from '../../node_modules/_antd@3.7.3@antd';


export default class Allsee extends Component {
    constructor(props) {
        super(props)
    }
    state ={
        dataSource:[]
    }
    componentWillReceiveProps  =()=>{
        //console.log('老子被调用了')
        this.seewait(this.props.ipd,this.props.sta)
        console.log('see查看组件被调用')
    }
    //this.seewait(rptId,isState)   
    componentDidMount =()=>{
        // console.log('this.props.ipd')
        // console.log(this.props.ipd)
        // console.log('this.props.ipd,this.state.isState')
        // console.log(this.props.sta)
        this.seewait(this.props.ipd,this.props.sta)
    } 
    seewait = (rptId,isState)=>{ 
        // let abc=[]

        //isState是否已经上传0表示未上传，1表示已上传
        let d =[]
        //axios1
        axios.get(isState==0?option.api.iswait+rptId:option.api.isok+rptId,{
            params:{
                pSysId:41,
            }
        }).then((data)=>{
            let datas = data.data.data
            d.push(...datas)
            // for(let j=0;j<datas.length;j++){
            //     abc.push({
            //         abstract:datas[j].sysData,
            //         content:datas[j].fileMap.toString(),
            //         key:datas[j].sysId,
            //     })
            // }
            //axios2
            axios.get(isState==0?option.api.iswait+rptId:option.api.isok+rptId,{
                params:{
                    pSysId:42,
                }
            }).then((data)=>{
                let datas = data.data.data
                d.push(...datas)
                // for(let j=0;j<datas.length;j++){
                //     abc.push({
                //         abstract:datas[j].sysData,
                //         content:datas[j].fileMap.toString(),
                //         key:datas[j].sysId,
                //     })
                // }
                //axios3
                axios.get(isState==0?option.api.iswait+rptId:option.api.isok+rptId,{
                    params:{
                        pSysId:43,
                    }
                }).then((data)=>{
                    let datas = data.data.data
                    d.push(...datas)
                    // for(let j=0;j<datas.length;j++){
                    //     abc.push({
                    //         abstract:datas[j].sysData,
                    //         content:datas[j].fileMap,
                    //         picture:datas[j].fileMap,
                    //         key:datas[j].sysId,
                    //     })                
                    // }
                    console.log(d)
                    console.log('这是d，这才是所有的')
                    let datasource =[]
                    d.map((v,i)=>{
                        let text = null
                        let fileList = []
                        let url=''
                        if(v.fileMap.length != 0){
                            v.fileMap.map((f,j)=>{
                                if(f.annexType==2){
                                    text = f.annexName
                                }else{
                                    url=`${option.api.downLoadFile}?fileName=${f.annexName}`
                                    fileList.push({
                                        uid:f.annexId,
                                        name:f.name,
                                        url:`${option.api.downLoadFile}?fileName=${f.annexName}`,
                                        linkProps:{'download':`${option.api.downLoadFile}?fileName=${f.annexName}`}
                                    })
                                 }
                            })
                        }
                        datasource.push({
                            abstract:v.sysData,
                            key:v.sysId,
                            picture:url,
                            fileList:fileList,
                            content:text
                        })
                    })
                    this.setState({
                        dataSource:datasource
                    })
                }) 
            })
        })
    }
    render() {
        const columns = [
            {
                title:'摘要',
                dataIndex:'abstract',
                key:'abstract',
            },{
                title:'内容',
                dataIndex:'content',
                key:'content',
            },{
                title:'图片',
                dataIndex:'picture',
                key:'picture',
                render:(text, record) => {
                    // console.log(record.fileList)
                    if(record.fileList.length>0){
                        return(
                            <div>
                                {/* <img src={record.picture} alt="" style={{width:30}}/>{record.picture} */}
                                <Upload 
                                    // action='//jsonplaceholder.typicode.com/posts/'
                                    listType= 'picture-card'
                                    defaultFileList = {[...record.fileList]}
                                ></Upload>
                            </div>  
                        )
                    }  
                }
            }
        ]
        return (
            <div>
                <Table 
                    columns={columns} 
                    dataSource={this.state.dataSource} 
                >
                </Table>
            </div>
        )
    }
}
