import React, { Component } from 'react'
import axios from 'axios';
import option from "ZbtOption/config"


class Threemeeting extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        axios.get(option.api.demoGet,
            //post直接放置一个对象
            {params:{
                examId:1,
                examUserId:1,
                state:1
            }}).then((data)=>{
                console.log('这是get请求')
                console.log(data)
            })
    }
    render() {
        return (
            <div>
                123
            </div>  
        )
    }
}


export default Threemeeting