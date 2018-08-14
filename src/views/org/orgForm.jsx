import React from '../../../node_modules/_react@16.4.1@react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from '../../../node_modules/_antd@3.7.3@antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
    value: '福建',
    label: '福建',
    children: [{
        value: '福州',
        label: '福州',
        children: [{
            value: '连江',
            label: '连江',
        },{
            value: '长乐',
            label: '长乐',
        }],
    }],
}];

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
            );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="单位邮箱"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '这不是一个可用的邮箱!',
                        }, {
                            required: true, message: '请输入单位邮箱!',
                        }],
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            单位名称&nbsp;
                                <Tooltip title="请不要输入单位简称?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '输入你的单位名称!', whitespace: true }],
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="行政区划"
                >
                    {getFieldDecorator('residence', {
                        initialValue: ['福建', '福州', '连江'],
                        rules: [{ type: 'array', required: true, message: '请选择你的单位地址!' }],
                    })(
                        <Cascader options={residences} />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="详细地址"
                >
                    {getFieldDecorator('website', {
                        rules: [{ required: true, message: '请输入单位详细地址!' }],
                    })(
                        <AutoComplete
                            dataSource={websiteOptions}
                            onChange={this.handleWebsiteChange}
                            placeholder="website"
                        >
                            <Input />
                        </AutoComplete>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="单位电话号码"
                >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '请输入你单位的电话号码!' }],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>我已经阅读了<a href="">使用协议</a></Checkbox>
                        )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">确认更改</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(RegistrationForm);