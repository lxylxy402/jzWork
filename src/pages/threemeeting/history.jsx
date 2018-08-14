import React, { Component } from '../../../node_modules/_react@16.4.1@react'
import { Select, Radio,Button } from '../../../node_modules/_antd@3.7.3@antd';
import Historys from '../historys'

let ThreePm = JSON.parse(localStorage.getItem('ThreePm'));

export default class ThreeHistroy extends Component {
    // componentDidMount =()=>{
    //     console.log(123)
    //     console.log(ThreePm)
    // //    console.log(user)
    // }
    componentDidMount=()=>{
        this.refs.childHistory.achieveHistory(311);
    }
    RadioList =()=>{
        let arr=[]
        for(let i=0; i<ThreePm.length; i++){
            arr.push(
            <Radio.Button 
                value={ThreePm[i].sysId} 
                key={ThreePm[i].sysId}
            >
            {ThreePm[i].sysData}</Radio.Button>)
        }
        console.log(arr)
        return arr;
    }
    Con =(e)=>{
        // console.log(e.target.value)  e.target.value=sysId
        this.refs.childHistory.achieveHistory(e.target.value);
    }
    render() {
        return (
            <div>
               <Radio.Group onChange={this.Con} defaultValue={ThreePm[0].sysId} buttonStyle="solid">
                    {/* <Radio.Button value="">所有</Radio.Button> */}
                    {this.RadioList()}
               </Radio.Group>
               
               {/* <Button onClick={()=>this.Con()}>点击</Button> */}
               <Historys ref="childHistory" />
            </div>
        )
    }
}
