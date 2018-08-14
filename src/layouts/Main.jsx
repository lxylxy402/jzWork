import React from '../../node_modules/_react@16.4.1@react'
import PropTypes from '../../node_modules/_prop-types@15.6.2@prop-types';
import { withRouter } from '../../node_modules/_react-router@4.3.1@react-router'
import { HashRouter as Router, Route, Switch, Link } from '../../node_modules/_react-router-dom@4.3.1@react-router-dom';
import { RouterConfig } from '../router'
import { Layout, Menu, Breadcrumb, Icon, Button, Switch as Switcher } from '../../node_modules/_antd@3.7.3@antd'
import jss from '../../node_modules/_jss@9.8.7@jss'
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout
import config from "../option/config"
import LogoutSvg from 'Assets/img/logout.svg'
import redHead from 'Assets/img/red1.jpg'
import QueueAnim from '../../node_modules/_rc-queue-anim@1.6.5@rc-queue-anim/lib'
//过滤菜单


import axios from '../../node_modules/_axios@0.18.0@axios';
import option from 'ZbtOption/config'






const filterUrl = []
let breadcrumbNameMap = {}
let keylist = [];
let selectedKey = [];
function initMenu(list, index) {
    let menu = []   //定义一个空数组
    list.map((v, i) => {
        keylist.push({   //push进去三个参数
            url: v.url,
            key: index + "" + i,
            parent: index
        })
        if (!v.isParent) {   //isParent  is bool如果为false
            menu.push(
                <Menu.Item key={index + "" + i}>  {/*菜单项*/}
                    <Link to={v.url}>
                        <Icon type={v.icon} />
                        <span>{v.name}</span>
                    </Link>
                </Menu.Item>
            )
        } else {
            menu.push(/*子菜单项*/
                <SubMenu
                    key={index + "" + i}
                    title={<span><Icon type={v.icon} /><span>{v.name}</span></span>}
                >
                    {initMenu(v.children, index + "" + i)}
                </SubMenu>
            )
        }

    })
    return menu;
}
function initSelected(params) {
    let key = []
    params.map((v, i) => {
        if (v.url == location.pathname) key.push(v.key)
        //判断v.url是否等于本地的pathname，如果是，将key存入用于初始化列表
    })
    return key;
}
let parent = []
function initOpenSelected(child) {
    parent.push(child + "")
    keylist.map((v, i) => {
        if (v.key == child && child !== 0) {
            initOpenSelected(v.parent)
        }
    })
}
//初始化菜单 编辑菜单栏
let menu = initMenu(config.menu, 0)
//初始化列表
let selected = initSelected(keylist)
//初始化被选中的键
initOpenSelected(selected[0])
let rootSubmenuKeys = (() => {
    let rootSubmenuKey = []
    keylist.map((v, i) => {
        rootSubmenuKey.push(v.key)
    })
    return rootSubmenuKey
})()

let animation = { left: '20%', yoyo: true, repeat: -1, duration: 1000 }

class Main extends React.Component {

    state = {
        collapsed: localStorage.getItem("collapsed") == "true" ? true : false,
        name: "",
        avatar: "",
        openKeys: parent,
        theme: localStorage.getItem("theme") || "dark"
        //theme主题，更改主题用  如果本地没有theme主题，那么选择dark
        //localStorage.getItem从本地获取数据
        //sessionStorage（临时存储） ：为每一个数据源维持一个存储区域，在浏览器打开期间存在，包括页面重新加载
        //localStorage（长期存储） ：与 sessionStorage 一样，但是浏览器关闭后，数据依然会一直存在
    };
    //切换图标获，collapsed值取反，并保存到浏览器
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            openKeys: []
        }, () => {
            localStorage.setItem("collapsed", this.state.collapsed ? "true" : "false")
            //保存数据到本地
        });
    }
    onOpenChange = (openKeys) => {
        console.log('this.state.openKeys:'+ this.state.openKeys)
        const latestOpenKey = openKeys.find((key) => this.state.openKeys.indexOf(key) === -1);
        console.log('latestOpenKey:'+latestOpenKey) 
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }
    componentDidMount = () => {
        //存储用户信息
        axios.get(option.api.Login,{
            params:{userNo:18695729796}
        }).then((data)=>{
            localStorage.setItem("user",JSON.stringify(data.data.data)); 
        //    console.log(data.data.data)
        })
        //获取三会一课内容
        axios.get(option.api.ThreePm).then((data)=>{
            localStorage.setItem("ThreePm",JSON.stringify(data.data.data)); 
        })
        localStorage.setItem("DloginUserList",JSON.stringify(1)); 
        setTimeout(() => {
            this.endLoading()
        }, 1000);
        // loading.parentNode.removeNode(loading)
    }
    endLoading = () => {
        let loading = document.getElementsByClassName("loader")[0]
        document.getElementsByTagName("body")[0].removeChild(loading)
    }
    componentWillMount() {
        this.initBreadcrumb([...config.menu, ...config.hiddenMenu]);
    }
    initBreadcrumb(list) {
        list.map((v, i) => {
            breadcrumbNameMap = {
                ...breadcrumbNameMap,
                [v.url]: v.name
            }
            if (v.isParent) {
                filterUrl.push(v.url)
                this.initBreadcrumb(v.children)
            }
        })
    }

     //清除localStorage，退出登陆
    logout() {
        localStorage.clear()
        location.href = "/login"
    }
    //切换主题，亮暗 checked指的是switch中是否选中，bool值
    themeChange = (checked) => {    
        this.setState({
            theme: checked ? "dark" : "light"
        }, () => {
            localStorage.setItem("theme", this.state.theme)
            //保存主题到本地数据 console.log(localStorage.getItem("theme"))           
        })
    }
   
    render() {
        const { location } = this.props;
        //console.log(location) {pathname: "/users/sys", search: "", hash: "", state: undefined, key: "cy4bl4"}
        // let a = location.pathname.split('/');
        // console.log(a) ["", "option", "msg"]
        const pathSnippets = location.pathname.split('/').filter(i => i);
        // console.log(pathSnippets)  ["users", "app"]
        //把split按  / 分割   filter将空的去除  /users/sys  中有一个空
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    {filterUrl.includes(url) ?
                        <span>
                            {breadcrumbNameMap[url]}
                        </span>
                        :
                        <Link to={url}>
                            {breadcrumbNameMap[url]}
                        </Link>
                    }

                </Breadcrumb.Item>
            );
        });
        const breadcrumbItems = [(
            <Breadcrumb.Item key="home">
                <Link to="/">主页</Link>
            </Breadcrumb.Item>
        )].concat(extraBreadcrumbItems);
        const { classes } = jss.createStyleSheet(styles).attach()
        const component = RouterConfig.map(item => {
            if (location.pathname === item.path) {
                return item.component;
            }
        }).filter(item => item)[0];
        return (
            <Layout>
                <Header className="header" style={{ position: 'fixed', width: '100%', zIndex: 1 }}>
                    <div style={styles.logo}>{config.title}</div>
                    {/*config.title后台测试*/}
                    <Button type="primary" onClick={this.toggle} >
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                        {/*this.state.collapsed is bool 左右切换的图标*/}
                    </Button>
                    <div style={styles.nav}>
                        <div className={classes.navItem} >
                            <img src={LogoutSvg} onClick={this.logout} style={{ width: 32, height: 32 }} alt="" />
                            {/*退出登陆按钮*/}
                        </div>
                        <div className={classes.navItem} >
                            <img src={this.state.avatar || redHead}
                             style={{ width: 48, height: 48, borderRadius: 24 }} alt="" />
                             {/*头像设置*/}
                        </div>
                        <div className={classes.navItem} >
                            <span style={{ color: "white" }}>{this.state.name || "就是个名字"}</span>
                            {/*用户名*/}
                        </div>
                    </div>
                </Header>
                <Sider style={{ position: "fixed", left: 0, paddingTop: 64, overflow: 'auto', height: '100vh',
                 left: 0, zIndex: 0 }}
                    width={220} collapsed={this.state.collapsed} >
                    <Menu
                        style={{ height: "100%" }} theme={this.state.theme}
                        // inlineCollapsed={this.state.collapsed}
                        // defaultOpenKeys={parent}  openKeys当前展开的 SubMenu 菜单项 key 数组
                        //defaultSelectedKeys初始选中的菜单项 key 数组
                        openKeys={this.state.openKeys} onOpenChange={this.onOpenChange}
                        defaultSelectedKeys={selected} mode="inline"
                    >
                        {menu}
                    </Menu>
                    <div style={{ ...styles.switchButton, width: this.state.collapsed ? 100 : 220 }}>
                        <span style={{
                            display: this.state.collapsed ? "none" : "",
                            color: this.state.theme == "dark" ? '#fff' : 'rgb(175, 175, 175)'
                        }}>选择主题</span>
                        <Switcher checkedChildren="黑色" unCheckedChildren="明亮" style={{left: 15}}
                            defaultChecked={this.state.theme == "dark" ? true : false} onChange={this.themeChange} />
                        {/*defaultChecked初选是否选中，checkedChildren选中时的内容*/}
                    </div>
                </Sider>
                <Layout  style={{marginLeft: this.state.collapsed ? 80 : 200, marginTop: 64, paddingRight: 15, transition: "margin-left 0.2s" }}>
                    <Layout style={{ paddingLeft: this.state.collapsed ? 10 : 26 }}>
                        <Breadcrumb style={{ padding: 5 }}>
                            {breadcrumbItems}
                        </Breadcrumb>
                        <Content style={{  background: '#fff', padding: 30, margin: 5, minHeight: 280, overflow: 'initial' }}>
                        {/*overflow: 'initial'规定应该从父元素继承 overflow 属性的值。溢出隐藏*/}
                            <QueueAnim type={['right', 'left']} className="router-wrap">
                                <Route
                                    style={{ position: "static" }}
                                //    location={location}
                                    key={location.pathname}
                                    path="/:url"
                                    component={component}
                                />
                            </QueueAnim>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            {config.support}
                            {/*support: "技术支持 居正软件@2018",*/}
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

const styles = {
    logo: {
        //minWidth: 120,
        height: 31,
        lineHeight: 1.5,
        color: "white",
        fontSize: "1.5em",
        margin: '16px 28px 16px 0',
        float: 'left'
    },
    switchButton: {
        position: "fixed",
        bottom: 0,
        padding: 8,
        textAlign: "center"
    },
    nav: {
        position: "fixed",   //绝对定位
        right: 0,
        display: "inline",
    },
    navItem: {
        textAlign: "center",
        float: "right",
        //minWidth: 64,
        height: 64,
        '&:hover': {
            background: "rgb(17, 206, 180) !important"
        }
    }
}

export default withRouter(Main)