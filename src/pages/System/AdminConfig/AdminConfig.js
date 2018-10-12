import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';

import { Row, Card, Form, Input, Button, Select, Modal, message, Table, Tooltip } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddConfig from './AddConfig'
const FormItem = Form.Item;
const { Option } = Select;

@connect(({ role, loading }) => ({
  role,
  loadings: loading.effects['role/fetchBasic'],
}))
@Form.create()
class AdminConfig extends PureComponent {
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
    this.handleModalVisible(true);
  }

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row>
          <FormItem>{getFieldDecorator('keys')(<Input placeholder="键" />)}</FormItem>
          <FormItem>{getFieldDecorator('name ')(<Input placeholder="账号" />)}</FormItem>
          <FormItem style={{ width: '165px' }} wrapperCol={{ span: 24 }}>{getFieldDecorator('type')(
            <Select placeholder="请选择类型" style={{ width: '100%' }}>
              <Option value="1">回调地址</Option>
              <Option value="2">开关</Option>
            </Select>)}
          </FormItem>
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

    const SwitchStatus = (key, status, id) => {
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
        id: '15906013968',
        keys: 'ALIPAY_NOTIFY_URL	',
        name: '支付宝支付接口异步通知地址',
        value: 'https://ceshi.lechengclub.com/CRM/appoilcard/alipayNotifyApi.json',
        type: '回调地址',
        status: '1',
      }, {
        key: '2',
        id: '15906013968',
        keys: 'ALIPAY_NOTIFY_URL	',
        name: '支付宝支付接口异步通知地址',
        value: 'https://ceshi.lechengclub.com/CRM/appoilcard/alipayNotifyApi.json',
        type: '回调地址',
        status: '1',
      },


    ];

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '键',
        dataIndex: 'keys',
        key: 'keys',
      },
      {
        title: '键名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '值',
        dataIndex: 'value',
        key: 'value',
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
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
              <Tooltip title="编辑">
                <Button
                  icon="edit"
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
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      }
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className="tableList">
            <div className="tableListOperator">
              <div className="newBtn">
                <Button icon="plus" type="primary" onClick={() => this.Add()}>
                  新建
                </Button>
                <Button type="primary">
                  批量启用
                </Button>
                <Button type="primary">
                  批量停用
                </Button>
              </div>
              <div className="searchList">{this.renderForm()}</div>
            </div>

            <Table
              rowSelection={rowSelection}
              dataSource={dataSource}
              pagination={paginationProps}
              columns={columns}
            />
          </div>
        </Card>

        <AddConfig modalVisible={modalVisible} {...parentMethods} />
      </PageHeaderWrapper>
    );
  }
}
export default AdminConfig;
