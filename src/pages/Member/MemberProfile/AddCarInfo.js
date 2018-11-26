
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
  message,
} from 'antd';

import router from 'umi/router';
import moment from 'moment';
import { connect } from 'dva';
import SearchCool from '@/components/SearchCool'
import SearchModel from '@/components/SearchModel';
import { AddKey } from '@/utils/utils';
import styles from './MemberInfo.less';



const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;


@connect(({ addCarInfo, carInfoSelect, loading }) => ({
  addCarInfo,
  carInfoSelect,
  loadings: loading.models.addCarInfo,
  tableLoading: loading.models.carInfoSelect,
}))
@Form.create()
class AddCarInfo extends PureComponent {
  colLayout = {
    xl: 6,
    lg: 8,
    md: 12,
    sm: 24,
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      columns: [],
      carData: [],
      modelKey: '',
      selectionType: 'radio',
      selectedKeys: [],
      
      total: '',
      pageSize: '',
    }
    this.formData={};
    this.handleSearch = this.handleSearch.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, location } = this.props;
    const carId = location.query.carId;
    dispatch({
      type: 'addCarInfo/toUpdate',
      payload: {
        pkMembermgcar: carId,
      }
    });
  }

  getSearchData(pageParams, searchParams) {
    const { type, category } = searchParams;
    const { dispatch } = this.props;
    const isConsultant = category === 'zsservicename';
    const column = [
      {
        title: isConsultant ? '登录名称' : '编码',
        width: 135,
        dataIndex: isConsultant ? 'loginName' : 'code',
        sorter: true,
      },
      {
        title: '名称',
        dataIndex: 'name',
        sorter: (a, b) => {
          return a.name.localeCompare(b.name, 'zh-CN');
        },
      },
      {
        title: '描述',
        dataIndex: 'description',
        sorter: (a, b) => {
          return a.description.localeCompare(b.description, 'zh-CN');
        },
        render: text => {
          return (
            <div className={styles.noWrap} style={{ width: '400px' }}>{text}</div>
          )
        },
      },
    ];

    dispatch({
      type: `carInfoSelect/${type}`,
      payload: pageParams,
      callback: (obj) => {
        this.setState({
          columns: column,
          carData: obj.data && obj.data.content,
          total: obj.data && obj.data.totalElements,
          pageSize: obj.data && obj.data.size,
          modelKey: category,
        })
      }
    });
  }


  handleTableChange = (pagination) => {
    const { modelKey } = this.state;
    this.searchDifType(modelKey, pagination);
  };


  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  validate = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
      dispatch,
      location,
      addCarInfo: { entityData },
    } = this.props;
    const id = location.query.id;
    const entity = Object.keys(entityData).length !== 0 && entityData.entity;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        const {
          beforedate,
          beforemaintaindate,
          firstCertifyLicense,
          firstStartTime,
          insurance,
          lastInsureTime,
          nextmaintaindate,
          njstopdate,
          saledate,
          warrantydate,
        } = values;
        const newData = {
          ...values,
          beforedate: beforedate && beforedate.format('YYYY-MM-DD HH:mm:ss'),
          beforemaintaindate: beforemaintaindate && beforemaintaindate.format('YYYY-MM-DD HH:mm:ss'),
          firstCertifyLicense: firstCertifyLicense && firstCertifyLicense.format('YYYY-MM-DD HH:mm:ss'),
          firstStartTime: firstStartTime && firstStartTime.format('YYYY-MM-DD HH:mm:ss'),
          insurance: insurance && insurance.format('YYYY-MM-DD HH:mm:ss'),
          lastInsureTime: lastInsureTime && lastInsureTime.format('YYYY-MM-DD HH:mm:ss'),
          nextmaintaindate: nextmaintaindate && nextmaintaindate.format('YYYY-MM-DD HH:mm:ss'),
          njstopdate: njstopdate && njstopdate.format('YYYY-MM-DD HH:mm:ss'),
          saledate: saledate && saledate.format('YYYY-MM-DD HH:mm:ss'),
          warrantydate: warrantydate && warrantydate.format('YYYY-MM-DD HH:mm:ss'),
        };
        const params = { ...entity, ...newData, };
        console.log(JSON.stringify(entity));
        console.log(JSON.stringify(params));
        // console.log(params);
        dispatch({
          type: 'addCarInfo/update',
          payload: {
            ...params
          },
          callback: () => {
            router.push({
              pathname: '/member/memberProfile/addMember/carInfo',
              query: { id }
            });
          }
        });

      }
    });
  };

  searchDifType(type, pagination = {}, searchParams = {}) {
    const { brandname, carseriesname, belongfour } = this.formData;
    this.setState({
      carData: [],
    });
    let params = {};
    switch (type) {
      case 'brandname':
        params = {
          page: pagination.current || 1,
          pageSize: pagination.pageSize || 10,
          sortType: "auto",
          name: searchParams.name,
        }
        this.getSearchData(params, { type: 'getCarBrand', category: 'brandname' });
        break;
      case 'carseriesname':
        params = {
          page: pagination.current || 1,
          pageSize: pagination.pageSize || 10,
          sortType: "auto",
          brandname,
          name: searchParams.name,
        }
        this.getSearchData(params, { type: 'getCarsInfo', category: 'carseriesname' });
        break;
      case 'cartypename':
        params = {
          page: pagination.current || 1,
          pageSize: pagination.pageSize || 10,
          sortType: "auto",
          brandname,
          carseriesname,
          name: searchParams.name,
        }
        this.getSearchData(params, { type: 'getCarsModels', category: 'cartypename' });
        break;
      case 'belongfourname':
        params = {
          page: pagination.current || 1,
          pageSize: pagination.pageSize || 10,
          sortType: "auto",
          name: searchParams.name,
        }
        this.getSearchData(params, { type: 'getCarsShops', category: 'belongfourname' });
        break;
      case 'fours':
        params = {
          page: pagination.current || 1,
          pageSize: pagination.pageSize || 10,
          sortType: "auto",
          name: searchParams.name,
        }
        this.getSearchData(params, { type: 'getCarsShops', category: 'fours' });
        break;
      case 'zsservicename':
        params = {
          page: pagination.current || 1,
          pageSize: pagination.pageSize || 10,
          sortType: "auto",
          fours: belongfour, // 根据4S店id搜索
          name: searchParams.name,
        }
        this.getSearchData(params, { type: 'getCarsConsultant', category: 'zsservicename' });
        break;
      default:
        break;
    }
  }

  enterBtn(value, name, ) {
    this.searchDifType(name);
    this.handleModalVisible(true);
  }

  handleSearch(v) {
    const { modelKey } = this.state;
    this.searchDifType(modelKey, {}, v);
  }

  render() {
    const { modalVisible, columns, carData, modelKey, selectedKeys, selectionType, total, pageSize } = this.state;
    const {
      form: { getFieldDecorator },
      location,
      loadings,
      tableLoading,
      addCarInfo: { entityData },
    } = this.props;
    const isView = location.query.view&&true||false;
    if (Object.keys(entityData).length === 0) { return null; }
    const entity = entityData.entity;
    const current = entity || {};
    const tableData = AddKey(carData, 'erpId');

    const getNameOrId = (d,n)=>{
      return d.map( item => item[n] ).filter(i => i);
    }
    
    const handleAdd = (obj) => {
      const { selectedRows } = obj;
      if (selectedRows.length !== 0) {
        const v =getNameOrId(selectedRows, 'name');
        current[modelKey] = v && v.join(',');

        switch (modelKey) {
          case 'brandname':
          current.pkCarbrand = selectedRows[0].pkBrand
          break;
          case 'carseriesname':
          current.pkCarseries = selectedRows[0].pkCarseriesmg
          break;
          case 'cartypename':
          current.pkCartype = selectedRows[0].pkCartype
          break;
          case 'belongfourname':
            current.belongfour = selectedRows[0].pkFourspointmg
          break;
          case 'fours':
          current.salefours = selectedRows[0].pkFourspointmg
          break;
          case 'zsservicename':
          current.zsservice = selectedRows[0].id
          break;
          default:
          break;
        }
        this.handleModalVisible();
      } else {
        message.success('还没有选择选项');
      }
    }
    this.formData =current;

    const parentMethods = {
      handleAdd,
      handleSearch: this.handleSearch,
      handleModalVisible: this.handleModalVisible,
      handleTableChange: this.handleTableChange,
    };
    const parentProps = {
      columns, tableData, modelKey, selectedKeys, tableLoading, selectionType, total, pageSize
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
                    })(<Input
                      disabled={isView}
                      placeholder="请输入车牌号"
                    />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="车架号">
                    {getFieldDecorator('carframeno', {
                      rules: [{ required: true, message: '请输入车架号!' }],
                      initialValue: current.carframeno,
                    })(<Input disabled={isView} placeholder="请输入车架号" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="发动机号">
                    {getFieldDecorator('engineno', {
                      rules: [{ required: true, message: '请输入发动机号!' }],
                      initialValue: current.engineno,
                    })(<Input disabled={isView} placeholder="请输入发动机号" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="车辆状态">
                    {getFieldDecorator('vstatus', {
                      rules: [{ required: true, message: '请选择原因!' }],
                      initialValue: !!current.vstatus && String(current.vstatus) || null,
                    })(
                      <Select
                        disabled={isView}
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="请选择原因!"
                      >
                        <Option value="0">未开通</Option>
                        <Option value="1">已启用</Option>
                        <Option value="2">已停用</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="品牌">
                    {getFieldDecorator('brandname', {
                      rules: [{ required: true, message: '请选择品牌!' }],
                      initialValue: current.brandname,
                    })(
                      <SearchCool
                        placeholder="请选择品牌!"
                        inputDisabled
                        buttonDisabled={isView}
                        enterHandle={value => this.enterBtn(value, 'brandname')}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="车系">
                    {getFieldDecorator('carseriesname', {
                      rules: [{ required: true, message: '请选择车系!' }],
                      initialValue: current.carseriesname,
                    })(
                      <SearchCool
                        placeholder="请选择车系!"
                        inputDisabled
                        buttonDisabled={isView}
                        enterHandle={value => this.enterBtn(value, 'carseriesname')}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="车型">
                    {getFieldDecorator('cartypename', {
                      rules: [{ required: true, message: '请选择车型!' }],
                      initialValue: current.cartypename,
                    })(
                      <SearchCool
                        placeholder="请选择车型!"
                        inputDisabled
                        buttonDisabled={isView}
                        enterHandle={value => this.enterBtn(value, 'cartypename')}
                      />
                    )}
                  </FormItem>
                </Col>

              </Row>
              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="用车类型">
                    {getFieldDecorator('useType', {
                      initialValue: !!current.useType && String(current.useType) || null,
                    })(
                      <Select
                        disabled={isView}
                        allowClear
                        placeholder="请选择用车类型"
                        onChange={this.handleSelectChange}
                      >
                        <Option value="企业用车">企业用车</Option>
                        <Option value="出租车">出租车</Option>
                        <Option value="私家用车">私家用车</Option>
                        <Option value="其他">其他</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="车身色">
                    {getFieldDecorator('appearancecolorname', {

                      initialValue: current.appearancecolorname,
                    })(<Input disabled={isView} placeholder="请输入车身色" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="内饰色">
                    {getFieldDecorator('interiorcolorname', {
                      initialValue: current.interiorcolorname,
                    })(<Input disabled={isView} placeholder="请输入内饰色" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="车顶色">
                    {getFieldDecorator('carroofcolorname', {

                      initialValue: current.carroofcolorname,
                    })(<Input disabled={isView} placeholder="请输入车顶色" />)}
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="归属4S店">
                    {getFieldDecorator('belongfourname', {
                      initialValue: current.belongfourname,
                    })(
                      <SearchCool
                        placeholder="请选择归属4S店!"
                        inputDisabled
                        buttonDisabled={isView}
                        enterHandle={value => this.enterBtn(value, 'belongfourname')}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="绑定服务顾问">
                    {getFieldDecorator('zsservicename', {
                      initialValue: current.zsservicename,
                    })(
                      <SearchCool
                        placeholder="请选择绑定服务顾问!"
                        inputDisabled
                        buttonDisabled={isView}
                        enterHandle={value => this.enterBtn(value, 'zsservicename')}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="首次绑定4S店">
                    {getFieldDecorator('foursshopName', {
                      initialValue: current.foursshopName,
                    })(<Input disabled={isView} placeholder="请输入首次绑定4S店" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="首次启用时间">
                    {getFieldDecorator('firstStartTime', {
                      initialValue: current.firstStartTime ? moment(current.firstStartTime) : null,
                    })(
                      <DatePicker
                        disabled={isView}
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
                      <SearchCool
                        placeholder="请选择销售4S店!"
                        inputDisabled
                        buttonDisabled={isView}
                        enterHandle={value => this.enterBtn(value, 'fours')}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="销售日期">
                    {getFieldDecorator('saledate', {
                      initialValue: current.saledate ? moment(current.saledate) : null,
                    })(
                      <DatePicker
                        disabled={isView}
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
                        disabled={isView}
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

                      initialValue: current.source || '0',
                    })(
                      <Select
                        disabled
                        allowClear
                        placeholder="请选择数据来源"
                        onChange={this.handleSelectChange}
                      >
                        <Option value="0">新数据</Option>
                        <Option value="1">历史数据</Option>
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
                        disabled={isView}
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
                        disabled
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
                        disabled={isView}
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
                    })(<Input disabled={isView} placeholder="请输入上次投保保险公司" />)}
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
                        disabled={isView}
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
                      initialValue: current.warrantykm,
                    })(<Input disabled={isView} placeholder="请输入质保到期里程" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="延保产品名称">
                    {getFieldDecorator('yanbaoProductName', {
                      initialValue: current.yanbaoProductName ? moment(current.yanbaoProductName) : null,
                    })(<Input disabled={isView} placeholder="请输入延保产品名称" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="延保到期里程">
                    {getFieldDecorator('yanbaoDeadlineMileage', {
                      initialValue: current.yanbaoDeadlineMileage,
                    })(<Input disabled={isView} placeholder="请输入延保到期里程" />)}
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
                      disabled={isView}
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
                    })(<Input disabled={isView} placeholder="请输入上次进站里程" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="上次保养时间">
                    {getFieldDecorator('beforemaintaindate', {
                      initialValue: current.beforemaintaindate ? moment(current.beforemaintaindate) : null,
                    })(
                      <DatePicker
                      disabled={isView}
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
                    })(<Input disabled={isView} placeholder="请输入上次保养里程" />)}
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
                      disabled={isView}
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
                    })(<Input disabled={isView} placeholder="请输入下次预计保养到期里程" />)}
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
                      initialValue: !!current.relationList.masterrelationship && String(current.relationList.masterrelationship) || '1',
                    })(
                      <Select
                        disabled
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
                      initialValue: current.relationList.mastercode ,
                    })(<Input disabled={isView} placeholder="请输入会员编码" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="会员姓名">
                    {getFieldDecorator('mastername', {
                      initialValue: current.relationList.mastername ,
                    })(<Input disabled={isView} placeholder="请输入会员姓名" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="手机号">
                    {getFieldDecorator('masterphone', {
                      rules: [{ pattern: /^1(3|4|5|7|8)\d{9}$/, message: '输入的手机号有误！' }],
                      initialValue: current.relationList.masterphone,
                    })(<Input disabled={isView} placeholder="请输入手机号" />)}
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="车辆关系">
                    {getFieldDecorator('repairrelationship1', {
                      initialValue: !!current.relationList.repairrelationship1 && String(current.relationList.repairrelationship1) || '2',
                    })(
                      <Select
                        disabled
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
                    {getFieldDecorator('repaircode1', {
                      initialValue: current.relationList.repaircode1,
                    })(<Input disabled={isView} placeholder="请输入会员编码" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="会员姓名">
                    {getFieldDecorator('repairname1', {
                      initialValue: current.relationList.repairname1,
                    })(<Input disabled={isView} placeholder="请输入会员姓名" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="手机号">
                    {getFieldDecorator('repairphone1', {
                      rules: [{ pattern: /^1(3|4|5|7|8)\d{9}$/, message: '输入的手机号有误！' }],
                      initialValue: current.relationList.repairphone1,
                    })(<Input disabled={isView} placeholder="请输入手机号" />)}
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="车辆关系">
                    {getFieldDecorator('repairrelationship2', {
                      initialValue: !!current.relationList.repairrelationship2 && String(current.relationList.repairrelationship2) || '2',
                    })(
                      <Select
                        disabled
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
                    {getFieldDecorator('repaircode2', {
                      initialValue: current.relationList.repaircode2,
                    })(<Input disabled={isView} placeholder="请输入会员编码" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="会员姓名">
                    {getFieldDecorator('repairname2', {
                      initialValue: current.relationList.repairname2,
                    })(<Input disabled={isView} placeholder="请输入会员姓名" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="手机号">
                    {getFieldDecorator('repairphone2', {
                      rules: [{ pattern: /^1(3|4|5|7|8)\d{9}$/, message: '输入的手机号有误！' }],
                      initialValue: current.relationList.repairphone2,
                    })(<Input disabled={isView} placeholder="请输入手机号" />)}
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="车辆关系">
                    {getFieldDecorator('repairrelationship3', {
                      initialValue: !!current.relationList.repairrelationship3 && String(current.relationList.repairrelationship3) || '2',
                    })(
                      <Select
                        disabled
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
                    {getFieldDecorator('repaircode3', {
                      initialValue: current.relationList.repaircode3,
                    })(<Input disabled={isView} placeholder="请输入会员编码" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="会员姓名">
                    {getFieldDecorator('repairname3', {
                      initialValue: current.relationList.repairname3,
                    })(<Input disabled={isView} placeholder="请输入会员姓名" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="手机号">
                    {getFieldDecorator('repairphone3', {
                      rules: [{ pattern: /^1(3|4|5|7|8)\d{9}$/, message: '输入的手机号有误！' }],
                      initialValue: current.relationList.repairphone3,
                    })(<Input disabled={isView} placeholder="请输入手机号" />)}
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col md={24}>
                  <FormItem label="车辆备注">
                    {getFieldDecorator('description', {
                      initialValue: current.description,
                    })(<TextArea style={{ minHeight: 32 }} disabled={isView} placeholder="请输入车辆备注" rows={4} />)}
                  </FormItem>
                </Col>
              </Row>
            </div>

          </Form>
          <SearchModel
            modalVisible={modalVisible}
            {...parentMethods}
            {...parentProps}
          />
        </Spin>
        <Button disabled={isView} type="primary" style={{ position: 'fixed', bottom: '15px', right: '20px' }} onClick={this.validate} loading={loadings}>
          提交
        </Button>
      </Fragment>
    )
  }
}
export default AddCarInfo;