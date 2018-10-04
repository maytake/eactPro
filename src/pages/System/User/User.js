import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { Row, Card, Form, Input, Button, Modal, message, Table, Tooltip } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './User.less';

const FormItem = Form.Item;

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ role, loading }) => ({
  role,
  loadings: loading.effects['role/fetchBasic'],
}))
@Form.create()
class User extends PureComponent {
  state = {
    modalVisible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userManagement/fetchBasic',
    });
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = fields => {
    message.success(fields.desc);
    this.handleModalVisible();
  };

  deleteItem(id) {
    message.success('This is a message of success ');
    console.log(id);
  }

  Add() {
    this.props.dispatch(
      routerRedux.push({
        pathname: '/system/user/adduser',
      })
    );
  }

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row>
          <FormItem>{getFieldDecorator('shipname')(<Input placeholder="4s店名称" />)}</FormItem>
          <FormItem>{getFieldDecorator('account ')(<Input placeholder="账号" />)}</FormItem>
          <FormItem>{getFieldDecorator('name')(<Input placeholder="姓名" />)}</FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </FormItem>
        </Row>
      </Form>
    );
  }

  render() {
    const { cardsLoading } = this.props;

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

    const SwitchStatus = (key, status) => {
      message.success(status);
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
    const dataSource = [
      {
        key: '0',
        account: '112267',
        name: '温晶晶',
        time: '2018-08-08 12:06:27',
        agency: '惠安盈众',
        role: '销售顾问',
        phone: '15906013968',
        email: '	xiaolin.xie@enjoyauto.com	',
        mall: '商城',
        status: '1',
      },
      {
        key: '1',
        account: '112267',
        name: '温晶晶',
        time: '2018-08-08 12:06:27',
        agency: '惠安盈众',
        role: '销售顾问',
        phone: '15906013968',
        email: '	xiaolin.xie@enjoyauto.com	',
        mall: '商城',
        status: '2',
      },
    ];

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
                  onClick={({ key }) => SwitchStatus(key, record.status, record.key)}
                  type="primary"
                  style={{ marginRight: '8px' }}
                />
              </Tooltip>
              <Tooltip title="设置">
                <Button
                  icon="setting"
                  onClick={() => this.handleModalVisible(true)}
                  type="primary"
                  style={{ marginRight: '8px' }}
                />
              </Tooltip>
              <Tooltip title="删除">
                <Button
                  icon="delete"
                  onClick={({ key }) => Delete(key, record.key)}
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
              dataSource={dataSource}
              pagination={paginationProps}
              columns={columns}
              loading={cardsLoading}
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
