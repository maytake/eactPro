/* eslint-disable react/no-array-index-key */
import React, { PureComponent, Fragment } from 'react';
import {
  Button,
  Form,
  Col,
  Row,
  DatePicker,
  Input,
  Select,
  Upload,
  Cascader,
  Spin,
} from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './MemberInfo.less';
import citys from '@/utils/geographic';
const FormItem = Form.Item;
const { Option, OptGroup } = Select;

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


@connect(({ user, addMemberProfile, loading }) => ({
  currentUser: user.currentUser,
  addMemberProfile,
  loadings: loading.models.addMemberProfile,
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

  validate = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
      dispatch,
      addMemberProfile: { dataSource },
      location,
    } = this.props;
    const id = location.query.id;
    const entity = Object.keys(dataSource).length !== 0 && dataSource.entity;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        const { residentialAddress, usingAddresse, idcradAddress, source } = values;
        const firstStartTime = values.firstStartTime;
        const dateofbirth = values.dateofbirth;
        const newData = {
          ...values,
          // 使用地址、居住地址、身份证地址
          connprovince: residentialAddress && residentialAddress[0],
          conncity: residentialAddress && residentialAddress[1],
          connarea: residentialAddress && residentialAddress[2],
          unitprovince: usingAddresse && usingAddresse[0],
          unitcity: usingAddresse && usingAddresse[1],
          unitarea: usingAddresse && usingAddresse[2],
          paperprovince: idcradAddress && idcradAddress[0],
          papercity: idcradAddress && idcradAddress[1],
          paperarea: idcradAddress && idcradAddress[2],
          residentialAddress: null,
          usingAddresse: null,
          idcradAddress: null,
          dateofbirth: dateofbirth && dateofbirth.format('YYYY-MM-DD HH:mm:ss'),
          firstStartTime: firstStartTime && firstStartTime.format('YYYY-MM-DD HH:mm:ss'),
          source: source === '新数据' ? 0 : 1,
        };
        const params = { ...entity, ...newData, }
        console.log(params)
        if (id) {
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
        } else {
          dispatch({
            type: 'addMemberProfile/create',
            payload: {
              ...params
            },
            callback: () => {
              router.push({
                pathname: '/member/memberProfile',
              })
            }
          });
        }
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      loadings,
      location,
      addMemberProfile: { dataSource, memberTags },
    } = this.props;
    const isView = location.query.view&&true||false;
    if (Object.keys(dataSource).length === 0) { return null; }
    const entity = dataSource.entity;
    const current = entity || {};
    const industry = dataSource.industryLi;
    const expectation = dataSource.reminding;
    const hopeActivity = dataSource.activity;
    const occupaction = dataSource.occupactionLi;
    const unittype = dataSource.unittyLi;
    const entertainment = dataSource.entertainment;
    const health = dataSource.health;
    const sport = dataSource.sport;
    const collection = dataSource.collection;

    const getTagsOption = () => {
      return memberTags.map((item, i) => (
        <OptGroup key={item.description + i} label={item.description}>
          {
            item.load && item.load.map((n, j) => (
              <Option key={n.NAME + j} value={n.NAME}>
                {n.NAME}
              </Option>
            ))
          }
        </OptGroup>
      ));
    }

    const getOption = (data = [], name) => {
      return data.map((item) => (
        <Option key={item[name]} value={item[name]}>
          {item[name]}
        </Option>
      ));
    }

    return (
      <Fragment>
        <Spin spinning={loadings}>
          <Form hideRequiredMark className={styles.labelItem}>
            <div className="ant-card-head">
              <div className="ant-card-head-wrapper">
                <div className="ant-card-head-title">仓库管理</div>
              </div>
            </div>

            <div className="ant-card-body">
              <Row gutter={24}>
                <Col md={4}>
                  <FormItem>

                    <AvatarView avatar={this.getAvatarURL()} />

                  </FormItem>
                </Col>
                <Col md={20}>
                  <Row gutter={24}>
                    <Col {...this.colLayout}>
                      <FormItem label="会员编码">
                        {getFieldDecorator('membercode', {
                          initialValue: current.membercode,
                        })(<Input disabled placeholder="请输入会员编码" />)}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem label="会员卡号 ">
                        {getFieldDecorator('phusicalcardno', {

                          initialValue: current.phusicalcardno,
                        })(<Input disabled placeholder="请输入会员卡号 " />)}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem label="会员昵称">
                        {getFieldDecorator('nickname', {

                          initialValue: current.nickname,
                        })(<Input disabled placeholder="请输入会员昵称" />)}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem label="会员姓名">
                        {getFieldDecorator('name', {
                          rules: [{ required: true, message: '请输入会员姓名!' }],
                          initialValue: current.name,
                        })(<Input disabled={isView} placeholder="请输入会员姓名！" />)}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem label="会员性别">
                        {getFieldDecorator('sex', {
                          rules: [{ required: true, message: '请选择会员性别!' }],
                          initialValue: !!current.sex && String(current.sex) || undefined,
                        })(
                          <Select
                            allowClear
                            style={{ width: '100%' }}
                            disabled={isView}
                            placeholder="请选择会员性别"
                            help="会员性别可多选"
                          >
                            <Option value="1">男</Option>
                            <Option value="2">女</Option>
                          </Select>)}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem label="手机号">
                        {getFieldDecorator('mobilephone', {
                          rules: [
                            { required: true, message: '请输入手机号!' },
                            { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '输入的手机号有误！' }
                          ],
                          initialValue: current.mobilephone,
                        })(<Input disabled={isView} placeholder="请输入手机号" />)}
                      </FormItem>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col {...this.colLayout}>
                      <FormItem label="证件类型">
                        {getFieldDecorator('paperstype', {
                          rules: [{ required: true, message: '请选择证件类型!' }],
                          initialValue: !!current.paperstype && String(current.paperstype) || undefined,
                        })(
                          <Select
                            allowClear
                            style={{ width: '100%' }}
                            disabled={isView}
                            placeholder="请选择证件类型"
                            help="证件类型"
                          >
                            <Option value="0">身份证</Option>
                            <Option value="1">护照</Option>
                            <Option value="2">港澳台证件</Option>
                            <Option value="3">退伍军人证</Option>
                            <Option value="6">其它</Option>
                          </Select>

                        )}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem label="证件号">
                        {getFieldDecorator('paperscode', {
                          rules: [
                            { required: true, message: '请输入证件号!' },
                            { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入15-18位证件号!' }
                          ],
                          initialValue: current.paperscode,
                        })(<Input disabled={isView} placeholder="请输入证件号" />)}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem label="会员标签(多选)">
                        {getFieldDecorator('tag', {
                          initialValue: current.tag || undefined,
                        })(
                          <Select
                            allowClear
                            mode="tags"
                            disabled={isView}
                            placeholder="请选择会员标签(多选)"
                            showSearch
                          >
                            {getTagsOption()}
                          </Select>
                        )}
                      </FormItem>
                    </Col>

                    <Col md={8}>
                      <FormItem label="居住地址">
                        {getFieldDecorator('residentialAddress', {

                          initialValue: current.residentialAddress && current.residentialAddress.split(','),
                        })(
                          <Cascader style={{ width: '100%' }} options={citys} disabled={isView} placeholder="请选择省份" />
                        )}
                      </FormItem>
                    </Col>
                    <Col md={16}>
                      <FormItem>
                        {getFieldDecorator('conndetail', {

                          initialValue: current.conndetail,
                        })(
                          <Input
                            className="cascader-adress"
                            disabled={isView}
                            placeholder="请输入具体地址"
                          />
                        )}
                      </FormItem>
                    </Col>

                    <Col {...this.colLayout}>
                      <FormItem label="入会时间">
                        {getFieldDecorator('firstStartTime', {

                          initialValue: current.firstStartTime ? moment(current.firstStartTime) : null,
                        })(
                          <DatePicker
                            disabled
                            showTime
                            placeholder="请选择"
                            format="YYYY-MM-DD HH:mm:ss"
                            style={{ width: '100%' }}
                          />
                        )}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem label="入会邀请码">
                        {getFieldDecorator('recomPeople', {

                          initialValue: current.recomPeople,
                        })(<Input disabled placeholder="请输入入会邀请码" />)}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem label="APP推荐人">
                        {getFieldDecorator('recomPeople', {

                          initialValue: current.recomPeople,
                        })(<Input disabled placeholder="请输入APP推荐人" />)}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem label="首次绑车4S店">
                        {getFieldDecorator('foursname', {

                          initialValue: current.foursname,
                        })(<Input disabled placeholder="请输入首次绑车4S店" />)}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem label="数据来源">
                        {getFieldDecorator('source', {

                          initialValue: (current.source === null || current.source === 0) ? '新数据' : '历史数据',
                        })(<Input disabled placeholder="请输入数据来源" />)}
                      </FormItem>
                    </Col>
                    <Col {...this.colLayout}>
                      <FormItem label="数据来源端口">
                        {getFieldDecorator('dataSourceChannelStr', {

                          initialValue: current.dataSourceChannelStr,
                        })(<Input disabled placeholder="请输入数据来源端口" />)}
                      </FormItem>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>

            <div className="ant-card-head">
              <div className="ant-card-head-wrapper">
                <div className="ant-card-head-title">详细信息</div>
              </div>
            </div>

            <div className="ant-card-body">
              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="QQ号">
                    {getFieldDecorator('qq', {
                      rules: [{
                        pattern: /^[1-9][0-9]{4,14}$/, message: '请输入正确的QQ号码！',
                      }],
                      initialValue: current.qq,
                    })(<Input disabled={isView} placeholder="请输入QQ号" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="微信号">
                    {getFieldDecorator('weixin', {

                      initialValue: current.weixin,
                    })(<Input disabled placeholder="请输入微信号" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="E-mail">
                    {getFieldDecorator('mail', {
                      rules: [{
                        pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的E-mail！',
                      }],
                      initialValue: current.mail,
                    })(<Input disabled={isView} placeholder="请输入E-mail" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="生日日期">
                    {getFieldDecorator('dateofbirth', {

                      initialValue: current.dateofbirth ? moment(current.dateofbirth) : null,
                    })(
                      <DatePicker
                        showTime
                        disabled={isView}
                        placeholder="请选择"
                        format="YYYY-MM-DD HH:mm:ss"
                        style={{ width: '100%' }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="婚姻状况">
                    {getFieldDecorator('marry', {

                      initialValue: !!current.marry && String(current.marry) || undefined,
                    })(
                      <Select
                        allowClear
                        style={{ width: '100%' }}
                        disabled={isView}
                        placeholder="请选择婚姻状况"
                      >
                        <Option value="0">请选择婚姻状况</Option>
                        <Option value="1">未婚</Option>
                        <Option value="2">已婚</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="学历">
                    {getFieldDecorator('education', {

                      initialValue: !!current.education && String(current.education) || undefined,
                    })(
                      <Select
                        allowClear
                        style={{ width: '100%' }}
                        disabled={isView}
                        placeholder="请选择学历"
                      >
                        <Option value="0">请选择学历</Option>
                        <Option value="1">博士</Option>
                        <Option value="2">硕士</Option>
                        <Option value="3">本科/专科</Option>
                        <Option value="4">高中/中专/技术</Option>
                        <Option value="5">初中以下</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="行业">
                    {getFieldDecorator('industry', {

                      initialValue: !!current.industry && String(current.industry) || undefined,
                    })(
                      <Select
                        allowClear
                        style={{ width: '100%' }}
                        disabled={isView}
placeholder="请选择行业"
                      >
                        {getOption(industry, 'value')}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="公司名称">
                    {getFieldDecorator('workunit', {

                      initialValue: current.workunit,
                    })(<Input disabled={isView} placeholder="请输入公司名称" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="职务">
                    {getFieldDecorator('occupaction', {

                      initialValue: current.occupaction || undefined,
                    })(
                      <Select
                        allowClear
                        style={{ width: '100%' }}
                        disabled={isView}
placeholder="请选择职务"
                      >
                        {getOption(occupaction, 'value')}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="期望的提醒服务">
                    {getFieldDecorator('remindservice', {

                      initialValue: current.remindservice || undefined,
                    })(
                      <Select
                        allowClear
                        style={{ width: '100%' }}
                        disabled={isView}
placeholder="请选择期望的提醒服务"
                      >
                        {getOption(expectation, 'name')}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="期望的活动">
                    {getFieldDecorator('hopeactivity', {

                      initialValue: current.hopeactivity || undefined,
                    })(
                      <Select
                        allowClear
                        style={{ width: '100%' }}
                        disabled={isView}
placeholder="请选择期望的活动"
                      >
                        {getOption(hopeActivity, 'name')}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="客户性质">
                    {getFieldDecorator('unittype', {

                      initialValue: current.unittype || undefined,
                    })(
                      <Select
                        allowClear
                        style={{ width: '100%' }}
                        disabled={isView}
placeholder="请选择客户性质"
                      >
                        {getOption(unittype, 'value')}
                      </Select>
                    )}
                  </FormItem>
                </Col>

                <Col md={6}>
                  <FormItem label="兴趣爱好">
                    {getFieldDecorator('aihao1', {
                      initialValue: current.aihao1 || undefined,
                    })(
                      <Select
                        allowClear
                        style={{ width: '100%' }}
                        disabled={isView}
placeholder="休闲娱乐类"
                      >
                        {getOption(entertainment, 'name')}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={4}>
                  <FormItem label="">
                    {getFieldDecorator('aihao2', {

                      initialValue: current.aihao2 || undefined,
                    })(
                      <Select
                        allowClear
                        style={{ width: '100%' }}
                        disabled={isView}
placeholder="生活养生类"
                      >
                        {getOption(health, 'name')}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={4}>
                  <FormItem label="">
                    {getFieldDecorator('aihao3', {

                      initialValue: current.aihao3 || undefined,
                    })(
                      <Select
                        allowClear
                        style={{ width: '100%' }}
                        disabled={isView}
placeholder="体育运动类"
                      >
                        {getOption(sport, 'name')}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={4}>
                  <FormItem label="">
                    {getFieldDecorator('aihao4', {

                      initialValue: current.aihao4 || undefined,
                    })(
                      <Select
                        allowClear
                        style={{ width: '100%' }}
                        disabled={isView}
placeholder="收藏品鉴类"
                      >
                        {getOption(collection, 'name')}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col md={6}>
                  <FormItem>
                    {getFieldDecorator('aihao5', {

                      initialValue: current.aihao5,
                    })(
                      <Input
                        className="cascader-adress"
                        disabled={isView}
placeholder="其他：宅、上网、电子游戏、金融理财、其他"
                      />
                    )}
                  </FormItem>
                </Col>

                <Col md={8}>
                  <FormItem label="使用地址">
                    {getFieldDecorator('usingAddresse', {

                      initialValue: current.usingAddresse && current.usingAddresse.split(','),
                    })(
                      <Cascader style={{ width: '100%' }} options={citys} disabled={isView} placeholder="请选择省份" />
                    )}
                  </FormItem>
                </Col>
                <Col md={16}>
                  <FormItem>
                    {getFieldDecorator('unitdetail', {

                      initialValue: current.unitdetail,
                    })(
                      <Input
                        className="cascader-adress"
                        disabled={isView}
placeholder="请输入具体地址"
                      />
                    )}
                  </FormItem>
                </Col>

                <Col md={8}>
                  <FormItem label="身份证地址">
                    {getFieldDecorator('idcradAddress', {

                      initialValue: current.idcradAddress && current.idcradAddress.split(','),
                    })(
                      <Cascader style={{ width: '100%' }} options={citys} disabled={isView} placeholder="请选择省份" />
                    )}
                  </FormItem>
                </Col>
                <Col md={16}>
                  <FormItem>
                    {getFieldDecorator('paperdetail', {

                      initialValue: current.paperdetail,
                    })(
                      <Input
                        className="cascader-adress"
                        disabled={isView}
placeholder="请输入具体地址"
                      />
                    )}
                  </FormItem>
                </Col>

                <Col {...this.colLayout}>
                  <FormItem label="员工标识">
                    {getFieldDecorator('staffTag ', {

                      initialValue: current.staffTag ? current.staffTag : '否',
                    })(<Input disabled placeholder="请输入员工标识" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="套餐标识">
                    {getFieldDecorator('setmealTag', {

                      initialValue: current.setmealTag ? current.setmealTag : '否',
                    })(<Input disabled placeholder="请输入套餐标识" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="车辆标识">
                    {getFieldDecorator('carTag', {

                      initialValue: current.carTag ? current.carTag : '未认证',
                    })(<Input disabled placeholder="请输入车辆标识" />)}
                  </FormItem>
                </Col>
              </Row>
            </div>

            <div className="ant-card-head">
              <div className="ant-card-head-wrapper">
                <div className="ant-card-head-title">备用联系人</div>
              </div>
            </div>

            <div className="ant-card-body">
              <Row gutter={24}>

                <Col {...this.colLayout}>
                  <FormItem label="联系人1姓名">
                    {getFieldDecorator('remarkscontact', {

                      initialValue: current.remarkscontact,
                    })(<Input disabled={isView} placeholder="请输入联系人姓名" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="与会员关系">
                    {getFieldDecorator('contactperson', {

                      initialValue: current.contactperson,
                    })(<Input disabled={isView} placeholder="请输入与会员关系" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="手机号">
                    {getFieldDecorator('remarksphone', {
                      rules: [{ pattern: /^1(3|4|5|7|8)\d{9}$/, message: '输入的手机号有误！' }],
                      initialValue: current.remarksphone,
                    })(<Input disabled={isView} placeholder="请输入手机号" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="联系人2姓名">
                    {getFieldDecorator('remarkscontact1', {

                      initialValue: current.remarkscontact1,
                    })(<Input disabled={isView} placeholder="请输入联系人姓名" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="与会员关系">
                    {getFieldDecorator('contactperson1', {

                      initialValue: current.contactperson1,
                    })(<Input disabled={isView} placeholder="请输入与会员关系" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="手机号">
                    {getFieldDecorator('remarksphone1', {
                      rules: [{ pattern: /^1(3|4|5|7|8)\d{9}$/, message: '输入的手机号有误！' }],
                      initialValue: current.remarksphone1,
                    })(<Input disabled={isView} placeholder="请输入手机号" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col {...this.colLayout}>
                  <FormItem label="联系人3姓名">
                    {getFieldDecorator('remarkscontact2', {

                      initialValue: current.remarkscontact2,
                    })(<Input disabled={isView} placeholder="请输入联系人姓名" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="与会员关系">
                    {getFieldDecorator('contactperson2', {

                      initialValue: current.contactperson2,
                    })(<Input disabled={isView} placeholder="请输入与会员关系" />)}
                  </FormItem>
                </Col>
                <Col {...this.colLayout}>
                  <FormItem label="手机号">
                    {getFieldDecorator('remarksphone2', {
                      rules: [{ pattern: /^1(3|4|5|7|8)\d{9}$/, message: '输入的手机号有误！' }],
                      initialValue: current.remarksphone2,
                    })(<Input disabled={isView} placeholder="请输入手机号" />)}
                  </FormItem>
                </Col>
              </Row>
            </div>

          </Form>
        </Spin>
        <Button disabled={isView} type="primary" style={{ position: 'fixed', bottom: '15px', right: '20px' }} onClick={this.validate} loading={loadings}>
          提交
        </Button>
      </Fragment>
    )
  }
}
export default MemberInfo;