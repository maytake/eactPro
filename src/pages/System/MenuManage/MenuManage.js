import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import { Row, Col, Card, Form, Input, Button, Modal, message, Table, Tooltip } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddMenu from './AddMenu';
import styles from './MenuManage.less';


const { Search } = Input;

@connect(({ menuManage, loading }) => ({
    menuManage,
  loading: loading.models.menuManage,
}))
@Form.create()
class MenuManage extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      loading: false,
      current:{},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'menuManage/fetchData',
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
      menuManage: { addResult },
    } = this.props;
    dispatch({
      type: 'menuManage/add',
      payload: {
        ...fields,
      },
    });

    message.success(addResult.msg);
    dispatch({
      type: 'menuManage/fetchData',
    });
    this.handleModalVisible();
  };

  handleSearch(v) {
    const { dispatch } = this.props;
    dispatch({
      type: 'menuManage/fetchData',
      payload: { name: v },
    });
    router.push({
      pathname: '/system/menuManage',
      query:{name:v}
    })
  }

  deleteItem(id) {
    const {
      dispatch,
      menuManage: { reomveResult },
    } = this.props;
    dispatch({
      type: 'menuManage/remove',
      payload: {
        desc: id,
      },
    });
    message.success(reomveResult.msg);
    dispatch({
      type: 'menuManage/fetchData',
    });
  }

  render() {
    const {current}=this.state;
    const {
      loading,
      menuManage: { data },
    } = this.props;
    
    const { list, pagination }=data;
    if(!pagination){return null;}
    const paginationProps = {
        showSizeChanger: true,
        showQuickJumper: true,
        ...pagination,
      };

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
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
      const { 
        dispatch, 
      } = this.props;
      dispatch({
        type: 'menuManage/getUpdate',
        payload: {
          desc: id,
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
      this.setState({
        current:{},
      })
      this.handleModalVisible(true);
    }
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
        title: '图标',
        dataIndex: 'icon',
        key: 'icon',
      },
      {
        title: '排序编码',
        dataIndex: 'code',
        key: 'code',
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
              dataSource={list}
              pagination={paginationProps}
              columns={columns}
            />
          </div>
        </Card>
        <AddMenu modalVisible={this.state.modalVisible} {...parentMethods} updateResult={current} />
      </PageHeaderWrapper>
    );
  }
}
export default MenuManage;
