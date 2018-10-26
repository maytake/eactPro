import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import { routerRedux } from 'dva/router';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Button,
    Modal,
    message,
    Table,
    Tooltip,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Role.less';

const FormItem = Form.Item;
const { Search } = Input;

@connect(({ role, loading }) => ({
    role,
    loading: loading.models.role,
}))
@Form.create()
class Role extends PureComponent {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.state = {
       
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'role/fetchData',
        });
    };

    handleSearch(v) {
        const { dispatch } = this.props;
        dispatch({
          type: 'role/fetchData',
          payload: { name: v },
        });
        router.push({
          pathname: '/system/role',
          query:{name:v}
        })
      }

    deleteItem(id) {
        const {
            dispatch,
          } = this.props;
          dispatch({
            type: 'role/remove',
            payload: {
              desc: id,
            },
            callback: (data) => {
                message.success(data.msg);
              },
          });
    };

    AddRole(){
        this.props.dispatch(routerRedux.push({
            pathname:'/system/role/addrole',
        }))
    };

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
    };

    render() {
        const {dispatch, 
            role:{data}, 
            loading } = this.props;
        const datas =data.dataSource;
        if(!datas){return null}
        const { list, pagination }=datas;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            ...pagination,
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
        const roleEdit=(key, id) => {
            dispatch(routerRedux.push({
                pathname:'/system/role/addrole',
                query:{id}
            }))
        };
        

        const columns = [{
            title: '角色名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '角色编码',
            dataIndex: 'code',
            key: 'code',
        }, {
            title: '角色类型',
            dataIndex: 'type',
            key: 'type',
        }, {
            title: '角色状态',
            dataIndex: 'status',
            key: 'status',
        }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width:'155px',
            render: (text, record) => (
                <span>
                    <Tooltip title="编辑">
                        <Button icon="edit" onClick={({ key }) => roleEdit(key, record.key)} type="primary" style={{marginRight:"8px"}}></Button>
                    </Tooltip>
                    <Tooltip title="删除">
                        <Button icon="delete" onClick={({ key }) => roleDelete(key, record.key)} type="primary"></Button>
                    </Tooltip>
                </span>
            ),
        }];

        return (
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" onClick={() => this.AddRole()}>
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
                            dataSource={list}
                            pagination={paginationProps} 
                            columns={columns} 
                            loading={loading} 
                        />
                    </div>
                </Card>

            </PageHeaderWrapper>
        );
    }
}
export default Role;