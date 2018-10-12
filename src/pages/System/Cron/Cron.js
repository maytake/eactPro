import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';

import { Row, Card, Form, Input, Button, Select, Modal, message, Table, Tooltip } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddCron from './AddCron'
const FormItem = Form.Item;
const { Option } = Select;

@connect(({ role, loading }) => ({
  role,
  loadings: loading.effects['role/fetchBasic'],
}))
@Form.create()
class Cron extends PureComponent {
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
        aliasName: 'LuckyDrawActivityTimerTask	',
        jobName: 'LuckyDrawActivityTimerTaskJobs	',
        jobGroup: 'LuckyDrawActivityTimerTaskJobsScheduler	',
        cronExpression: '0 0/1 * ? * *',
        jobClassUrl: 'com.yzqc.crm.timertask.LuckyDrawActivityTimerTask',
        status: '1',
      },{
        key: '1',
        aliasName: 'LuckyDrawActivityTimerTask	',
        jobName: 'LuckyDrawActivityTimerTaskJobs	',
        jobGroup: 'LuckyDrawActivityTimerTaskJobsScheduler	',
        cronExpression: '0 0/1 * ? * *',
        jobClassUrl: 'com.yzqc.crm.timertask.LuckyDrawActivityTimerTask',
        status: '1',
      },


    ];

    const columns = [
      {
        title: '任务别名',
        dataIndex: 'aliasName',
        key: 'aliasName',
      },
      {
        title: '任务名称',
        dataIndex: 'jobName',
        key: 'jobName',
      },
      {
        title: '任务分组',
        dataIndex: 'jobGroup',
        key: 'jobGroup',
      },
      {
        title: '时间表达式',
        dataIndex: 'cronExpression',
        key: 'cronExpression',
      },
      {
        title: '类地址',
        dataIndex: 'jobClassUrl',
        key: 'jobClassUrl',
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

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className="tableList">
            <div className="tableListOperator">
              <Button icon="plus" type="primary" onClick={() => this.Add()}>
                新建
              </Button>
            </div>

            <Table
           
              dataSource={dataSource}
              pagination={paginationProps}
              columns={columns}
            />
          </div>
        </Card>

        <AddCron modalVisible={modalVisible} {...parentMethods} />
      </PageHeaderWrapper>
    );
  }
}
export default Cron;
