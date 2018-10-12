import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';

import { Card, Form, Input, Button, Modal, message, Table, Tooltip } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddNotice from './AddNotice'

const { Search } = Input;

@connect(({ role, loading }) => ({
  role,
  loadings: loading.effects['role/fetchBasic'],
}))
@Form.create()
class CrmNotice extends PureComponent {
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
        id: '2.0.0.20180726_release',
        version: '2.0.0.20180726',
        describe: '1、新增部分功能； 2、页面功能调整； 3、已发现问题修改；',
        updateTime: '2018-07-26 18:08:52',
        creator: '梁铁山',
        creatorTime:'2018-07-27 08:48:45'
      }, 
      {
        key: '1',
        id: '2.0.0.20180726_release',
        version: '2.0.0.20180726',
        describe: '1、新增部分功能； 2、页面功能调整； 3、已发现问题修改；',
        updateTime: '2018-07-26 18:08:52',
        creator: '梁铁山',
        creatorTime:'2018-07-27 08:48:45'
      }, 

    ];

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '版本号',
        dataIndex: 'version',
        key: 'version',
      },
      {
        title: '更新内容描述',
        dataIndex: 'describe',
        key: 'describe',
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
      },
      {
        title: '创建人',
        dataIndex: 'creator',
        key: 'creator',
      },

      {
        title: '创建时间',
        dataIndex: 'creatorTime',
        key: 'creatorTime',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 155,
        render: (text, record) => {
          return (
            <Fragment>
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

        <AddNotice modalVisible={modalVisible} {...parentMethods} />
      </PageHeaderWrapper>
    );
  }
}
export default CrmNotice;
