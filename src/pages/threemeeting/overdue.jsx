import React, { Component } from 'react'
import Overdues from '../overdues'

export default class ThreeOverdue extends Component {
    
    // componentDidMount = () =>{
    //     this.refs.partyOverdue.achieve(31)
    // }
    render() {
        return (
            <div>
                <Overdues  ppmtypeid='31'/>    
            </div>
        )
    }
}
