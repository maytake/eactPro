import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Row, Card, Form, Input, Button, Modal, message, Table, Tooltip } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './User.less';

const FormItem = Form.Item;

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible,} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  const checkConfirm = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };

  const checkPassword = (rule, value, callback) => {
    if (!value) {
      callback('请输入密码！');
    } else if (value.length < 6) {
        callback('密码有误！');
      } else {
        callback();
      }
  };


  return (
    <Modal
      destroyOnClose
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('password', {
          rules: [{
            validator: checkPassword,
          },],
        })(<Input type="password" placeholder="至少6位密码，区分大小写" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="确认密码">
        {form.getFieldDecorator('confirm', {
          rules: [{
            required: true,
            message: '请确认密码！',
          },
          {
            validator: checkConfirm,
          },],
        })(<Input type="password" placeholder="请再次输入密码" />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ userManagement, loading }) => ({
  userManagement,
  loadings: loading.effects['userManagement/fetchUser'],
}))
@Form.create()
class User extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      FormValues:{},
    };
    this.handleSearch=this.handleSearch.bind(this);
  }
  
  componentDidMount() {
    const { dispatch, location } = this.props;
    const params = location.query;
    dispatch({
      type: 'userManagement/fetchUser',
      payload:{
        desc:params
      }
    });
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = () => {
    const id = this.state.FormValues.key;
    const {
      dispatch,
      userManagement: { setResult },
    } = this.props;
    dispatch({
      type: 'userManagement/getUpdate',
      payload: {
        desc: id,
      },
    });
    message.success(setResult.msg);
    this.handleModalVisible();
  };

  
  SwitchStatus = (status, id) => {
    const {
      dispatch,
      userManagement: { statusResult },
    } = this.props;
    dispatch({
      type: 'userManagement/changeStatus',
      payload: {
        desc: id,
        status,
      },
/*       callback: (n) => {
        message.success(n.msg);
      }, */
    });
    message.success(statusResult.msg);
  };

  SetPassword = (record)=>{
    this.setState({
      FormValues: record || {},
    });
    this.handleModalVisible(true);
  }
 
  deleteItem=(id)=> {
    const {
      dispatch,
      userManagement: { reomveResult },
    } = this.props;
    dispatch({
      type: 'userManagement/remove',
      payload: {
        desc: id,
      },
    });
    message.success(reomveResult.msg);
    dispatch({
      type: 'userManagement/fetchUser',
    });
  }

  Add=()=> {
  
    router.push({
      pathname: '/system/user/adduser',
    })
    
  }
  
  handleSearch=(e)=> {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      router.push({
        pathname: '/system/user',
        query:fieldsValue
      })
      dispatch({
        type: 'userManagement/fetchUser',
        payload: fieldsValue,
      });
    });
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row>
          <FormItem>{getFieldDecorator('shipname')(<Input placeholder="4s店名称" />)}</FormItem>
          <FormItem>{getFieldDecorator('account')(<Input placeholder="账号" />)}</FormItem>
          <FormItem>{getFieldDecorator('name')(<Input placeholder="姓名" />)}</FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </FormItem>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      userManagement:{
        dataSource,
      },
      loadings,
    } = this.props;

    const { modalVisible } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      defaultCurrent: 2,
      total: 100,
      pageSize: 10,
    };

  
    const Delete = (key, currentId) => {
      Modal.confirm({
        title: '删除角色',
        content: '确定删除该角色吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => this.deleteItem(currentId),
      });
    };


    const columns = [
      {
        title: '账号',
        dataIndex: 'account',
        key: 'account',
        fixed: 'left',
        
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '注册时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '所属机构',
        dataIndex: 'agency',
        key: 'agency',
      },
      {
        title: '角色',
        dataIndex: 'role',
        key: 'role',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '商城',
        dataIndex: 'mall',
        key: 'mall',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: text => {
          return text === '1' ? '启用' : '停用';
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
        width: 155,
        render: (text, record) => {
          const start = record.status === '1';
          return (
            <Fragment>
              <Tooltip title={start ? '启用' : '停用'}>
                <Button
                  icon={start ? 'play-circle' : 'pause-circle'}
                  onClick={() => this.SwitchStatus(record.status, record.key)}
                  type="primary"
                  style={{ marginRight: '8px' }}
                />
              </Tooltip>
              <Tooltip title="设置">
                <Button
                  icon="setting"
                  onClick={() => this.SetPassword(record)}
                  type="primary"
                  style={{ marginRight: '8px' }}
                />
              </Tooltip>
              <Tooltip title="删除">
                <Button
                  icon="delete"
                  onClick={() => Delete(record.key)}
                  type="primary"
                />
              </Tooltip>
            </Fragment>
          );
        },
      },
    ];

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <div className={styles.newBtn}>
                <Button icon="plus" type="primary" onClick={() => this.Add()}>
                  新建
                </Button>
              </div>
              <div className={styles.searchList}>{this.renderForm()}</div>
            </div>

            <Table
              dataSource={dataSource.dataSource}
              pagination={paginationProps}
              columns={columns}
              loading={loadings}
              scroll={{ x: '110%' }}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderWrapper>
    );
  }
}
export default User;
