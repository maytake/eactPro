import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Select,
    Button,
    Spin,
} from 'antd';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './AddRole.less';
import RoleTree from '@/components/RoleTree'

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ addRole, loading }) => ({
    addRole,
    cardsLoading: loading.models.addRole,
}))
@Form.create()
class AddRole extends PureComponent {

    colLayout = {
        xl: 6,
        lg: 8,
        sm: 24,
    };

    constructor(props) {
        super(props);
        this.state = {

        };
        this.formData = {};
        this.permissonslist = [];
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const id = this.props.location.query.id;
        dispatch({
            type: 'addRole/getPermissions',
            payload: {
                page: "1",
                pageSize: "20",
                sortType: "auto"
            },
        });
        if (id) {
            dispatch({
                type: 'addRole/toUpdate',
                payload: { id },
            });
        } else {
            dispatch({
                type: 'addRole/toAdd',
            });
        }
    };

    handleSubmit = (e) => {
        const id = this.props.location.query.id;
        e.preventDefault();
        const { form, dispatch } = this.props;
        form.validateFields((err, values) => {
            const entity = this.formData;
            const permissionId = values.checkedKeys;
            const permList = this.findPermissonList(permissionId);
            entity.functions = permList;
            const data=values;
            delete entity.checkedKeys
            delete data.checkedKeys
 
            const params = {
                ...entity,
                ...data,
            };
            console.log(params);
            if (!err) {
                if (id) {
                    dispatch({
                        type: 'addRole/update',
                        payload: {
                            ...params
                        },
                        callback: () => {
                            router.push({
                                pathname: '/system/role',
                            })
                        }
                    });
                } else {
                    dispatch({
                        type: 'addRole/add',
                        payload: {
                            ...params
                        },
                        callback: () => {
                            router.push({
                                pathname: '/system/role',
                            })
                        }
                    });
                }
            }
        });
    }

    isArray = (obj) => {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    findPermissonList(idArray) {
        const newArRr = [];
        if (this.isArray(idArray) && this.isArray(this.permissonslist)) {
            idArray.forEach(n => {
                const id = n.split('_').pop();
           
                this.permissonslist.forEach(item => {
                    if (String(item.id) === id) {
                        const newlist = {
                            funcCode: item.funcCode,
                            funcName: item.funcName,
                            funcType: item.funcType,
                            id: String(item.id),
                        };
                        newArRr.push(newlist);
                    }

                });

            })
        }
        return newArRr;
    }


    render() {
        const {
            addRole: { entity, permissions },
            cardsLoading,
            location,
            history } = this.props;
        const { getFieldDecorator } = this.props.form;
        const isView = location.query.view && true || false;
        const { permList = [], permList2 = [] } = permissions;
        const current =  entity || {};

        this.formData = current;
        this.permissonslist = permList;
        const roleTypeOption = entity.roleList;
        const getIdList = current.functions || [];
        
        // 编辑时候，根据获取的权限ID查找list,传给后台
        const getAllPermissonId = getIdList.map((item) => {
            return {
                id: item.id,
                funcType: item.funcType,
            };
        });
        const newPermissionList=[];
        getAllPermissonId.forEach(n => {
            this.permissonslist.forEach(item => {
                if (item.id === n.id && item.funcType === n.funcType) {
                    newPermissionList.push(item);
                }
            });
        });

        const getPermissonId = newPermissionList.map((item) => {
            const pId = item.parentId ? `${item.parentId}_${item.id}` : item.id;
            return String(pId);
        });
     
        current.checkedKeys = getPermissonId;
        const getOption = (data = [], name, value) => {
            return data.map((item) => (
                <Option key={item[value]} value={String(item[value])}>
                    {item[name]}
                </Option>
            ));
        };


        return (
            <PageHeaderWrapper>
                <Spin spinning={cardsLoading}>
                    <Card bordered={false} loading={cardsLoading}>
                        <h1 className={styles.roleTitle}>新增角色</h1>
                        <Form onSubmit={this.handleSubmit} className="ant-advanced-search-form">
                            <div className={styles.roleForm}>

                                <Row gutter={24}>
                                    <Col {...this.colLayout}>
                                        <FormItem label='角色名称：'>
                                            {getFieldDecorator('roleName', {
                                                rules: [{ required: true, message: '请输入角色名称!' }],
                                                initialValue: current.roleName,
                                            })(
                                                <Input type="text" disabled={isView} placeholder="请输入角色名称" />
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col {...this.colLayout}>
                                        <FormItem label='角色编码：'>
                                            {getFieldDecorator('roleCode', {
                                                rules: [{ required: true, message: '请输入角色编码!' }],
                                                initialValue: current.roleCode,
                                            })(
                                                <Input type="text" disabled={isView} placeholder="请输入角色编码" />
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col {...this.colLayout}>
                                        <FormItem label='角色状态：'>
                                            {getFieldDecorator('isActive', {
                                                rules: [{ required: true, message: '请选择角色状态!' }],
                                                initialValue: current.isActive,
                                            })(
                                                <Select
                                                    allowClear
                                                    disabled={isView}
                                                    placeholder="请选择角色状态"
                                                    onChange={this.handleSelectChange}
                                                >
                                                    <Option value="Y">启用</Option>
                                                    <Option value="N">停用</Option>
                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col {...this.colLayout}>
                                        <FormItem label='角色类型：'>
                                            {getFieldDecorator('roleType', {
                                                rules: [{ required: true, message: '请选择角色类型!' }],
                                                initialValue: current.roleType && Number(current.roleType),
                                            })(
                                                <Select
                                                    allowClear
                                                    disabled={isView}
                                                    placeholder="请选择角色类型"
                                                    onChange={this.handleSelectChange}
                                                >
                                                    {getOption(roleTypeOption, 'value', 'key')}
                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>


                            </div>
                            <h1 className={styles.roleTitle} style={{ marginBottom: '-1px' }}>权限列表</h1>
                            <div className={styles.roleAuthority}>
                                <div className={styles.roleBorder}>
                                    <FormItem>
                                        {getFieldDecorator('checkedKeys', {
                                            initialValue: current.checkedKeys,
                                        })(<RoleTree treeData={permList2} disabled={isView} />)}
                                    </FormItem>
                                </div>
                            </div>

                            <FormItem className="ant-form-split">
                                <Button disabled={isView} type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                                    保存
                                </Button>
                                <Button onClick={() => history.go(-1)}>
                                    返回
                                </Button>
                            </FormItem>

                        </Form>
                    </Card>
                </Spin>
            </PageHeaderWrapper>
        );
    }
}
export default AddRole;