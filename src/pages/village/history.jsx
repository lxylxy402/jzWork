import React, { Component } from 'react'
import Historys from '../historys'
export default class VillageHistory extends Component {
    render() {
        return (
            <div>
                 <Historys ppmtypeid='342' divi="1" history ={this.props.history}/>
            </div>
        )
    }
}
