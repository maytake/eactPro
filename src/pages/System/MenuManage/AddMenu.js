import React, { PureComponent } from 'react';
import { Input, Modal, Form, Row, Col } from 'antd';
import isEqual from 'lodash/isEqual';
import styles from './MenuManage.less';

const FormItem = Form.Item;


@Form.create()
class AddMenu extends PureComponent {

  formLayout = {
    labelCol: { className: 'labelName' },
    wrapperCol: { span: 17 },
  };

  tableLayout = {
    labelCol: { className: 'labelName' },
    wrapperCol: { span: 20 },
  };

  colLayout = {
    lg: 12,
    sm: 24,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: props.updateResult,
    };
  }

  static getDerivedStateFromProps(nextProps, preState) {
    console.log(nextProps);
    console.log(preState);
    if (isEqual(nextProps.updateResult, preState.data)) {
      return null;
    }
    return {
      data: nextProps.updateResult,
    };
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const {data} = this.state;
    const current=data.content?data.content:{};
    console.log(current);
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
              <FormItem label="名称" {...this.formLayout}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入名称' }],
                  initialValue: current.name,
                })(<Input placeholder="请输入名称" />)}
              </FormItem>
            </Col>
            <Col {...this.colLayout}>
              <FormItem label="排序编码" {...this.formLayout}>
                {getFieldDecorator('code', {
                  rules: [{ required: true, message: '请输入排序编码' }],
                  initialValue: current.code,
                })(<Input placeholder="编码服务端自动生成" />)}
              </FormItem>
            </Col>
          </Row>
         
          <Row gutter={24}>
            <Col {...this.colLayout}>
              <FormItem label="图标" {...this.formLayout}>
                {getFieldDecorator('icon', {
                  rules: [{ required: true, message: '请输入图标' }],
                  initialValue: current.icon,
                })(<Input placeholder="请输入图标" />)}
              </FormItem>
            </Col>
            <Col {...this.colLayout}>
              <FormItem label="URL路径" {...this.formLayout}>
                {getFieldDecorator('urlPath', {
                  rules: [{ required: true, message: '请输入URL路径' }],
                  initialValue: current.urlPath,
                })(<Input placeholder="请输入URL路径" />)}
              </FormItem>
            </Col>
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
export default AddMenu;
