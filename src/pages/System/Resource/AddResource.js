import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Input,
  Modal,
  Form,
  Select,
  Row,
  Col,
  Table,
  Button,
} from 'antd';
import styles from './AddResource.less';

const FormItem = Form.Item;
const SelectOption = Select.Option;

@Form.create()
class AddResource extends PureComponent {

  state = {
    data:[]
  }

  formLayout = {
    labelCol: { className: 'labelName' },
    wrapperCol: { span: 17 },
  };

  tableLayout = {
    labelCol: { className: 'labelName' },
    wrapperCol: { span: 20 },
  }

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
        if (err) return;
        form.resetFields();
        handleAdd(fieldsValue);
      });
    };
    
    // 可见范围
    const scopeList = [
      {
      "pkParentfunc": 150,
      "dr": 1,
      "parentfuncname": "系统管理",
      "ts": "2015-10-9 20:00:27 ",
      "code": "01"
    },
    {
      "pkParentfunc": 151,
      "dr": 1,
      "parentfuncname": "基础数据",
      "ts": "2015-10-9 20:00:35 ",
      "code": "02"
    },
    {
      "pkParentfunc": 152,
      "dr": 1,
      "parentfuncname": "组织管理",
      "ts": "2015-10-9 20:00:46 ",
      "code": "03"
    },]

    // 表格内容
    const {data} = this.state;
    const columns = [{
      title: '按钮名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Input placeholder="Basic usage" />
      ),
    }, {
      title: '按钮权限字符串 ',
      dataIndex: 'permission ',
      key: 'permission ',
      render: (text, record) => (
        <Input placeholder="Basic usage" />
      ),
    }, {
      title: '操作',
      key: 'action',
      width: '65px',
      render: (text, record) => (
        <Button icon="delete" onClick={({ key }) => permissionDelete(key, record.key)} type="primary"></Button>
      ),
    }];

   
    const permissionDelete = (key, id) => {
      data.splice(id, 1);
      this.setState((prevState)=>({ data: prevState.data }));
    }

    const permissionAdd = () => {
      
      const item = { 
        key:Math.random().toFixed(5),
        name:'',
        permission:''
      }; 
      data.push(item);
      this.setState((prevState,props)=>{
        console.log(prevState) 
        return {data: prevState.data} 
      });
    }

    // 表格内容end
    

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
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    placeholder="请选择类别"
                  >
                    {scopeList.map( item =>  <SelectOption key={item.pkParentfunc} value={item.pkParentfunc}>{item.parentfuncname}</SelectOption>  )}
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
              <Table
                bordered
                columns={columns}
                dataSource={data}
                pagination={false}
              />
              <Button style={{ marginTop: '15px' }} icon="plus" onClick={() => permissionAdd()}>新增</Button>
            </FormItem>
          </Row>
        </Form>
      );
    };

    return (
      <Modal
        title="新增用户"
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