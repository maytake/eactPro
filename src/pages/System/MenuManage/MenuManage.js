import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import { Row, Col, Card, Form, Input, Button, Modal, message, Table, Tooltip } from 'antd';
import { AddKey } from '@/utils/utils';
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
    this.getData();
  }

  getData(){
    const { dispatch } = this.props;
    dispatch({
      type: 'menuManage/fetchData',
      payload: {
        page: "1",
        pageSize : "20",
        sortType: "auto",
        },
    });
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = (fields, id)=> {
    const { dispatch} = this.props;
    if(id){
      dispatch({
        type: 'menuManage/getUpdate',
        payload: {
          pkParentfunc:id,
          ...fields,
        },
        callback: () => {
          this.getData();
        }
      });
    }else{
      dispatch({
        type: 'menuManage/add',
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
      type: 'menuManage/fetchData',
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
      type: 'menuManage/fetchData',
      payload: {
        page: "1",
        pageSize : "20",
        sortType: "auto",
        name: v },
    });
    router.push({
      pathname: '/system/menuManage',
      query:{name:v}
    })
  }

  deleteItem(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'menuManage/remove',
      payload: {
        pkParentfunc: id,
      },
      callback: () => {
        this.getData();
      }
    });
  }

  render() {
    const {current}=this.state;
    const {
      loading,
      menuManage: { data },
    } = this.props;
    if(Object.keys(data).length===0){return null;}
    const { content, totalElements,size, }=data;
   
    const resData= AddKey(content, 'pkParentfunc');
    const paginationProps = {
        showSizeChanger: true,
        showQuickJumper: true,
        total: totalElements, 
        pageSize: size, 
        defaultCurrent: 1,
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
    const roleEdit = (key, rowData) => {
      this.setState({
        current:rowData,
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
        dataIndex: 'parentfuncname',
        key: 'parentfuncname',
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
                onClick={({ key }) => roleEdit(key, record)}
                type="primary"
                style={{ marginRight: '8px' }}
              />
            </Tooltip>
            <Tooltip title="删除">
              <Button
                icon="delete"
                onClick={({ key }) => roleDelete(key, record.pkParentfunc )}
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
                placeholder="请输入名称"
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
        <AddMenu modalVisible={this.state.modalVisible} {...parentMethods} updateResult={current} />
      </PageHeaderWrapper>
    );
  }
}
export default MenuManage;
