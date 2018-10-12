import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input, Modal, Form, Select, Row, Col } from 'antd';

import styles from './AddCron.less';

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
              <FormItem label="任务名称" {...this.formLayout}>
                {getFieldDecorator('jobName', {
                  rules: [{ required: true, message: '请输入任务名称' }],
                  initialValue: current.jobName,
                })(<Input placeholder="例：maintainTipJobs" />)}
              </FormItem>
            </Col>
            <Col {...this.colLayout}>
              <FormItem label="任务别名" {...this.formLayout}>
                {getFieldDecorator('aliasName', {
                  rules: [{ required: true, message: '请输入任务别名' }],
                  initialValue: current.aliasName,
                })(<Input placeholder="例：XXX定时任务" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col {...this.colLayout}>
              <FormItem label="任务分组" {...this.formLayout}>
                {getFieldDecorator('jobGroup', {
                  rules: [{ required: true, message: '请输入任务分组' }],
                  initialValue: current.jobGroup,
                })(<Input placeholder="例：maintainTipGroup" />)}
              </FormItem>
            </Col>
            <Col {...this.colLayout}>
              <FormItem label="时间表达式" {...this.formLayout}>
                {getFieldDecorator('cronExpression', {
                  rules: [{ required: true, message: '请输入时间表达式' }],
                  initialValue: current.cronExpression,
                })(<Input placeholder="例：1 * * * * ? " />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <FormItem label="类地址" {...this.formLayout2}>
                {getFieldDecorator('jobClassUrl', {
                  rules: [{ required: true, message: '请输入类地址' }],
                  initialValue: current.jobClassUrl,
                })(<Input placeholder="例：com.yzqc.crm.timertask.CallCenterTimerTask3" />)}
            </FormItem>
          </Row>
          <Row gutter={24}>

            <FormItem label="描述" {...this.formLayout2}>
              {getFieldDecorator('describe', {
                rules: [{
                  required: true,
                  message: '请输入描述',
                }],
                initialValue: current.describe,
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="请输入描述"
                  rows={4}
                />
              )}
            </FormItem>


          </Row>
          <Row gutter={24}>
                <iframe crolling="auto" title="timeCount" width="100%" height="460" frameBorder="0" src="http://cron.qqe2.com/"></iframe>
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
