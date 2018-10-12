import React, { PureComponent } from 'react';
import { Input, Modal, Form, Radio,  DatePicker,} from 'antd';
import moment from 'moment';
import styles from './AddNotice.less';

const { TextArea } = Input;
const FormItem = Form.Item;


@Form.create()
class AddNotice extends PureComponent {
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
          <FormItem label="版本号" {...this.formLayout}>
            {getFieldDecorator('version', {
              rules: [{ required: true, message: '请输入版本号' }],
              initialValue: current.version,
            })(<Input placeholder="请输入版本号" />)}
          </FormItem>
          <FormItem label="版本名称" {...this.formLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入版本名称' }],
              initialValue: current.name,
            })(<Input placeholder="请输入版本名称" />)}
          </FormItem>
          <FormItem label="更新时间" {...this.formLayout}>
            {getFieldDecorator('updateTime', {
              rules: [{ required: true, message: '请选择开始时间' }],
              initialValue: current.updateTime ? moment(current.updateTime) : null,
            })(
              <DatePicker
                showTime
                placeholder="请选择"
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem label="小提示" {...this.formLayout}>
            {getFieldDecorator('tips', {
              rules: [{ required: true, message: '请输入小提示' }],
              initialValue: current.tips,
            })(<Input placeholder="请输入小提示" />)}
          </FormItem>
          
          <FormItem label="更新内容描述" {...this.formLayout}>
            {getFieldDecorator('describe', {
              rules: [{
                required: true,
                message: '请输入更新内容描述',
              }],
              initialValue: current.describe,
            })(
              <TextArea
                style={{ minHeight: 32, width: 325 }}
                placeholder="请输入更新内容描述"
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
export default AddNotice;
