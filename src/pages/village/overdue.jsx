import React, { Component } from '../../../node_modules/_react@16.4.1@react'
import Overdues from '../overdues'

export default class VillageOverdue extends Component {

    // componentDidMount = () =>{
    //     this.refs.partyOverdue.achieve(32)
    // }
    render() {
        return (
            <div>
                <Overdues /*ref='partyOverdue'*/ ppmtypeid='33'/>    
            </div>
        )
    }
}
