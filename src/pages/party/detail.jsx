import React, { Component } from 'react'
import axios from 'axios'
import option from 'ZbtOption/config'
import {Divider,Input,Upload, Icon, Modal,Row,Col,Button } from 'antd'

const { TextArea } = Input;
const user = JSON.parse(localStorage.getItem('user'))


export default class Detail extends Component {
    state ={
        Datas:[],
        fileList:null,
        RtdId:0,
        PmId:0,
    }
    componentDidMount =()=>{
        let e = this.props.history.location.state.pmdata
        let see = this.props.history.location.state.state
        console.log("接参",this.props.history.location.state.pmdata)
        axios.get(option.api.seeParty + e.rptId, {
            params: {
                pSysId: 44,   //44查看党务，45查看村务公开
                state: see,    //1查看未上报的，2查看已上报的
                t:false,    
            }
        }).then((data) => {
            let datas = data.data.data
            console.log(datas)
            this.setState({
                Datas:datas,
                t:true,
                RtdId:e.rptId,
                PmId:e.pmId,
                See:see,
            })
            // console.log(datas)
        })
    }
    // 返回页面
    Back = ()=>{
        axios.get(option.api.sendParty+this.state.RtdId).then((data)=>{
            if(data.data.code==1000){
                alert('发送成功')
                window.history.back(-1); 
            }
        })
        
    }

    // 图片
    onFileChange = (fileList,key)=>{
        console.log(fileList)
        let Allmag = ''

        if(fileList.fileList.length!=0){
            console.log('这是files')
            fileList.fileList.map((v,i)=>{
                if(v.hasOwnProperty('response')){
                    Allmag += key +','+v.response.data[1]+','+1+'|'
                }
                if(v.hasOwnProperty('url')){
                    console.log('进入判断')
                    Allmag += key +','+v.uid+','+1+'|'
                }
            })
        }
        console.log('进入图片判断了')
        console.log(Allmag)
        sessionStorage.setItem('img'+key,Allmag)
    }


    Cvalue =(e,key)=>{
        sessionStorage.setItem(key,e.target.value)
        console.log(key)
        console.log('这前面的是key值')
        console.log(e.target.value)
    }

    //单独保存文件
    Hold =(typeId)=>{
        let allImage =  sessionStorage.getItem('img'+typeId)
        let allMessage = typeId+','+ sessionStorage.getItem(typeId)+','+2+'|'


        axios.post(option.api.uploadParty,{
            rptId: this.state.RtdId,
            pmId: this.state.PmId,
            typeId: typeId,
            userId: user.userId,
            orgId: user.orgId,
            allImage:allImage,
            allMessage:allMessage,
        }).then((data)=>{
            console.log(data)
        })
    }


    // 渲染页面
    Face = (e)=>{
        let arr = []
        let handlePreview = (file) => {
            this.setState({
              previewImage: file.url || file.thumbUrl,
              previewVisible: true,
            });
        }
        let tire ={
            action: option.api.uploadFile,
            listType: 'picture-card',
            //defaultFileList: [...fileList],
        }
        let face = (cs)=>{
            let as = []
            cs.map((v,i)=>{
                if(v.children==null||v.children.length==0){
                    // console.log('这是v开始')
                    // console.log(v)
                    // console.log('这是v结束')
                    let def = v.fileMap
                    let defaultValue= '';
                    let picture =[]
                    let allImage = ''
                    //增加typeId，待会allImage好判断
                    let imgId= 0
                    if(def.length!=0){  
                        def.map((v,i)=>{
                            if( v.annexType==2 && v.annexName != "null" ){
                                sessionStorage.setItem(v.annexTypeId,v.annexName)
                                defaultValue=v.annexName
                            }else {
                                picture.push({
                                    url: `${option.api.downLoadFile}?fileName=${v.annexName}`,
                                    uid: v.annexId,
                                    filename: v.name
                                })
                                imgId = v.annexTypeId
                                allImage += v.annexTypeId+','+v.annexId+','+1+'|'
                            }
                        })
                        sessionStorage.setItem('img'+imgId,allImage)
                    }
                    let fileList = {
                        action: option.api.uploadFile,
                        listType: 'picture-card',
                        uid:1,
                        status:'done',
                        defaultFileList:[...picture],
                    }
                    as.push(
                        <div  key={v.key}>
                            <Row >
                                <h3 >{v.label}</h3>
                                <Col span={8}>
                                    <TextArea  defaultValue={defaultValue} style={{width:400}} onChange={(e)=>this.Cvalue(e,v.key)}/>
                                </Col>
                                <Col span={14} push={1}>
                                    <Upload
                                        // action={option.api.uploadFile}
                                        // listType="picture-card"
                                        onChange = {(e)=>this.onFileChange(e,v.key)}
                                        {...fileList}
                                        disabled = {  this.state.See == 2}
                                        >
                                        {
                                            this.state.See == 1 ? <Icon type="upload" /> : <p>当前为查看状态，不能上传</p>
                                        } 
                                        {/* {fileList.length >= 3 ? null : uploadButton} */}
                                    </Upload>
                                </Col> 
                            </Row>
                            {
                                this.state.See == 1 ? (<Button type="primary" onClick={()=>this.Hold(v.key)}>保存</Button>)
                                :
                                (<div></div>)  
                            }
                            
                        </div>
                    )
                }else{
                    let f = v.children
                    as.push(
                        <div key={v.key}>
                            <Divider>{v.label}</Divider>
                            {face(f)}
                        </div>
                    )
                    
                }
                
            })
            return as
        }
        if(e.length>0){
            // console.log(e)
            let v1 = e[0]
            let v2 = e[1]
            let v3 = e[2]
            arr.push(
                <div  key={v1.key}  className="red">
                     <Divider> {v1.label}</Divider>
                     {
                         face(v1.children)
                     }
                </div> 
            )
            arr.push(
                <div  key={v2.key}  className="red">
                     <Divider> {v2.label}</Divider>
                     {
                         face(v2.children)
                     }
                </div> 
            )
            // arr.push(
            //     <div  key={v2.key}>
            //          <Divider> {v2.label}</Divider>
            //         <Row>
            //             <h3>{v2.label}</h3>
            //             <Col span={8}>
            //                 <TextArea /*defaultValue={defaultValue} */ style={{ width: 400 }} onChange={(e) => this.Cvalue(e, v2.key)} />
            //             </Col>
            //             <Col span={14} push={1}>
            //                 <Upload
            //                     onChange={(e) => this.onFileChange(e, v2.key)}
            //                     {...tire}
            //                 >
            //                     <Icon type="upload" />
            //                     {/* {fileList.length >= 3 ? null : uploadButton} */}
            //                 </Upload>
            //             </Col> 
            //         </Row>
            //         <Button type="primary" onClick={()=>this.Hold(v2.key)}>保存</Button>  
            //     </div> 
            // )
            let face2 = (v3)=>{
                let defaultValue= '';
                let picture =[]
                let imgId=0
                let allImage = ''
                if(v3.fileMap.length!=0){  
                    v3.fileMap.map((v,i)=>{
                        if( v.annexType==2 && v.annexName != "null" ){
                            sessionStorage.setItem(v.annexTypeId,v.annexName)
                            defaultValue=v.annexName
                        }else {
                            picture.push({
                                url: `${option.api.downLoadFile}?fileName=${v.annexName}`,
                                uid: v.annexId,
                                filename: v.name
                            })
                            imgId = v.annexTypeId
                            allImage += v.annexTypeId+','+v.annexId+','+1+'|'
                        }
                    })
                    sessionStorage.setItem('img'+imgId,allImage)
                }
                let fileList = {
                    action: option.api.uploadFile,
                    listType: 'picture-card',
                    uid:1,
                    status:'done',
                    defaultFileList:[...picture],
                }
                arr.push(
                    <div  key={v3.key}>
                        <Divider> {v3.label}</Divider>
                        <Row>
                            <h3>{v3.label}</h3>
                            <Col span={8}>
                                <TextArea defaultValue={defaultValue}  style={{ width: 400 }} onChange={(e) => this.Cvalue(e, v3.key)} />
                            </Col>
                            <Col span={14} push={1}>
                                <Upload
                                    // action={option.api.uploadFile}
                                    // listType="picture-card"
                                    disabled = {  this.state.See == 2}
                                    onChange={(e) => this.onFileChange(e, v3.key)}
                                    {...fileList} 
                                >
                                    {
                                        this.state.See == 1 ? <Icon type="upload" /> : <p>当前为查看状态，不能上传</p>
                                    } 
                                    {/* {fileList.length >= 3 ? null : uploadButton} */}
                                </Upload>
                            </Col> 
                        </Row>
                        {
                            this.state.See == 1 ? (<Button type="primary" onClick={()=>this.Hold(v.key)}>保存</Button>)
                            :
                            (<div></div>)  
                        }
                        
                    </div> 
                )
            }
            //face2(v2)
            face2(v3)
        }
        return arr
    }
    render() {
        return (
            <div>
                {this.Face(this.state.Datas)}  
                <br/><br/>
                {
                    this.state.See == 1 ?
                <Button  onClick={this.Back} type="primary"  size="large">保存完成上报</Button>  
                : <div/>
                }
            </div>
            
        )
    }
}
