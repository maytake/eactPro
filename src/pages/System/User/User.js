import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Link from 'umi/link';
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
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './User.less';

const FormItem = Form.Item;


@connect(({ role, loading }) => ({
    role,
    loadings: loading.effects['role/fetchBasic'],
}))
@Form.create()
class User extends PureComponent {
    state = {

    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'userManagement/fetchBasic',
        });
    };

    deleteItem(id) {
        message.success('This is a message of success ');
        console.log(id);
    };

    Add(){
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
                    <Col md={20} sm={16}>
                        <FormItem label="角色名称">
                            {getFieldDecorator('name')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col md={4} sm={16}>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    };

    render() {
        const {dispatch, cardsLoading } = this.props;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            defaultCurrent:2,
            total:100,
            pageSize:10,
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
        const Edit=(key, id) => {
            dispatch(routerRedux.push({
                pathname:'/system/role/addrole',
                query:{id}
            }))
        };
        
        const dataSource = [{
            key: '1',
            name: '开发人员',
            code: 1001031,
            type: '4S店服务顾问',
            status: '启用',
        }, {
            key: '2',
            name: '开发人员',
            code: 1001031,
            type: '4S店服务顾问',
            status: '启用',
        }];


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
            render: (text, record) => (
                <span>
                    <Button icon="edit" onClick={({ key }) => Edit(key, record.key)} type="primary" style={{marginRight:"8px"}}></Button>
                    <Button icon="delete" onClick={({ key }) => Delete(key, record.key)} type="primary"></Button>
                </span>
            ),
        }];

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
                        />
                    </div>
                </Card>

            </PageHeaderWrapper>
        );
    }
}
export default User;