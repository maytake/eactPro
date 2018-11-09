import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,

  Button,
  Card,

} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;


@connect(({ loading }) => ({
  submitting: loading.effects['changepassword/submitRegularForm'],
}))
@Form.create()
class ChangePw extends PureComponent {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'changepassword/submitRegularForm',
          payload: {
            oldPwd:values.oldpassword,
            newPwd:values.newpassword,
          },
        });
      }
    });
  };

  render() {
    const { submitting, history,form } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    const checkConfirm = (rule, value, callback) => {
      if (value && value !== form.getFieldValue('newpassword')) {
        callback('两次输入的密码不匹配!');
      } else {
        callback();
      }
    };
    const checkPassword = (rule, value, callback) => {
      const pass = /^\S*([a-zA-Z]+\S*[0-9]+|[0-9]+\S*[a-zA-Z]+)\S*$/.test(value);
      if (!value) {
        callback('请输入密码！');
      } else if (value.length < 8 && !pass) {
          callback('密码有误！');
        } else {
          callback();
        }
    };
    return (
      <PageHeaderWrapper
        title="修改密码"
       
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="旧密码">
              {getFieldDecorator('oldpassword', {
                rules: [
                  {
                    required: true,
                    message: '请输入旧密码',
                  },
                ],
              })(<Input type="password" placeholder="请输入旧密码" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="新密码">
              {getFieldDecorator('newpassword', {
                rules: [
                  {
                    validator: checkPassword,
                  },
                ],
              })(<Input type="password" placeholder="请输入新密码" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="再输入新密码">
              {getFieldDecorator('checkpassword', {
                rules: [
                  {
                    required: true,
                    message: '请再输入新密码',
                    
                  },
                  {
                    validator: checkConfirm,
                  },
                ],
              })(<Input type="password" placeholder="请再输入新密码" />)}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={() => history.go(-1)}>返回</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ChangePw;
