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
    Select,
    Icon,
    Button,
    Dropdown,
    Menu,
    InputNumber,
    DatePicker,
    Modal,
    message,
    Radio,
    Table,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Role.less';

const FormItem = Form.Item;
const { Search, TextArea } = Input;

@connect(({ role, loading }) => ({
    role,
    loadings: loading.effects['role/fetchBasic'],
}))
@Form.create()
class Role extends PureComponent {
    state = {

    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'role/fetchBasic',
        });
    };

    deleteItem(id) {
        message.success('This is a message of success ');
        console.log(id);
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
        const {dispatch, role, cardsLoading } = this.props;
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
                    <Button icon="edit" onClick={({ key }) => roleEdit(key, record.key)} type="primary" style={{marginRight:"8px"}}></Button>
                    <Button icon="delete" onClick={({ key }) => roleDelete(key, record.key)} type="primary"></Button>
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
                                onSearch={value => console.log(value)}
                            />
                        </div>
                        
                        <Table dataSource={dataSource} columns={columns} loading={cardsLoading} />
                    </div>
                </Card>

            </PageHeaderWrapper>
        );
    }
}
export default Role;