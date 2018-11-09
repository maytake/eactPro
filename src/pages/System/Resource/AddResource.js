import React, { PureComponent } from 'react';
import { Input, Modal, Form, Select, Row, Col } from 'antd';
import isEqual from 'lodash/isEqual';
import TableForm from './TableForm';
import styles from './AddResource.less';

const FormItem = Form.Item;
const SelectOption = Select.Option;

@Form.create()
class AddResource extends PureComponent {

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
    // console.log(nextProps);
    // console.log(preState);
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
      category,
    } = this.props;
    const {data} = this.state;
    const current=data.data?data.data:{};
    const id=current.id;
    console.log(current);
    const { modalVisible, form, handleAdd, handleModalVisible } = this.props;
    const checkPermission = (rule, value, callback) => {
      const pass =/^\w+(:)\*$/.test(value);
      if (!value) {
        callback('请输入权限字符串！');
      }else if (!pass) {
          callback('权限编码值不合法，必须以冒号加星号结尾！正确例如permission:*');
        } else {
          callback();
        }
    };
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        console.log(fieldsValue);
        if (err) return;
        form.resetFields();
        let spliceData;
        if(id){
           spliceData={
            ts:current.ts,
            funcType:current.funcType,
            ...fieldsValue,
          };
        }else{
          spliceData=fieldsValue;
        }
        handleAdd(spliceData,id);
      });
    };

    // 可见范围
    const scopeList =category || [];

    const getModalContent = () => {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={24}>
            <Col {...this.colLayout}>
              <FormItem label="名称" {...this.formLayout}>
                {getFieldDecorator('funcName', {
                  rules: [{ required: true, message: '请输入名称' }],
                  initialValue: current.funcName,
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
                {getFieldDecorator('parentId', {
                  rules: [{ required: true, message: '请选择类别' }],
                  initialValue: current.parentId,
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
                      <SelectOption key={item.pkParentfunc} value={item.pkParentfunc.toString()}>
                        {item.parentfuncname}
                      </SelectOption>
                    ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...this.colLayout}>
              <FormItem label="权限字符串" {...this.formLayout}>
                {getFieldDecorator('funcCode', {
                  rules: [{ required: true, message: '请输入权限字符串,例如permission:*' },{validator: checkPermission, }],
                  
                  initialValue: current.funcCode,
                })(<Input placeholder="请输入权限字符串,例如permission:*" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col {...this.colLayout}>
              <FormItem label="可见范围" {...this.formLayout}>
                {getFieldDecorator('visible_scope', {
                  rules: [{ required: true, message: '请选择可见范围' }],
                  initialValue: current.visible_scope&&current.visible_scope.toString(),
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
                {getFieldDecorator('funcUrl', {
                  rules: [{ required: true, message: '请输入URL路径' }],
                  initialValue: current.funcUrl,
                })(<Input placeholder="请输入URL路径" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <FormItem label="按钮明细" {...this.tableLayout}>
              {getFieldDecorator('children', {
                initialValue: current.children,
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
