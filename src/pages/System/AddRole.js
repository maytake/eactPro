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
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './AddRole.less';
import RoleTree from '@/components/RoleTree'


const FormItem = Form.Item;
const Option = Select.Option;



@connect(({ addRole, loading }) => ({
    addRole,
    loadings: loading.effects['addRole/fetchBasic'],
}))
@Form.create()
class AddRole extends PureComponent {
    state = {

    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'AddRole/fetchBasic',
        });
    };





    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }


    render() {
        const { addRole, cardsLoading, history } = this.props;
        const { getFieldDecorator } = this.props.form;
        console.log(this.props.location.query.id);
        return (
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <h1 className={styles.roleTitle}>新增角色</h1>
                    <Form onSubmit={this.handleSubmit} className="ant-advanced-search-form">
                        <div className={styles.roleForm}>

                            <Row gutter={24}>
                                <Col xl={6} lg={8} sm={24}>
                                    <FormItem label='角色名称：'>
                                        {getFieldDecorator('roleName', {
                                            rules: [{ required: true, message: '请输入角色名称!' }],
                                        })(
                                            <Input placeholder="请输入角色名称" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xl={6} lg={8} sm={24}>
                                    <FormItem label='角色编码：'>
                                        {getFieldDecorator('roleCode', {
                                            rules: [{ required: true, message: '请输入角色编码!' }],
                                        })(
                                            <Input type="password" placeholder="请输入角色编码" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xl={6} lg={8} sm={24}>
                                    <FormItem label='角色状态：'>
                                        {getFieldDecorator('status', {
                                            rules: [{ required: true, message: '请选择角色状态!' }],
                                        })(
                                            <Select
                                                placeholder="请选择角色状态"
                                                onChange={this.handleSelectChange}
                                            >
                                                <Option value="Y">启用</Option>
                                                <Option value="N">停用</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col xl={6} lg={8} sm={24}>
                                    <FormItem label='角色类型：'>
                                        {getFieldDecorator('type', {
                                            rules: [{ required: true, message: '请选择角色类型!' }],
                                        })(
                                            <Select
                                                placeholder="请选择角色类型"
                                                onChange={this.handleSelectChange}
                                            >
                                                <Option value="1">集团管理员</Option>
                                                <Option value="2">集团业务员</Option>
                                                <Option value="3">4S店管理员</Option>
                                                <Option value="4">4S店业务员</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>


                        </div>
                        <h1 className={styles.roleTitle}>权限列表</h1>
                        <div className={styles.roleAuthority}>
                            <div className={styles.roleBorder}>
                                <RoleTree />            
                            </div>
                        </div>

                        <FormItem className="ant-form-split">
                            <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                                保存
                            </Button>
                            <Button onClick={() => history.push('/system/role')}>
                                返回
                            </Button>
                        </FormItem>

                    </Form>
                </Card>

            </PageHeaderWrapper>
        );
    }
}
export default AddRole;