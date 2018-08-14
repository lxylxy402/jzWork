import React, { Component } from '../../../node_modules/_react@16.4.1@react';

class Index extends Component {
    state = {  }
    componentDidMount() {
        this.endLoading()
    }
    endLoading = () => {
        let loading = document.getElementsByClassName("loader")[0]
        document.getElementsByTagName("body")[0].removeChild(loading)
    }
    render() {
        return (
            <div>404</div>
        );
    }
}

export default Index;