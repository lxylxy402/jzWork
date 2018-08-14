import React, { Component } from '../../node_modules/_react@16.4.1@react'
import { Row, Col, Card, Icon, Table, Divider } from '../../node_modules/_antd@3.7.3@antd';
import echarts from '../../node_modules/_echarts@4.1.0@echarts'
import { mouth, org,npc,npcc } from '../../mock/data'
const { Column, ColumnGroup } = Table;
import Tab from '../../component/tab'
import {get} from 'Tools/request'
import { connect } from '../../node_modules/_react-redux@5.0.7@react-redux'
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (variables) => {
            return addUser(variables)
        },
    }
}

class Main extends Component {
    
    componentDidMount() {
        let { addUser } = this.props;
        let monthCount = echarts.init(document.getElementById('monthCount'),"light");
        monthCount.setOption(mouth);
        let orgRank = echarts.init(document.getElementById('orgRank'),"light");
        orgRank.setOption(org);
        get('http://api.fzjzpm.com/test2',function(response){
            console.log(response.data)
        })
    }
    initMonthChart = () =>{

    }
    
    render() {
        const {viewCard,icon} = styles
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Row>
                            <Col span={12}>
                                <Tab 
                                    title="督查总数"
                                    count="100"
                                    background={{ background:"#11CEB4"}}
                                    icon={<Icon type="area-chart" style={icon} />}
                                />
                            </Col>
                            <Col span={12}>
                                <Tab
                                    title="已完成"
                                    count="100"
                                    icon={<Icon type="check-circle-o"  style={icon}/>}
                                    background={{ background: "#1178CE" }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Card
                                    style={viewCard}
                                    type="inner"
                                    title="月度统计"
                                >
                                    <div id="monthCount" style={{height:340,marginBottom:-40}}>123</div>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Card
                                    style={viewCard}
                                    type="inner"
                                    extra={<a href="#">详细</a>}
                                    title="人大督办件"
                                >
                                    <Table dataSource={npc}>
                                        <Column
                                            title="领衔代表"
                                            dataIndex="firstName"
                                            key="firstName"
                                        />
                                        <Column
                                            title="代表团名称"
                                            dataIndex="lastName"
                                            key="lastName"
                                        />
                                        <Column
                                            title="事由"
                                            dataIndex="name"
                                            key="name"
                                        />
                                    </Table>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={12}>
                                <Tab 
                                    title="未完成"
                                    icon={<Icon type="close-circle-o"  style={icon}/>}
                                    background={{ background: "#E5B212" }}
                                />
                            </Col>
                            <Col span={12}>
                                <Tab 
                                    title="逾期件"
                                    background={{ background: "#E54F12" }}
                                    icon={<Icon type="exclamation-circle-o"  style={icon}/>}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Card
                                    style={viewCard}
                                    className="view-card"
                                    type="inner"
                                    title="部门统计"
                                >
                                    <div id="orgRank" style={{ height: 300}}></div>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Card
                                    style={viewCard}
                                    type="inner"
                                    title="政协督办件"
                                    extra={<a href="#">详细</a>}
                                >
                                    <Table dataSource={npcc}>
                                        <Column
                                            title="提案委员（单位）"
                                            dataIndex="firstName"
                                            key="firstName"
                                        />
                                        <Column
                                            title="事                由"
                                            dataIndex="name"
                                            key="name"
                                        />
                                    </Table>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }

}

const styles = {
    viewCard:{
        margin: 10,
    },
    icon:{
        fontSize:80,
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)