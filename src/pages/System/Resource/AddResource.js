import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
    Input,
    Modal,
    Form,
    DatePicker,
    Select,
} from 'antd';
import styles from './AddResource.less';

const FormItem = Form.Item;
const SelectOption = Select.Option;

@Form.create()
class AddResource extends PureComponent {

    state = { visible: true } 

    formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
    
    handleOk = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }

    handleCancel = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }

    render() {
        const {
            form: { getFieldDecorator },
        } = this.props;

        const { visible, current = {} } = this.state;

        const getModalContent = () => {
            return (
              <Form onSubmit={this.handleSubmit}>
                <FormItem label="任务名称" {...this.formLayout}>
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: '请输入任务名称' }],
                    initialValue: current.title,
                  })(<Input placeholder="请输入" />)}
                </FormItem>
                <FormItem label="开始时间" {...this.formLayout}>
                  {getFieldDecorator('createdAt', {
                    rules: [{ required: true, message: '请选择开始时间' }],
                    initialValue: current.createdAt ? moment(current.createdAt) : null,
                  })(
                    <DatePicker
                      showTime
                      placeholder="请选择"
                      format="YYYY-MM-DD HH:mm:ss"
                      style={{ width: '100%' }}
                    />
                  )}
                </FormItem>
                <FormItem label="任务负责人" {...this.formLayout}>
                  {getFieldDecorator('owner', {
                    rules: [{ required: true, message: '请选择任务负责人' }],
                    initialValue: current.owner,
                  })(
                    <Select placeholder="请选择">
                      <SelectOption value="付晓晓">付晓晓</SelectOption>
                      <SelectOption value="周毛毛">周毛毛</SelectOption>
                    </Select>
                  )}
                </FormItem>

              </Form>
            );
          };

        return (
            <Modal
                title="新增用户"
                className={styles.standardListForm}
            width={800}
            bodyStyle={{ padding: '28px 0 0' }}
                destroyOnClose
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            >
            {getModalContent()}
            </Modal>
        );
    }
}
export default AddResource;