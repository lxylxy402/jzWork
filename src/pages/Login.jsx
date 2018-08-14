import React, { Component } from '../../node_modules/_react@16.4.1@react';
import { Form, Icon, Input, Button, Checkbox, Card } from '../../node_modules/_antd@3.7.3@antd';
import QueueAnim from '../../node_modules/_rc-queue-anim@1.6.5@rc-queue-anim/lib';
const FormItem = Form.Item;

class index extends Component {

    state = {
        show: true,
        qdShow: false
    };
    onClickShow = () => {
        this.setState({
            show: !this.state.show,
        },()=>{
            this.setState({
                qdShow: !this.state.qdShow,
            });
            setTimeout(() => {
                this.initCode()
            }, 500);
        });
    }
    onClickQcShow = () => {
        this.setState({
            qdShow: !this.state.qdShow,
        },()=>{
            console.log(this.refs.wx_reg)
                this.setState({
                    show: !this.state.show,
                })
        });
    }
    componentDidMount() {
        this.endLoading()
    }
    initCode=()=>{
        window.WwLogin({
            "id": "wx_reg",
            "appid": "wwe47e69ebece6c92d",
            "agentid": "1000018",
            "redirect_uri": "http%3a%2f%2fwww.fzjuzheng.com%3a3000%2fcheckcode",
            "state": "",
            "href": "",
        });
    }
    endLoading = () => {
        let loading = document.getElementsByClassName("loader")[0]
        document.getElementsByTagName("body")[0].removeChild(loading)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{width:"100%",textAlign:"center"}}>
                <Card
                    type="inner"
                    title={<h3 style={{ width: "100%", marginBottom: 0, textAlign: "center" }}>登  录  窗  口</h3>}
                    style={{ top: document.body.clientHeight/2-200,...style.form}}
                >
                    <QueueAnim className="demo-content">
                        {this.state.show ?                     
                        <Form key="a" onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: '请输入用户名/手机/邮箱!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                                )}
                            </FormItem>
                            <FormItem style={{ marginBottom: 0 }}>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox style={style.loginFormChecked}>记住用户名</Checkbox>
                                )}
                                <a style={style.loginFormForgot} href="">忘记密码</a>
                                <Button style={style.loginFormButton} type="primary" htmlType="submit">
                                    登录
                                </Button>
                            </FormItem>
                            <a onClick={this.onClickShow}>使用企业微信登陆!</a>
                        </Form> : null}
                        {this.state.qdShow ?
                            <Form key='f' className="login-form">   
                                <div id="wx_reg" ref="wx_reg" style={{ height: 380, width: "100%" }}>

                                </div>
                                <a onClick={this.onClickQcShow}>使用账户密码登陆!</a>
                            </Form> : null}
                    </QueueAnim>
                </Card>
            </div>

           
        );
    }
};

const style = {
    form:{
        maxWidth:400,
        marginLeft:-200,
        left:"50%"
    },
    loginFormChecked:{
        float: "left"
    },
    loginFormForgot:{
        float: "right"
    },
    loginFormButton:{
        width: "100%"
    }
}

export default Form.create()(index)
