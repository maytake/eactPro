import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';

import {  Card, Form, Input, Button,  message, Table, Tooltip } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddSwitch from './AddSwitch'

const { Search } = Input;

@connect(({ role, loading }) => ({
  role,
  loadings: loading.effects['role/fetchBasic'],
}))
@Form.create()
class AdminSwitch extends PureComponent {
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


  Add() {
    this.handleModalVisible(true);
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

    const dataSource = [
      {
        key: '0',
        id: '15906013968',
        code: 'DXGL20180911000001',
        name: 'CPCT定时器的消息推送开关控制',
        describe: 'CPCT定时器的消息推送开关控制',
        status: '1',
      }, {
        key: '2',
        id: '15906013968',
        code: 'DXGL20180911000001',
        name: 'CPCT定时器的消息推送开关控制',
        describe: 'CPCT定时器的消息推送开关控制',
        status: '2',
      },


    ];

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '编码',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '描述',
        dataIndex: 'describe',
        key: 'describe',
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

            </Fragment>
          );
        },
      },
    ];


    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className="tableList">
            <div style={{ marginBottom: '16px' }}>
              <Button icon="plus" type="primary" onClick={() => this.Add()}>
                新建
              </Button>
              <Search
                style={{ float: 'right', width: '315px' }}
                placeholder="请输入角色名称"
                enterButton="搜索"
                onSearch={this.handleSearch}
              />
            </div>

            <Table
              dataSource={dataSource}
              pagination={paginationProps}
              columns={columns}
            />
          </div>
        </Card>

        <AddSwitch modalVisible={modalVisible} {...parentMethods} />
      </PageHeaderWrapper>
    );
  }
}
export default AdminSwitch;
