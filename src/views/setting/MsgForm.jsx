import React from '../../../node_modules/_react@16.4.1@react'
import { Form, Input, Button, Radio } from '../../../node_modules/_antd@3.7.3@antd';
const FormItem = Form.Item;

export default class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            formLayout: 'horizontal',
        };
    }
    handleFormLayoutChange = (e) => {
        this.setState({ formLayout: e.target.value });
    }
    render() {
        const { formLayout } = this.state;

        return (
            <div style={{border:"1px solid #ebebeb",padding:10}}>
                <Form layout={"vertical"}>
                    <FormItem
                        label="通知频率"
                        
                    >
                        <Radio.Group defaultValue="horizontal" onChange={this.handleFormLayoutChange}>
                            <Radio.Button value="horizontal">每月</Radio.Button>
                            <Radio.Button value="vertical">每周</Radio.Button>
                            <Radio.Button value="inline">每天</Radio.Button>
                        </Radio.Group>
                    </FormItem>
                    <FormItem
                        label="催办频率"
                        
                    >
                        <Radio.Group defaultValue="horizontal" onChange={this.handleFormLayoutChange}>
                            <Radio.Button value="horizontal">每三天</Radio.Button>
                            <Radio.Button value="vertical">每两天</Radio.Button>
                            <Radio.Button value="inline">每一天</Radio.Button>
                        </Radio.Group>
                    </FormItem>
                    <FormItem
                        label="报警频率"
                        
                    >
                        <Radio.Group defaultValue="horizontal" onChange={this.handleFormLayoutChange}>
                            <Radio.Button value="horizontal">每天</Radio.Button>
                            <Radio.Button value="vertical">每隔12小时</Radio.Button>
                            <Radio.Button value="inline">每隔6小时</Radio.Button>
                        </Radio.Group>
                    </FormItem>
                    
                    <FormItem >
                        <Button type="primary">保存</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
