import React, { PureComponent, Fragment } from 'react';
import {
  Card,
  Button,
  Form,
  Icon,
  Col,
  Row,
  DatePicker,
  TimePicker,
  Input,
  Select,
  Upload,
  Popover,
} from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import styles from './MemberInfo.less';

const Search = Input.Search;
const FormItem = Form.Item;
const { Option, OptGroup } = Select;
const { RangePicker } = DatePicker;
// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }) => (
  <Fragment>
    <div className={styles.avatar_title}>上传头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload fileList={[]}>
      <div className={styles.button_view}>
        <Button icon="upload">
          更换头像
        </Button>
      </div>
    </Upload>
  </Fragment>
);

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
@Form.create()
class MemberInfo extends PureComponent {
  colLayout = {
    xl: 8,
    md: 12,
    sm: 24,
  };

  colLayout4 = {
    xl: 6,
    md: 12,
    sm: 24,
  };

  constructor(props) {
    super(props);
    this.state = {
      current: {
        headOffice: '',
        group: '',
        shop: ''
      },
    }
  }

  getAvatarURL() {
    const { currentUser } = this.props;
    if (currentUser.avatar) {
      return currentUser.avatar;
    }
    const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    return url;
  }


  render() {

    const {
      form: { getFieldDecorator },
    } = this.props;

    const { current } = this.state;



    return (

      <Form hideRequiredMark className={styles.labelItem}>
        <div className="ant-card-head">
          <div className="ant-card-head-wrapper">
            <div className="ant-card-head-title">APICommonData</div>
          </div>
        </div>

        <div className="ant-card-body">
          <Row gutter={24}>
            <Row gutter={24}>
              <Col {...this.colLayout4}>
                <FormItem label="APP">
                  {getFieldDecorator('isDownloadDescri', {
                    rules: [{ required: true, message: '请输入APP!' }],
                    initialValue: current.isDownloadDescri,
                  })(<Input placeholder="请输入APP" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout4}>
                <FormItem label="APP首次登陆">
                  {getFieldDecorator('firstLoginTime', {
                    rules: [{ required: true, message: 'APP首次登陆!' }],
                    initialValue: current.firstLoginTime,
                  })(<Input placeholder="APP首次登陆" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout4}>
                <FormItem label="APP最近使用">
                  {getFieldDecorator('lastLoginTime', {
                    rules: [{ required: true, message: 'APP最近使用!' }],
                    initialValue: current.lastLoginTime,
                  })(<Input placeholder="APP最近使用" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout4}>
                <FormItem label="机型">
                  {getFieldDecorator('machineType', {
                    rules: [{ required: true, message: '机型!' }],
                    initialValue: current.machineType,
                  })(<Input placeholder="机型" />)}
                </FormItem>
              </Col>

            </Row>

          </Row>
        </div>

        <div className="ant-card-head">
          <div className="ant-card-head-wrapper">
            <div className="ant-card-head-title">仓库管理</div>
          </div>
        </div>

        <div className="ant-card-body">
          <Row gutter={24}>
            <Col md={4}>
              <FormItem>
                {getFieldDecorator('upload', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <AvatarView avatar={this.getAvatarURL()} />
                )}
              </FormItem>
            </Col>
            <Col md={20}>
              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="账号">
                    {getFieldDecorator('account', {
                      rules: [{ required: true, message: '请输入账号!' }],
                      initialValue: current.account,
                    })(<Input placeholder="请输入账号" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="姓名">
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: '请输入姓名!' }],
                    })(<Input placeholder="请输入姓名" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="电话">
                    {getFieldDecorator('phone', {
                      rules: [{ required: true, message: '请输入电话!' }],
                    })(<Input placeholder="请输入电话" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="角色明细">
                    {getFieldDecorator('role', {
                      rules: [{ required: true, message: '请选择角色明细!' }],
                    })(
                      <Select

                        style={{ width: '100%' }}
                        placeholder="请选择角色明细"
                        help="角色明细可多选"
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="总部">
                    {getFieldDecorator('headOffice', {
                      rules: [{ required: true, message: '请选择总部!' }],
                      initialValue: current.headOffice,
                    })(<Input placeholder="请输入电话" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="集团">
                    {getFieldDecorator('group', {
                      rules: [{ required: true, message: '请选择集团!' }],
                    })(<Input placeholder="请输入电话" />)}
                  </FormItem>
                </Col>

                <Col {...this.colLayout}>
                  <FormItem label="角色明细">
                    {getFieldDecorator('role', {
                      rules: [{ required: true, message: '请选择角色明细!' }],
                    })(
                      <Select

                        style={{ width: '100%' }}
                        placeholder="请选择角色明细"
                        help="角色明细可多选"
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="部门">
                    {getFieldDecorator('department', {
                      rules: [{ required: true, message: '请输入部门!' }],
                    })(<Input placeholder="请输入部门" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="认证资格">
                    {getFieldDecorator('CCNP', {
                      rules: [{ required: true, message: '请输入认证资格!' }],
                    })(
                      <Select
                        showSearch
                        defaultValue="lucy"
                      >
                        <OptGroup label="Manager">
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                        </OptGroup>
                        <OptGroup label="Engineer">
                          <Option value="Yiminghe">yiminghe</Option>
                        </OptGroup>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>

                <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} label="4S店">
                  {getFieldDecorator('shop', {
                    rules: [{ required: true, message: '请选择4Sshop!' }],
                    initialValue: current.shop,
                  })(

                    <Fragment>
                      <Select
                        defaultValue="jack"
                        style={{ width: 120 }}
                        onChange={this.handleProvinceChange}
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                      </Select>
                      <Select
                        defaultValue="jack"
                        style={{ width: 120 }}
                        onChange={this.handleProvinceChange}
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                      </Select>
                      <Select
                        defaultValue="jack"
                        style={{ width: 120 }}
                        onChange={this.handleProvinceChange}
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                      </Select>
                      <Input
                        style={{ width: 220 }}
                        placeholder="请输入部门"
                      />
                    </Fragment>
                  )}
                </FormItem>

              </Row>

              <Row>
                <Col {...this.colLayout}>
                  <FormItem label="认证资格有效期">
                    {getFieldDecorator('validity', {
                      rules: [{ required: true, message: '请选择认证资格有效期!' }],
                      initialValue: null,
                    })(
                      <DatePicker
                        showTime
                        placeholder="请选择"
                        format="YYYY-MM-DD HH:mm:ss"
                        style={{ width: '100%' }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="岗位">
                    {getFieldDecorator('job', {
                      rules: [{ required: true, message: '请输入岗位!' }],
                    })(<Input placeholder="请输入岗位" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="岗位">
                    {getFieldDecorator('job', {
                      rules: [{ required: true, message: '请输入岗位!' }],
                    })(<Input placeholder="请输入岗位" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="岗位">
                    {getFieldDecorator('job', {
                      rules: [{ required: true, message: '请输入岗位!' }],
                    })(<Input placeholder="请输入岗位" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="岗位">
                    {getFieldDecorator('job', {
                      rules: [{ required: true, message: '请输入岗位!' }],
                    })(<Input placeholder="请输入岗位" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="岗位">
                    {getFieldDecorator('job', {
                      rules: [{ required: true, message: '请输入岗位!' }],
                    })(<Input placeholder="请输入岗位" />)}
                  </FormItem>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div className="ant-card-head">
          <div className="ant-card-head-wrapper">
            <div className="ant-card-head-title">APP信息</div>
          </div>
        </div>

        <div className="ant-card-body">
          <Row gutter={24}>
            <Row gutter={24}>
              <Col {...this.colLayout4}>
                <FormItem label="账号">
                  {getFieldDecorator('account', {
                    rules: [{ required: true, message: '请输入账号!' }],
                    initialValue: current.account,
                  })(<Input placeholder="请输入账号" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout4}>
                <FormItem label="姓名">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入姓名!' }],
                  })(<Input placeholder="请输入姓名" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout4}>
                <FormItem label="电话">
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: '请输入电话!' }],
                  })(<Input placeholder="请输入电话" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout4}>
                <FormItem label="邮箱">
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: '请输入邮箱!' }],
                  })(<Input placeholder="请输入邮箱" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout4}>
                <FormItem label="账号">
                  {getFieldDecorator('account', {
                    rules: [{ required: true, message: '请输入账号!' }],
                    initialValue: current.account,
                  })(<Input placeholder="请输入账号" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout4}>
                <FormItem label="姓名">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入姓名!' }],
                  })(<Input placeholder="请输入姓名" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout4}>
                <FormItem label="电话">
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: '请输入电话!' }],
                  })(<Input placeholder="请输入电话" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout4}>
                <FormItem label="邮箱">
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: '请输入邮箱!' }],
                  })(<Input placeholder="请输入邮箱" />)}
                </FormItem>
              </Col>
            </Row>

          </Row>
        </div>

        <div className="ant-card-head">
          <div className="ant-card-head-wrapper">
            <div className="ant-card-head-title">详细信息</div>
          </div>
        </div>

        <div className="ant-card-body">
          <Row gutter={24}>
            <Row gutter={24}>
              <Col {...this.colLayout4}>
                <FormItem label="账号">
                  {getFieldDecorator('account', {
                    rules: [{ required: true, message: '请输入账号!' }],
                    initialValue: current.account,
                  })(<Input placeholder="请输入账号" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout4}>
                <FormItem label="姓名">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入姓名!' }],
                  })(<Input placeholder="请输入姓名" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout4}>
                <FormItem label="电话">
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: '请输入电话!' }],
                  })(<Input placeholder="请输入电话" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout4}>
                <FormItem label="邮箱">
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: '请输入邮箱!' }],
                  })(<Input placeholder="请输入邮箱" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout4}>
                <FormItem label="账号">
                  {getFieldDecorator('account', {
                    rules: [{ required: true, message: '请输入账号!' }],
                    initialValue: current.account,
                  })(<Input placeholder="请输入账号" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout4}>
                <FormItem label="姓名">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入姓名!' }],
                  })(<Input placeholder="请输入姓名" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout4}>
                <FormItem label="电话">
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: '请输入电话!' }],
                  })(<Input placeholder="请输入电话" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout4}>
                <FormItem label="邮箱">
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: '请输入邮箱!' }],
                  })(<Input placeholder="请输入邮箱" />)}
                </FormItem>
              </Col>
            </Row>

          </Row>
        </div>


      </Form>

    )
  }
}
export default MemberInfo;