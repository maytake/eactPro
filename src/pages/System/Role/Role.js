import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import { AddKey } from '@/utils/utils';

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
    Badge,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Role.less';

const FormItem = Form.Item;
const { Search } = Input;

@connect(({ role, loading }) => ({
    role,
    loading: loading.effects['role/fetchData'],
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
        this.getData();
    };

    getData(pagination = {}, name) {
        const { dispatch } = this.props;
        dispatch({
            type: 'role/fetchData',
            payload: {
                page: pagination.current || 1,
                pageSize: pagination.pageSize || 10,
                sortType: "auto",
                roleName: name,
            },
        });
    };

    handleTableChange = (pagination) => {
        this.getData(pagination)
    };

    handleSearch(v) {
        this.getData({},v);
        router.push({
            pathname: '/system/role',
            query: { roleName: v }
        })
    }

    deleteItem(id) {
        const {
            dispatch,
        } = this.props;
        dispatch({
            type: 'role/remove',
            payload: {
                id,
            }
        });
    };

    AddRole() {
      router.push({
            pathname: '/system/role/addrole',
        })
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
        const { dispatch,
            role: { data },
            loading } = this.props;

        const { content = [], totalElements, size } = data;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            defaultCurrent: 1,
            total: totalElements,
            pageSize: size,
        };

        if (Object.keys(content).length !== 0) {
            AddKey(content, 'id');
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
            router.push({
                pathname: '/system/role/addrole',
                query: { id }
            });
        };


        const columns = [{
            title: '角色名称',
            dataIndex: 'roleName',
            key: 'roleName',
            render: (text, record) => {
                const id = record.id
                return (
                    <Link to={{
                        pathname: '/system/role/addrole',
                        query: { id, view: 'true', }
                    }}
                    > {text}
                    </Link>
                );
            },
        }, {
            title: '角色编码',
            dataIndex: 'roleCode',
            key: 'roleCode',
        }, {
            title: '角色类型',
            dataIndex: 'roleType',
            key: 'roleType',
            render: text => {
                switch (text) {
                    case '1':
                        return '集团运营人员'
                    case '2':
                        return '集团管理员'
                    case '3':
                        return '4S店管理员'
                    case '4':
                        return '4S店服务顾问'
                    default:
                        break;
                }
            },
        }, {
            title: '角色状态',
            dataIndex: 'isActive',
            key: 'isActive',
            render: text => {
                return text === 'Y' ? <Badge status="success" text='启用' /> : <Badge status="default" text="未启用" />;
            },
        }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: '155px',
            render: (text, record) => (
                <span>
                    <Tooltip title="编辑">
                        <Button icon="edit" onClick={({ key }) => roleEdit(key, record.key)} type="primary" style={{ marginRight: "8px" }}></Button>
                    </Tooltip>
                    <Tooltip title="删除">
                        <Button icon="delete" onClick={({ key }) => roleDelete(key, record.id)} type="primary"></Button>
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
                            dataSource={content}
                            pagination={paginationProps}
                            onChange={this.handleTableChange}
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