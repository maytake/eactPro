import React, { PureComponent } from 'react';

import { Input, Modal, Form, Radio} from 'antd';

import styles from './AddSwitch.less';

const { TextArea } = Input;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@Form.create()
class AddSwitch extends PureComponent {
  state = {};

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
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
          <FormItem label="编码" {...this.formLayout}>
            {getFieldDecorator('code', {
              rules: [{ required: true, message: '请输入编码' }],
              initialValue: current.code,
            })(<Input placeholder="请输入编码" />)}
          </FormItem>
          <FormItem label="名称" {...this.formLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入名称' }],
              initialValue: current.name,
            })(<Input placeholder="请输入名称" />)}
          </FormItem>
          <FormItem label="编号" {...this.formLayout}>
            {getFieldDecorator('number', {
              rules: [{ required: true, message: '请输入编号' }],
              initialValue: current.number,
            })(<Input placeholder="请输入编号" />)}
          </FormItem>
          <FormItem
            {...this.formLayout}
            label="状态"
          >
            {getFieldDecorator('status', {
              initialValue: "1",
            })(
              <RadioGroup>
                <Radio value="1">启用</Radio>
                <Radio value="2">关闭</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem label="描述" {...this.formLayout}>
            {getFieldDecorator('describe', {
              rules: [{
                required: true,
                message: '请输入描述',
              }],
              initialValue: current.describe,
            })(
              <TextArea
                style={{ minHeight: 32, width: 325 }}
                placeholder="请输入描述"
                rows={4}
              />
            )}
          </FormItem>

        </Form>
      );
    };

    return (
      <Modal
        title="新增资源"
        className={styles.standardListForm}
        width={640}
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
export default AddSwitch;
