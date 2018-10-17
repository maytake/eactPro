import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Button,
  Upload,
  Icon,
  DatePicker,
  message,
} from 'antd';
import isEqual from 'lodash/isEqual';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SearchModel from './SearchModel';
import styles from './AddUser.less';

const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;

@Form.create()
class AddUser extends PureComponent {
  colLayout = {
    xl: 8,
    md: 12,
    sm: 24,
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      current: {
        headOffice:'',
        account:'',
        shop:''
      },

    };
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = fields => {
    message.success('选择成功！');
    const choiceValue = fields.map(item => item.name).join(',');
    this.props.form.setFieldsValue({
        shop: choiceValue,
    });
    this.handleModalVisible();
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  showChoice(value) {
    console.log(value);
    this.handleModalVisible(true);
  }

  render() {
    const { modalVisible, current } = this.state;
    const { history } = this.props;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    const columns = [
      {
        title: '编码',
        dataIndex: 'code',
        sorter: (a, b) => a.code - b.code,
      },
      {
        title: '名称',
        dataIndex: 'name',
        sorter: (a, b) => {
          // console.log(a.name.localeCompare(b.name, 'zh-CN'));
          return a.name.localeCompare(b.name, 'zh-CN');
        },
      },
      {
        title: '描述',
        dataIndex: 'describe',
        sorter: (a, b) => {
          return a.describe.localeCompare(b.describe, 'zh-CN');
        },
      },
    ];

    const data = [
      {
        key: '1',
        code: 10524,
        name: '德化盈众',
        describe: '泉州盈众汽车销售服务有限公司德化分公司是盈众集团旗',
      },
      {
        key: '2',
        code: 10525,
        name: '福海盈众',
        describe: '厦门盈众汽车销售服务有限公司德化分公司是盈众集团旗',
      },
      {
        key: '3',
        code: 10526,
        name: '漳州盈众',
        describe: '漳州盈众汽车销售服务有限公司德化分公司是盈众集团旗',
      },
    ];

    const { getFieldDecorator } = this.props.form;
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
    const formItemUpload = {
      labelCol: {
        md: { span: 8 },
        sm: { span: 12 },
      },
      wrapperCol: {
        md: { span: 16 },
        sm: { span: 12 },
      },
    };
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <h1 className={styles.roleTitle}>新增用户</h1>
          <Form onSubmit={this.handleSubmit} className="ant-advanced-search-form">
            <div className={styles.roleForm}>
              <Row gutter={24}>
                <Col md={4}>
                  <FormItem {...formItemUpload} label="上传头像">
                    {getFieldDecorator('upload', {
                      valuePropName: 'fileList',
                      getValueFromEvent: this.normFile,
                    })(
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="/upload.do"
                      >
                        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                      </Upload>
                    )}
                  </FormItem>
                </Col>
                <Col md={20}>
                  <Row gutter={24}>
                    <Col {...this.colLayout}>
                      <FormItem {...formItemLayout} label="账号">
                        {getFieldDecorator('account', {
                          rules: [{ required: true, message: '请输入账号!' }],
                          initialValue: current.account,
                        })(<Input placeholder="请输入账号" />)}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem {...formItemLayout} label="姓名">
                        {getFieldDecorator('name', {
                          rules: [{ required: true, message: '请输入姓名!' }],
                        })(<Input placeholder="请输入姓名" />)}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem {...formItemLayout} label="电话">
                        {getFieldDecorator('phone', {
                          rules: [{ required: true, message: '请输入电话!' }],
                        })(<Input placeholder="请输入电话" />)}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem {...formItemLayout} label="邮箱">
                        {getFieldDecorator('email', {
                          rules: [{ required: true, message: '请输入邮箱!' }],
                        })(<Input placeholder="请输入邮箱" />)}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem {...formItemLayout} label="总部">
                        {getFieldDecorator('headOffice', {
                          rules: [{ required: true, message: '请选择总部!' }],
                          initialValue: current.headOffice,
                        })(
                          <Search
                            placeholder="input search text"
                            onSearch={value => this.showChoice(value)}
                            enterButton
                          />
                        )}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem {...formItemLayout} label="集团">
                        {getFieldDecorator('group', {
                          rules: [{ required: true, message: '请选择集团!' }],
                        })(
                          <Search
                            placeholder="input search text"
                            onSearch={value => this.showChoice(value)}
                            enterButton
                          />
                        )}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem {...formItemLayout} label="4S店">
                        {getFieldDecorator('shop', {
                          rules: [{ required: true, message: '请选择4Sshop!' }],
                          initialValue: current.shop,
                        })(
                          <Search
                            placeholder="input search text"
                            onSearch={value => this.showChoice(value)}
                            enterButton
                          />
                        )}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem {...formItemLayout} label="部门">
                        {getFieldDecorator('department', {
                          rules: [{ required: true, message: '请输入部门!' }],
                        })(<Input placeholder="请输入部门" />)}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem {...formItemLayout} label="认证资格">
                        {getFieldDecorator('CCNP', {
                          rules: [{ required: true, message: '请输入认证资格!' }],
                        })(<Input placeholder="请输入认证资格" />)}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem {...formItemLayout} label="认证资格有效期">
                        {getFieldDecorator('validity', {
                          rules: [{ required: true, message: '请选择认证资格有效期!' }],
                          initialValue: null,
                        })(
                          <DatePicker
                            showTime
                            placeholder="请选择"
                            format="YYYY-MM-DD HH:mm:ss"
                            style={{ width: '100%' }}
                          />
                        )}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem {...formItemLayout} label="岗位">
                        {getFieldDecorator('job', {
                          rules: [{ required: true, message: '请输入岗位!' }],
                        })(<Input placeholder="请输入岗位" />)}
                      </FormItem>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <h1 className={styles.roleTitle}>角色明细</h1>
            <Row>
              <Col {...this.colLayout}>
                <FormItem {...formItemLayout} label="角色明细">
                  {getFieldDecorator('role', {
                    rules: [{ required: true, message: '请选择角色明细!' }],
                  })(
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder="请选择角色明细"
                      help="角色明细可多选"
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>

            <FormItem className="ant-form-split">
              <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                保存
              </Button>
              <Button onClick={() => history.go(-1)}>返回</Button>
            </FormItem>
          </Form>
        </Card>
        <SearchModel modalVisible={modalVisible} {...parentMethods} columns={columns} data={data} />
      </PageHeaderWrapper>
    );
  }
}
export default AddUser;
