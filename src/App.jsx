import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    Route,
    HashRouter,
    Link
} from 'react-router-dom'
import createHistory from "history/createBrowserHistory"
import jss from 'jss'
import preset from 'jss-preset-default'
const history = createHistory()
import 'antd/dist/antd.css'; //引入样式
import 'Assets/css/style.css'
import { RootRouter} from "./router"
import { Provider } from 'react-redux'
import store from "Redux/store"
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
process.env.NODE_ENV == 'development' && require('Mock/demo.js');

//初始化jss配置
jss.setup(preset())

function confirWeb(){
    return true;
}

const App = () => {
    return (
        <Provider store={store}>
            <LocaleProvider locale={zh_CN}>
                <RootRouter history={history} />
            </LocaleProvider>
        </Provider>
    );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));