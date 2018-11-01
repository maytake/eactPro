import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Row, Col, Card, Form, Input, Button, Select, Modal, message, Table, Tooltip, Divider, DatePicker } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './MemberProfile.less';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

@connect(({ role, loading }) => ({
  role,
  loadings: loading.effects['role/fetchBasic'],
}))
@Form.create()
class MemberProfile extends PureComponent {
  colLayout = {
    xl: 6,
    lg: 8,
    sm: 24,
  };

  state = {
    modalVisible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userManagement/fetchBasic',
    });
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = fields => {
    message.success(fields.desc);
    this.handleModalVisible();
  };

  deleteItem(id) {
    message.success('This is a message of success ');
    console.log(id);
  }

  Add() {
    router.push('/member/memberProfile/addMember')
  }



  render() {
    const { modalVisible } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    const { getFieldDecorator, history } = this.props.form;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      defaultCurrent: 2,
      total: 100,
      pageSize: 10,
    };

    const SwitchStatus = (key, status, id) => {
      message.success(status);
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
    const dataSource = [
      {
        serialNumber: '1',
        name: '王莹莹',
        code: 'HYBM20181014028867',
        phone: '150****2128',
        Level: '银卡',
        IDNo: '35260119800413002X',
        carNumber: '闽D7023Q',
        VIN: 'LFV2A21K9D4251687',
        time: '2018-10-14',
        shop: '厦门致远',
      }, {
        serialNumber: '2',
        name: '王莹莹',
        code: 'HYBM20181014028867',
        phone: '150****2128',
        Level: '银卡',
        IDNo: '35260119800413002X',
        carNumber: '闽D7023Q',
        VIN: 'LFV2A21K9D4251687',
        time: '2018-10-14',
        shop: '厦门致远',
      },


    ];

    const columns = [
      {
        title: '序号',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
      },
      {
        title: '会员姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '会员编码',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '等级',
        dataIndex: 'Level',
        key: 'Level',
      },
      {
        title: '证件号',
        dataIndex: 'IDNo',
        key: 'IDNo',
      },
      {
        title: '车牌号',
        dataIndex: 'carNumber',
        key: 'carNumber',
      },
      {
        title: '车架号',
        dataIndex: 'VIN',
        key: 'VIN',
      },
      {
        title: '入会日期',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '入会4S店',
        dataIndex: 'shop',
        key: 'shop',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: text => {
          return text === '1' ? '启用' : '停用';
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 155,
        render: (text, record) => {
          const start = record.status === '1';
          return (
            <Fragment>
              <Tooltip title={start ? '启用' : '停用'}>
                <Button
                  icon={start ? 'play-circle' : 'pause-circle'}
                  onClick={({ key }) => SwitchStatus(key, record.status, record.key)}
                  type="primary"
                  style={{ marginRight: '8px' }}
                />
              </Tooltip>
              <Tooltip title="编辑">
                <Button
                  icon="edit"
                  onClick={() => this.handleModalVisible(true)}
                  type="primary"
                  style={{ marginRight: '8px' }}
                />
              </Tooltip>
              <Tooltip title="删除">
                <Button
                  icon="delete"
                  onClick={({ key }) => Delete(key, record.key)}
                  type="primary"
                />
              </Tooltip>
            </Fragment>
          );
        },
      },
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      }
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <h1 className={styles.roleTitle}>会员档案列表</h1>
          <Form onSubmit={this.handleSubmit} className="ant-search-form">
            <div className={styles.roleForm}>

              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem {...formItemLayout} label='姓名：'>
                    {getFieldDecorator('name')(
                      <Input placeholder="请输入会员姓名" />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem {...formItemLayout} label='电话：'>
                    {getFieldDecorator('phone')(
                      <Input type="text" placeholder="请输入会员手机号" />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem {...formItemLayout} label='会员编码：'>
                    {getFieldDecorator('code')(
                      <Input type="text" placeholder="请输入会员编码" />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem {...formItemLayout} label='微信号：'>
                    {getFieldDecorator('wechat')(
                      <Input type="text" placeholder="请输入会员微信OPENID" />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem {...formItemLayout} label='车牌：'>
                    {getFieldDecorator('carNumber')(
                      <Input placeholder="请输入车牌号码" />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem {...formItemLayout} label='车架：'>
                    {getFieldDecorator('VIN')(
                      <Input type="text" placeholder="请输入车架号" />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem {...formItemLayout} label='会员等级：'>
                    {getFieldDecorator('level')(
                      <Select
                        placeholder="请选择会员等级"
                        onChange={this.handleSelectChange}
                      >
                        <Option value="251">普卡</Option>
                        <Option value="252">银卡</Option>
                        <Option value="253">金卡</Option>
                        <Option value="254">钻石卡</Option>
                        <Option value="255">至尊钻石卡</Option>
                      </Select>
                      
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem {...formItemLayout} label='4S店：'>
                    {getFieldDecorator('shop')(
                      <Select
                        placeholder="请选择4S店"
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
              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem {...formItemLayout} label='标签：'>
                    {getFieldDecorator('tags')(
                      <Select
                        placeholder="请选择标签"
                        onChange={this.handleSelectChange}
                      >
                        <Option value="Y">启用</Option>
                        <Option value="N">停用</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem {...formItemLayout} label='状态：'>
                    {getFieldDecorator('status')(
                      <Select
                        placeholder="请选择状态"
                        onChange={this.handleSelectChange}
                      >
                        <Option value="0">启用</Option>
                        <Option value="1">停用</Option>
                        <Option value="2">未开通</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem {...formItemLayout} label='入会时间：'>
                    {getFieldDecorator('time')(<RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />)}
                  </FormItem>
                 
                </Col>
                <Col {...this.colLayout}>
                  <div className="ant-col-xs-24 ant-col-sm-6"></div>
                  <div className="ant-col-xs-24 ant-col-sm-18">
                    <Button type="primary" htmlType="submit">
                      搜索
                    </Button>
                  </div>
                  
                </Col>

              </Row>
            </div>



          </Form>
          <Divider />
          <div className="tableList">
            <div className="tableListOperator">
              <div className="newBtn">
                <Button icon="plus" type="primary" onClick={() => this.Add()}>
                  新建
                </Button>

              </div>
              <div className="rightButton">
                <Button icon="upload" type="primary">
                  导出
                </Button>
                <Button type="primary">
                  批量启用
                </Button>
                <Button type="primary">
                  批量停用
                </Button>
              </div>
            </div>

            <Table
              rowSelection={rowSelection}
              dataSource={dataSource}
              pagination={paginationProps}
              columns={columns}
            />
          </div>
        </Card>


      </PageHeaderWrapper>
    );
  }
}
export default MemberProfile;

