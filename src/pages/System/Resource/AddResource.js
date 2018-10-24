import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input, Modal, Form, Select, Row, Col } from 'antd';
import TableForm from './TableForm';
import styles from './AddResource.less';

const FormItem = Form.Item;
const SelectOption = Select.Option;

@Form.create()
class AddResource extends PureComponent {
  state = {
  };

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

  
  render() {
    const {
      form: { getFieldDecorator },
      updateResult
    } = this.props;


     
    const current=updateResult.content?updateResult.content:{};
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

    // 可见范围
    const scopeList = [
      {
        pkParentfunc: 150,
        dr: 1,
        parentfuncname: '系统管理',
        ts: '2015-10-9 20:00:27 ',
        code: '01',
      },
      {
        pkParentfunc: 151,
        dr: 1,
        parentfuncname: '基础数据',
        ts: '2015-10-9 20:00:35 ',
        code: '02',
      },
      {
        pkParentfunc: 152,
        dr: 1,
        parentfuncname: '组织管理',
        ts: '2015-10-9 20:00:46 ',
        code: '03',
      },
    ];

 

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
              <FormItem label="编码" {...this.formLayout}>
                {getFieldDecorator('code', {
                  initialValue: current.code,
                })(<Input disabled placeholder="编码服务端自动生成" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col {...this.colLayout}>
              <FormItem label="类别" {...this.formLayout}>
                {getFieldDecorator('category', {
                  rules: [{ required: true, message: '请选择类别' }],
                  initialValue: current.category,
                })(
                  <Select
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    placeholder="请选择类别"
                  >
                    {scopeList.map(item => (
                      <SelectOption key={item.pkParentfunc} value={item.pkParentfunc}>
                        {item.parentfuncname}
                      </SelectOption>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colLayout}>
              <FormItem label="权限字符串" {...this.formLayout}>
                {getFieldDecorator('permission', {
                  rules: [{ required: true, message: '请输入权限字符串' }],
                  initialValue: current.permission,
                })(<Input placeholder="请输入权限字符串" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col {...this.colLayout}>
              <FormItem label="可见范围" {...this.formLayout}>
                {getFieldDecorator('visibleRange', {
                  rules: [{ required: true, message: '请选择可见范围' }],
                  initialValue: current.visibleRange,
                })(
                  <Select placeholder="请选择可见范围">
                    <SelectOption value="1">仅集团可见</SelectOption>
                    <SelectOption value="2">集团和4s店都可见</SelectOption>
                  </Select>
                )}
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
          <Row gutter={24}>
            <FormItem label="按钮明细" {...this.tableLayout}>
              {getFieldDecorator('members', {
                initialValue: current.members,
              })(<TableForm />)}
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
export default AddResource;
