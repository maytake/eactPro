import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Form, Input, Button, Modal, Table, Tooltip } from 'antd';
import { AddKey } from '@/utils/utils';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { parse } from 'url';
import AddResource from './AddResource';
import styles from './Resource.less';

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
      loading: false,
      current:{},
    };
  }

  componentDidMount() {
    const params = parse(window.location.href, true).query;
    this.getData(params.name);
  }

  getData(v){
    const { dispatch } = this.props;
    dispatch({
      type: 'resource/fetchResource',
      payload: {
        page: "1",
        pageSize : "20",
        sortType: "auto",
        name:v
        },
    });
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = (fields, id) => {
    const { dispatch} = this.props;
    if(id){
      dispatch({
        type: 'resource/getUpdate',
        payload: {
          id,
          ...fields,
        },
        callback: () => {
          this.getData();
        }
      });
    }else{
      dispatch({
        type: 'resource/add',
        payload: {
          ...fields,
        },
        callback: () => {
          this.getData();
        }
      });
    }
    this.handleModalVisible();
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'resource/fetchResource',
      payload: {
        page: pagination.current,
        pageSize : pagination.pageSize,
        sortType: "auto",
        },
    });
  };

  handleSearch(v) {
    const { dispatch } = this.props;
    dispatch({
      type: 'resource/fetchResource',
      payload: { name: v },
    });
    router.push({
      pathname: '/system/resource',
      query:{name:v}
    })
  }

  deleteItem(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'resource/remove',
      payload: {
        id,
      },
      callback: () => {
        this.getData();
      }
    });
  }


  render() {
    

    const {current}=this.state;
    const {
      dispatch,
      loading,
      resource: { dataSource, category},
    } = this.props;
    const { content, totalElements, size }=dataSource;
    let resData;
    if(Object.keys(dataSource).length!==0){
      resData= AddKey(content, 'id'); 
    };
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      defaultCurrent: 1,
      total: totalElements, 
      pageSize: size, 
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
      dispatch({
        type: 'resource/getCategory',
      });
      dispatch({
        type: 'resource/resourceToUpdate',
        payload: {
          id,
        },
        callback: (data) => {
          this.setState({
            current:data,
          })
        },
      });
      this.handleModalVisible(true);
    };
    const Add=()=> {
      dispatch({
        type: 'resource/getCategory',
      });
      this.setState({
        current:{},
      })
      this.handleModalVisible(true);
    }
    const columns = [
      {
        title: '名称',
        dataIndex: 'funcName',
        key: 'funcName',
      },
      {
        title: 'URL',
        dataIndex: 'funcUrl',
        key: 'funcUrl',
      },
      {
        title: '权限字符串',
        dataIndex: 'funcCode',
        key: 'funcCode',
      },
      {
        title: '可见范围',
        dataIndex: 'visible_scope',
        key: 'visible_scope',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width:'155px',
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
              <Button icon="plus" type="primary" onClick={() => Add()}>
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
              dataSource={resData}
              pagination={paginationProps}
              columns={columns}
              onChange={this.handleTableChange}
            />
          </div>
        </Card>
        <AddResource modalVisible={this.state.modalVisible} {...parentMethods} updateResult={current} category={category.data} />
      </PageHeaderWrapper>
    );
  }
}
export default Resource;
