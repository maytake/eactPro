import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import { Row, Col, Card, Form, Input, Button, Modal, message, Table, Tooltip } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddResource from './AddResource';
import styles from './Resource.less';

const FormItem = Form.Item;
const { Search } = Input;

@connect(({ resource, loading }) => ({
  resource,
  loading: loading.models.resource,
}))
@Form.create()
class Resource extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      modalVisible: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'resource/fetchResource',
    });
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = fields => {
    const {
      dispatch,
      resource: { addResult },
    } = this.props;
    dispatch({
      type: 'resource/add',
      payload: {
        desc: fields,
      },
    });

    message.success(addResult.msg);
    dispatch({
      type: 'resource/fetchResource',
    });
    this.handleModalVisible();
  };

  handleSearch(v) {
    const { dispatch } = this.props;
    dispatch({
      type: 'resource/fetchResource',
      payload: { name: v },
    });
  }

  deleteItem(id) {
    const {
      dispatch,
      resource: { reomveResult },
    } = this.props;
    dispatch({
      type: 'resource/remove',
      payload: {
        desc: id,
      },
    });
    message.success(reomveResult.msg);
    dispatch({
      type: 'resource/fetchResource',
    });
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
          <Col md={4} sm={16}>
            <FormItem label="角色名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={2} sm={16}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      loading,
      resource: { dataSource },
    } = this.props;
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

    const roleDelete = (key, currentId) => {
      Modal.confirm({
        title: '删除角色',
        content: '确定删除该角色吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => this.deleteItem(currentId),
      });
    };
    const roleEdit = (key, id) => {
      this.handleModalVisible(true);
    };

    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
      },
      {
        title: '权限字符串',
        dataIndex: 'string',
        key: 'string',
      },
      {
        title: '可见范围',
        dataIndex: 'visibleRange',
        key: 'visibleRange',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Tooltip title="编辑">
              <Button
                icon="edit"
                onClick={({ key }) => roleEdit(key, record.key)}
                type="primary"
                style={{ marginRight: '8px' }}
              />
            </Tooltip>
            <Tooltip title="删除">
              <Button
                icon="delete"
                onClick={({ key }) => roleDelete(key, record.key)}
                type="primary"
              />
            </Tooltip>
          </span>
        ),
      },
    ];

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.Add()}>
                新建
              </Button>
              <Search
                className={styles.search}
                placeholder="请输入角色名称"
                enterButton="搜索"
                onSearch={this.handleSearch}
              />
            </div>

            <Table
              loading={loading}
              dataSource={dataSource}
              pagination={paginationProps}
              columns={columns}
            />
          </div>
        </Card>
        <AddResource modalVisible={this.state.modalVisible} {...parentMethods} />
      </PageHeaderWrapper>
    );
  }
}
export default Resource;
