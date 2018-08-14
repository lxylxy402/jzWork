import React, { Component } from 'react'
import Historys from '../historys'

export default class PartyHistory extends Component {
    render() {
        return (
            <div>
                 <Historys ppmtypeid='341' divi="1" history ={this.props.history}/>
            </div>
        )
    }
}
