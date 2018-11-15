
import React, { PureComponent, Fragment } from 'react';
import {
  Button,
  Form,
  Col,
  Row,
  DatePicker,
  Input,
  Select,
  Spin,
  Icon,
} from 'antd';
import SearchCool from '@/components/SearchCool'
import moment from 'moment';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import styles from './MemberInfo.less';

const Search = Input.Search;
const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;


@connect(({ user, addMemberProfile, loading }) => ({
  currentUser: user.currentUser,
  addMemberProfile,
  loadings: loading.models.addMemberProfile,
}))
@Form.create()
class AddCarInfo extends PureComponent {
  colLayout = {
    xl: 6,
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

    }
  }

  validate = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
      dispatch,
      addMemberProfile: { dataSource },
    } = this.props;
    const entity = Object.keys(dataSource).length !== 0 && dataSource.entity;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        const newData = {
          ...values,

        };
        const params = { ...entity, ...newData, }
        console.log(params)
        dispatch({
          type: 'addMemberProfile/update',
          payload: {
            ...params
          },
          callback: () => {
            dispatch({
              type: 'addMemberProfile/toUpdate',
              payload: {
                pkMembermgcust: entity.pkMembermgcust,
              }
            });
          }
        });

      }
    });
  };

  enterBtn=(values, type)=>{
    console.log(values)
  }

  render() {
    const {
      form: { getFieldDecorator },
      match,
      loadings,
      addMemberProfile: { dataSource },
    } = this.props;
    if (Object.keys(dataSource).length === 0) { return null; }
    const entity = dataSource.entity;
    const current = entity || {};

    const getOption = (data = [], name) => {
      return data.map((item, i) => (
        <Option key={item[name]} value={item[name]}>
          {item[name]}
        </Option>
      ));
    }

    return (
      <Fragment>
        <Spin spinning={loadings}>
          <Form hideRequiredMark className={[styles.labelItem, styles.carLabelItem]}>
            <div className="ant-card-head">
              <div className="ant-card-head-wrapper">
                <div className="ant-card-head-title">备用联系人</div>
              </div>
            </div>
            <div className="ant-card-body">
              <Row gutter={24}>

                <Col {...this.colLayout}>
                  <FormItem label="车牌号">
                    {getFieldDecorator('licenseplate', {
                      rules: [
                        { required: true, message: '请输入车牌号!' },
                        { pattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/, message: '输入的车牌号有误！' }],
                      initialValue: current.licenseplate,
                    })(<Input placeholder="请输入车牌号" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="车架号">
                    {getFieldDecorator('carframeno', {
                      rules: [{ required: true, message: '请输入车架号!' }],
                      initialValue: current.carframeno,
                    })(<Input placeholder="请输入车架号" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="发动机号">
                    {getFieldDecorator('engineno', {
                      rules: [{ required: true, message: '请输入发动机号!' }],
                      initialValue: current.engineno,
                    })(<Input placeholder="请输入发动机号" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="车辆状态">
                    {getFieldDecorator('vstatus', {
                      rules: [{ required: true, message: '请选择原因!' }],
                      initialValue: current.vstatus,
                    })(
                      <Select
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="请选择原因!"
                      >
                        <Option value="APP中删除车辆">APP中删除车辆</Option>
                        <Option value="微信中中删除车辆">微信中中删除车辆</Option>
                        <Option value="后台停用车辆">后台停用车辆</Option>
                        <Option value="车辆过户">车辆过户</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="品牌">
                    {getFieldDecorator('brandname', {
                      rules: [{ required: true, message: '请输入联系人姓名!' }],
                      initialValue: 'current.brandname',
                    })(
                      <SearchCool
                        placeholder="请输入联系人姓名!"
                        inputDisabled
                        buttonDisabled={false}
                        enterHandle={value => this.enterBtn(value, 'carseriesname')}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="车系">
                    {getFieldDecorator('carseriesname', {
                      rules: [{ required: true, message: '请输入与会员关系!' }],
                      initialValue: current.carseri,
                    })(
                      <SearchCool
                        placeholder="请输入与会员关系!"
                        inputDisabled
                        buttonDisabled={false}
                        enterHandle={value => this.enterBtn(value, 'carseriesname')}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="车型">
                    {getFieldDecorator('cartypename', {
                      rules: [{ required: true, message: '请输入手机号!' }],
                      initialValue: 'current.cartypename',
                    })(<Input placeholder="请输入手机号" />)}
                  </FormItem>
                </Col>

              </Row>
              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="用车类型">
                    {getFieldDecorator('useType', {
                      initialValue: current.useType,
                    })(
                      <Select
                        allowClear
                        placeholder="请选择用车类型"
                        onChange={this.handleSelectChange}
                      >
                        <Option value="Y">启用</Option>
                        <Option value="N">停用</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="车身色">
                    {getFieldDecorator('appearancecolorname', {

                      initialValue: current.appearancecolorname,
                    })(<Input placeholder="请输入车身色" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="内饰色">
                    {getFieldDecorator('interiorcolorname', {
                      initialValue: current.interiorcolorname,
                    })(<Input placeholder="请输入内饰色" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="车顶色">
                    {getFieldDecorator('carroofcolorname', {

                      initialValue: current.carroofcolorname,
                    })(<Input placeholder="请输入车顶色" />)}
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="归属4S店">
                    {getFieldDecorator('belongfourname', {
                      initialValue: current.belongfourname,
                    })(
                      <Input placeholder="请输入归属4S店" />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="绑定服务顾问">
                    {getFieldDecorator('zsservicename', {

                      initialValue: current.zsservicename,
                    })(<Input placeholder="请输入绑定服务顾问" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="首次绑定4S店">
                    {getFieldDecorator('foursshopName', {
                      initialValue: current.foursshopName,
                    })(<Input placeholder="请输入首次绑定4S店" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="首次启用时间">
                    {getFieldDecorator('firstStartTime', {
                      initialValue: current.firstStartTime ? moment(current.firstStartTime) : null,
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
              </Row>

              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="销售4S店">
                    {getFieldDecorator('fours', {
                      initialValue: current.fours,
                    })(
                      <Input placeholder="请输入归属4S店" />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="销售日期">
                    {getFieldDecorator('saledate', {
                      initialValue: current.saledate ? moment(current.saledate) : null,
                    })(
                      <DatePicker
                        showTime
                        placeholder="请选择销售日期"
                        format="YYYY-MM-DD HH:mm:ss"
                        style={{ width: '100%' }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="行驶证注册登记日期">
                    {getFieldDecorator('firstCertifyLicense', {
                      initialValue: current.firstCertifyLicense ? moment(current.firstCertifyLicense) : null,
                    })(
                      <DatePicker
                        showTime
                        placeholder="请选择行驶证注册登记日期"
                        format="YYYY-MM-DD HH:mm:ss"
                        style={{ width: '100%' }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="数据来源">
                    {getFieldDecorator('source', {

                      initialValue: current.source,
                    })(
                      <Select
                        allowClear
                        placeholder="请选择数据来源"
                        onChange={this.handleSelectChange}
                      >
                        <Option value="Y">启用</Option>
                        <Option value="N">停用</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
            </div>

            <div className="ant-card-head">
              <div className="ant-card-head-wrapper">
                <div className="ant-card-head-title">其他信息</div>
              </div>
            </div>

            <div className="ant-card-body">
              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="保险到期时间">
                    {getFieldDecorator('insurance', {
                      initialValue: current.insurance ? moment(current.insurance) : null,
                    })(
                      <DatePicker
                        showTime
                        placeholder="请选择保险到期时间"
                        format="YYYY-MM-DD HH:mm:ss"
                        style={{ width: '100%' }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="年检到期时间">
                    {getFieldDecorator('njstopdate', {
                      initialValue: current.njstopdate ? moment(current.njstopdate) : null,
                    })(
                      <DatePicker
                        showTime
                        placeholder="请选择年检到期时间"
                        format="YYYY-MM-DD HH:mm:ss"
                        style={{ width: '100%' }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="上次投保时间">
                    {getFieldDecorator('lastInsureTime', {
                      initialValue: current.lastInsureTime ? moment(current.lastInsureTime) : null,
                    })(
                      <DatePicker
                        showTime
                        placeholder="请选择上次投保时间"
                        format="YYYY-MM-DD HH:mm:ss"
                        style={{ width: '100%' }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="上次投保保险公司">
                    {getFieldDecorator('insurancecompanyname', {
                      initialValue: current.insurancecompanyname,
                    })(<Input placeholder="请输入上次投保保险公司" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="质保到期时间">
                    {getFieldDecorator('warrantydate', {
                      initialValue: current.warrantydate ? moment(current.warrantydate) : null,
                    })(
                      <DatePicker
                        showTime
                        placeholder="请选择质保到期时间"
                        format="YYYY-MM-DD HH:mm:ss"
                        style={{ width: '100%' }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="质保到期里程">
                    {getFieldDecorator('warrantykm', {
                      initialValue: current.warrantykm ? moment(current.warrantykm) : null,
                    })(<Input placeholder="请输入质保到期里程" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="延保产品名称">
                    {getFieldDecorator('yanbaoProductName', {
                      initialValue: current.yanbaoProductName ? moment(current.yanbaoProductName) : null,
                    })(<Input placeholder="请输入延保产品名称" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="延保到期里程">
                    {getFieldDecorator('yanbaoDeadlineMileage', {
                      initialValue: current.yanbaoDeadlineMileage,
                    })(<Input placeholder="请输入延保到期里程" />)}
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="上次进站时间">
                    {getFieldDecorator('beforedate', {
                      initialValue: current.beforedate ? moment(current.beforedate) : null,
                    })(
                      <DatePicker
                        showTime
                        placeholder="请选择上次进站时间"
                        format="YYYY-MM-DD HH:mm:ss"
                        style={{ width: '100%' }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="上次进站里程">
                    {getFieldDecorator('beforekm', {
                      initialValue: current.beforekm,
                    })(<Input placeholder="请输入上次进站里程" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="上次保养时间">
                    {getFieldDecorator('beforemaintaindate', {
                      initialValue: current.beforemaintaindate ? moment(current.beforemaintaindate) : null,
                    })(
                      <DatePicker
                        showTime
                        placeholder="请选择上次保养时间"
                        format="YYYY-MM-DD HH:mm:ss"
                        style={{ width: '100%' }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="上次保养里程">
                    {getFieldDecorator('beforemaintainkm', {
                      initialValue: current.beforemaintainkm,
                    })(<Input placeholder="请输入上次保养里程" />)}
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="下次预计保养到期时间">
                    {getFieldDecorator('nextmaintaindate', {
                      initialValue: current.nextmaintaindate ? moment(current.nextmaintaindate) : null,
                    })(
                      <DatePicker
                        showTime
                        placeholder="请选择下次预计保养到期时间"
                        format="YYYY-MM-DD HH:mm:ss"
                        style={{ width: '100%' }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="下次预计保养到期里程">
                    {getFieldDecorator('nextmaintainkm', {
                      initialValue: current.nextmaintainkm,
                    })(<Input placeholder="请输入下次预计保养到期里程" />)}
                  </FormItem>
                </Col>

              </Row>

            </div>

            <div className="ant-card-head">
              <div className="ant-card-head-wrapper">
                <div className="ant-card-head-title">联系人信息</div>
              </div>
            </div>

            <div className="ant-card-body">
              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="车辆关系">
                    {getFieldDecorator('masterrelationship', {
                      initialValue: current.masterrelationship || '1',
                    })(
                      <Select
                        allowClear
                        placeholder="请选择车辆关系"
                      >
                        <Option value="0"></Option>
                        <Option value="1">车主关系</Option>
                        <Option value="2">送修关系</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="会员编码">
                    {getFieldDecorator('mastercode', {
                      initialValue: current.mastercode ? moment(current.firstStartTime) : null,
                    })(<Input placeholder="请输入会员编码" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="会员姓名">
                    {getFieldDecorator('mastername', {
                      initialValue: current.mastername ? moment(current.firstStartTime) : null,
                    })(<Input placeholder="请输入会员姓名" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="手机号">
                    {getFieldDecorator('masterphone', {
                      rules: [{ pattern: /^1(3|4|5|7|8)\d{9}$/, message: '输入的手机号有误！' }],
                      initialValue: current.masterphone,
                    })(<Input placeholder="请输入手机号" />)}
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="车辆关系">
                    {getFieldDecorator('masterrelationship1', {
                      initialValue: current.masterrelationship1 || '1',
                    })(
                      <Select
                        allowClear
                        placeholder="请选择车辆关系"
                      >
                        <Option value="0"></Option>
                        <Option value="1">车主关系</Option>
                        <Option value="2">送修关系</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="会员编码">
                    {getFieldDecorator('mastercode1', {
                      initialValue: current.mastercode1 ? moment(current.firstStartTime) : null,
                    })(<Input placeholder="请输入会员编码" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="会员姓名">
                    {getFieldDecorator('mastername1', {
                      initialValue: current.mastername1 ? moment(current.firstStartTime) : null,
                    })(<Input placeholder="请输入会员姓名" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="手机号">
                    {getFieldDecorator('masterphone1', {
                      rules: [{ pattern: /^1(3|4|5|7|8)\d{9}$/, message: '输入的手机号有误！' }],
                      initialValue: current.masterphone1,
                    })(<Input placeholder="请输入手机号" />)}
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="车辆关系">
                    {getFieldDecorator('masterrelationship2', {
                      initialValue: current.masterrelationship2 || '1',
                    })(
                      <Select
                        allowClear
                        placeholder="请选择车辆关系"
                      >
                        <Option value="0"></Option>
                        <Option value="1">车主关系</Option>
                        <Option value="2">送修关系</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="会员编码">
                    {getFieldDecorator('mastercode2', {
                      initialValue: current.mastercode2 ? moment(current.firstStartTime) : null,
                    })(<Input placeholder="请输入会员编码" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="会员姓名">
                    {getFieldDecorator('mastername2', {
                      initialValue: current.mastername2 ? moment(current.firstStartTime) : null,
                    })(<Input placeholder="请输入会员姓名" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="手机号">
                    {getFieldDecorator('masterphone2', {
                      rules: [{ pattern: /^1(3|4|5|7|8)\d{9}$/, message: '输入的手机号有误！' }],
                      initialValue: current.masterphone2,
                    })(<Input placeholder="请输入手机号" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col md={24}>
                  <FormItem label="车辆备注">
                    {getFieldDecorator('description', {
                      initialValue: current.description,
                    })(<TextArea style={{ minHeight: 32 }} placeholder="请输入车辆备注" rows={4} />)}
                  </FormItem>
                </Col>
              </Row>
            </div>

          </Form>
        </Spin>
        <Button type="primary" style={{ position: 'fixed', bottom: '15px', right: '20px' }} onClick={this.validate} loading={loadings}>
          提交
        </Button>
      </Fragment>
    )
  }
}
export default AddCarInfo;