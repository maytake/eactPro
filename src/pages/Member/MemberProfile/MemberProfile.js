import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Row, Col, Card, Form, Input, Badge, Button, Select, Modal, message, Table, Tooltip, Divider, DatePicker } from 'antd';
import Link from 'umi/link';
import { AddKey } from '@/utils/utils';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './MemberProfile.less';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

@connect(({ memberProfile, loading }) => ({
  memberProfile,
  loading: loading.effects['memberProfile/fetchData'],
}))
@Form.create()
class MemberProfile extends PureComponent {
  colLayout = {
    xl: 6,
    lg: 8,
    sm: 24,
  };
  
  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      loading: false,
      current:{},
    };
  }

  componentDidMount() {
    this.getData();
  };

  getData(params){
    const { dispatch } = this.props;
    dispatch({
      type: 'memberProfile/fetchData',
      payload: {
        page: "1",
        pageSize : "20",
        sortType: "auto",
        sel:"starttime",
        grade:"auto",
        starttime:"auto"
        },
    });
  };
  
  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'memberProfile/fetchData',
      payload: {
        page: pagination.current,
        pageSize : pagination.pageSize,
        sortType: "auto",
        sel:"starttime",
        grade:"auto",
        starttime:"auto"
        },
    });
  };

  handleAdd = fields => {
    message.success(fields.desc);
  };

  
  handleSubmit(e) {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      console.log(fieldsValue)
      const rangeValue = fieldsValue.time;
      if (err) return;
      dispatch({
        type: 'memberProfile/fetchData',
        payload: {
          page: 1,
          pageSize : 20,
          sortType: "auto",
          sel:"starttime",
          grade:"auto",
          starttime:"auto",
          ...fieldsValue,
          firstStartTime:rangeValue&&rangeValue[0].format('YYYY-MM-DD'),
          firstEndTime:rangeValue&&rangeValue[1].format('YYYY-MM-DD'),
          },
      });
      
    });
  }
  
  deleteItem(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'memberProfile/remove',
      payload: {
        pkMembermgcust:id,
      },
      callback:()=>{
        this.getData();
      }
    });
    
  }

  Add() {
    localStorage.removeItem('memberId');
    router.push('/member/memberProfile/addMember/memberInfo')
  }

  Edit(id){
    router.push({
      pathname: '/member/memberProfile/addMember/memberInfo',
      query:{id}
    });
  }

  SwitchStatus(key, status, id){
    const { dispatch } = this.props;
    if(status!==2){
      dispatch({
        type: 'memberProfile/stop',
        payload: {
          pkMembermgcust:id,
        },
        callback:()=>{
          this.getData();
        }
      });
    }else{
      dispatch({
        type: 'memberProfile/start',
        payload: {
          pkMembermgcust:id,
        },
        callback:()=>{
          this.getData();
        }
      });
    }

  };

  BatchSwitchStatus(status){
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    dispatch({
      type: `memberProfile/${status}`,
      payload: {
        pkMembermgcust:selectedRows,
      },
      callback:()=>{
        this.getData();
      }
    });
  }

  BatchStopStatus(){
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    dispatch({
      type: 'memberProfile/batchStop',
      payload: {
        pkMembermgcust:selectedRows,
      },
      callback:()=>{
        this.getData();
      }
    });
  }

  render() {
 
    const { getFieldDecorator } = this.props.form;
    const {
      match,
      loading,
      memberProfile: { dataSource},
    } = this.props;
    
    const { content, totalElements, size }=dataSource;
   
    let resData;
    if(Object.keys(dataSource).length!==0){
      resData= AddKey(content, 'pkMembermgcust'); 
    };
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      defaultCurrent: 1,
      total: totalElements,
      pageSize: size,
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

    const columns = [
      {
        title: '序号',
        dataIndex: 'rn',
        key: 'rn',
      },
      {
        title: '会员姓名',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
            const id =record.pkMembermgcust
            return (
                <Link to={{ pathname :`${match.url}/addMember/memberInfo`, query: { id }}}> {text }</Link>
            );
        },
      },
      {
        title: '会员编码',
        dataIndex: 'membercode',
        key: 'membercode',
      },
      {
        title: '电话',
        dataIndex: 'mobilephone',
        key: 'mobilephone',
      },
      {
        title: '等级',
        dataIndex: 'gradename',
        key: 'gradename',
      },
      {
        title: '证件号',
        dataIndex: 'paperscode',
        key: 'paperscode',
      },
      {
        title: '车牌号',
        dataIndex: 'licenseplate',
        key: 'licenseplate',
      },
      {
        title: '车架号',
        dataIndex: 'carframeno',
        key: 'carframeno',
      },
      {
        title: '入会日期',
        dataIndex: 'firstStartTime',
        key: 'firstStartTime',
      },
      {
        title: '入会4S店',
        dataIndex: 'foursname',
        key: 'foursname',
      },
      {
        title: '状态',
        dataIndex: 'vstatus',
        key: 'vstatus',
        render: text => {
          // eslint-disable-next-line no-nested-ternary
          return text === 1 ? <Badge status="success" text='启用' /> : text === 2 ? <Badge status="error" text="停用" /> : <Badge status="default" text="未启用" />;
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 155,
        render: (text, record) => {
          const canstop = record.vstatus !== 2;
          return (
            <Fragment>
              <Tooltip title={canstop ? '停用' : '启用'}>
                <Button
                  icon={canstop ? 'pause-circle' : 'play-circle'}
                  onClick={({ key }) => this.SwitchStatus(key, record.vstatus, record.pkMembermgcust)}
                  type="primary"
                  style={{ marginRight: '8px' }}
                />
              </Tooltip>
              <Tooltip title="编辑">
                <Button
                  icon="edit"
                  onClick={() => this.Edit(record.pkMembermgcust)}
                  type="primary"
                  style={{ marginRight: '8px' }}
                />
              </Tooltip>
              <Tooltip title="删除">
                <Button
                  icon="delete"
                  onClick={({ key }) => Delete(key, record.pkMembermgcust)}
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
        this.setState({
          selectedRows: selectedRowKeys,
        });
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
                  <FormItem {...this.formItemLayout} label='姓名：'>
                    {getFieldDecorator('name')(
                      <Input placeholder="请输入会员姓名" />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem {...this.formItemLayout} label='电话：'>
                    {getFieldDecorator('mobilephone')(
                      <Input type="text" placeholder="请输入会员手机号" />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem {...this.formItemLayout} label='会员编码：'>
                    {getFieldDecorator('membercode')(
                      <Input type="text" placeholder="请输入会员编码" />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem {...this.formItemLayout} label='微信号：'>
                    {getFieldDecorator('openId')(
                      <Input type="text" placeholder="请输入会员微信OPENID" />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem {...this.formItemLayout} label='车牌：'>
                    {getFieldDecorator('licenseplate')(
                      <Input placeholder="请输入车牌号码" />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem {...this.formItemLayout} label='车架：'>
                    {getFieldDecorator('carframe')(
                      <Input type="text" placeholder="请输入车架号" />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem {...this.formItemLayout} label='会员等级：'>
                    {getFieldDecorator('grades')(
                      <Select
                        allowClear
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
                  <FormItem {...this.formItemLayout} label='4S店：'>
                    {getFieldDecorator('foursshop')(
                      <Select
                        allowClear
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
                  <FormItem {...this.formItemLayout} label='状态：'>
                    {getFieldDecorator('vstatus')(
                      <Select
                        allowClear
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
                  <FormItem {...this.formItemLayout} label='入会时间：'>
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
                <Button type="primary" onClick={()=>this.BatchSwitchStatus('batchStart')}>
                  批量启用
                </Button>
                <Button type="primary" onClick={()=>this.BatchSwitchStatus('batchStop')}>
                  批量停用
                </Button>
              </div>
            </div>

            <Table
              loading={loading}
              rowSelection={rowSelection}
              dataSource={resData}
              pagination={paginationProps}
              columns={columns}
              onChange={this.handleTableChange}
            />
          </div>
        </Card>


      </PageHeaderWrapper>
    );
  }
}
export default MemberProfile;

