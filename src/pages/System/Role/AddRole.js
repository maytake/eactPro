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

@connect(({ role, loading }) => ({
    role,
    cardsLoading: loading.models.role,
}))
@Form.create()
class AddRole extends PureComponent {

    colLayout = {
        xl:6, 
        lg:8,
        sm:24,
    };

    constructor(props) {
        super(props);
        this.state = {
  
        };
      }
    
    componentDidMount() {
        const { dispatch} = this.props;
        const id=this.props.location.query.id;
        if(id){
            
              dispatch({
                type: 'role/getUpdate',
                payload: {
                  desc: id,
                },
              });
        }

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
        const { 
            role:{updateResult}, 
            cardsLoading, 
            history } = this.props;
        const { getFieldDecorator } = this.props.form;
        const id=this.props.location.query.id;
        let current;
        if(id){
             current=updateResult.content?updateResult.content:{};
        }else{
             current={};
        }   
        return (
            <PageHeaderWrapper>
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
                                            <Input placeholder="请输入角色名称" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col {...this.colLayout}>
                                    <FormItem label='角色编码：'>
                                        {getFieldDecorator('roleCode', {
                                            rules: [{ required: true, message: '请输入角色编码!' }],
                                            initialValue: current.roleCode,
                                        })(
                                            <Input type="text" placeholder="请输入角色编码" />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col {...this.colLayout}>
                                    <FormItem label='角色状态：'>
                                        {getFieldDecorator('status', {
                                            rules: [{ required: true, message: '请选择角色状态!' }],
                                            initialValue: current.status,
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
                                <Col {...this.colLayout}>
                                    <FormItem label='角色类型：'>
                                        {getFieldDecorator('type', {
                                            rules: [{ required: true, message: '请选择角色类型!' }],
                                            initialValue: current.type,
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
                        <h1 className={styles.roleTitle} style={{ marginBottom: '-1px' }}>权限列表</h1>
                        <div className={styles.roleAuthority}>
                            <div className={styles.roleBorder}>
                                <FormItem>
                                    {getFieldDecorator('permission', {
                                        initialValue: current.permission,
                                    })(<RoleTree /> )}
                                </FormItem>           
                            </div>
                        </div>

                        <FormItem className="ant-form-split">
                            <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                                保存
                            </Button>
                            <Button onClick={() => history.go(-1)}>
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