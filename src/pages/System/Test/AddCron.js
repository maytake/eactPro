import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input, Modal, Form, Select, Row, Col } from 'antd';

import styles from './AddSwitch.less';

const { TextArea } = Input;
const { Option } = Select;
const FormItem = Form.Item;


@Form.create()
class AddCron extends PureComponent {
  state = {};

  formLayout = {
    labelCol: { className: 'labelName' },
    wrapperCol: { span: 16 },
  };

  formLayout2 = {
    labelCol: { className: 'labelName' },
    wrapperCol: { span: 20 },
  };

  colLayout = {
    lg: 12,
    sm: 24,
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const { current = {} } = this.state;
    const { modalVisible, form, handleAdd, handleModalVisible } = this.props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        console.log(fieldsValue);
        if (err) return;
        form.resetFields();
        handleAdd(fieldsValue);
      });
    };

    const getModalContent = () => {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={24}>
            <Col {...this.colLayout}>
              <FormItem label="键名称" {...this.formLayout}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入键名称' }],
                  initialValue: current.name,
                })(<Input placeholder="请输入键名称" />)}
              </FormItem>
            </Col>
            <Col {...this.colLayout}>
              <FormItem label="键" {...this.formLayout}>
                {getFieldDecorator('keys', {
                  rules: [{ required: true, message: '请输入键' }],
                  initialValue: current.keys,
                })(<Input placeholder="请输入键" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col {...this.colLayout}>
              <FormItem label="值" {...this.formLayout}>
                {getFieldDecorator('value', {
                  rules: [{ required: true, message: '请输入值' }],
                  initialValue: current.value,
                })(<Input placeholder="请输入值" />)}
              </FormItem>
            </Col>
            <Col {...this.colLayout}>
              <FormItem label="状态" {...this.formLayout}>
                {getFieldDecorator('status', {
                  rules: [{ required: true, message: '请选择状态' }],
                  initialValue: current.status,
                })(
                  <Select placeholder="请选择状态">
                    <Option value="0">未启用</Option>
                    <Option value="1">已启用</Option>
                    <Option value="2">已停用</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>

            <FormItem label="类型" {...this.formLayout2}>
              {getFieldDecorator('type', {
                rules: [{ required: true, message: '请选择类型' }],
                initialValue: current.type,
              })(
                <Select placeholder="请选择类型">
                  <Option value="1">回调地址</Option>
                  <Option value="2">开关</Option>
                </Select>
              )}
            </FormItem>


          </Row>
          <Row gutter={24}>

            <FormItem label="类型" {...this.formLayout2}>
              {getFieldDecorator('describe', {
                rules: [{
                  required: true,
                  message: '请输入目标描述',
                }],
                initialValue: current.describe,
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="请输入目标描述"
                  rows={4}
                />
              )}
            </FormItem>


          </Row>

        </Form>
      );
    };

    return (
      <Modal
        title="新增资源"
        className={styles.standardListForm}
        width={960}
        bodyStyle={{ padding: '28px 20px 0' }}
        destroyOnClose
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
      >
        {getModalContent()}
      </Modal>
    );
  }
}
export default AddCron;
