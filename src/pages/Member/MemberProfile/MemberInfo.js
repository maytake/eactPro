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
} from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import styles from './MemberInfo.less';
const Search = Input.Search;
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
  loading: loading.models.addMemberProfile,
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

  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      console.log(values);
      if (!error) {
        console.log(values);
      }
    });
  };

  render() {

    const {
      form: { getFieldDecorator },
      addMemberProfile: { dataSource, memberTags },
    } = this.props;
    if (Object.keys(dataSource).length === 0) { return null; }
    const entity = dataSource.entity;
    const current = entity || {};
    const industry=dataSource.industryLi;
    const occupaction=dataSource.occupactionLi;
    const unittype=dataSource.unittyLi;
    
    const citys = [{
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
          value: 'xihu',
          label: 'West Lake',
        }],
      }],
    }, {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
          value: 'zhonghuamen',
          label: 'Zhong Hua Men',
        }],
      }],
    }];

    const getTagsOption=()=>{
      return memberTags.map((item,i) => (
        <OptGroup key={item.description+i} label={item.description}>
          {
            item.load&&item.load.map((n,j)=> (
              <Option key={n.NAME+j} value={n.NAME}>
                {n.NAME}
              </Option> 
            ))
          }
        </OptGroup>
      ));
    }

    const getOption=(data)=>{
      return data.map((item,i) => (
        <Option key={item.value} value={item.value}>
          {item.value}
        </Option> 
      ));
    }
   

    return (
      <Fragment>
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
                        rules: [{ required: true, message: '请输入会员编码!' }],
                        initialValue: current.membercode,
                      })(<Input disabled placeholder="请输入会员编码" />)}
                    </FormItem>
                  </Col>
                  <Col {...this.colLayout}>
                    <FormItem label="会员卡号 ">
                      {getFieldDecorator('phusicalcardno', {
                        rules: [{ required: true, message: '请输入会员卡号 !' }],
                        initialValue: current.phusicalcardno,
                      })(<Input disabled placeholder="请输入会员卡号 " />)}
                    </FormItem>
                  </Col>
                  <Col {...this.colLayout}>
                    <FormItem label="会员昵称">
                      {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '请输入会员昵称!' }],
                        initialValue: current.nickname,
                      })(<Input disabled placeholder="请输入会员昵称" />)}
                    </FormItem>
                  </Col>
                  <Col {...this.colLayout}>
                    <FormItem label="会员姓名">
                      {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入会员姓名!' }],
                        initialValue: current.name,
                      })(<Input placeholder="请输入会员姓名！" />)}
                    </FormItem>
                  </Col>
                  <Col {...this.colLayout}>
                    <FormItem label="会员性别">
                      {getFieldDecorator('sex', {
                        rules: [{ required: true, message: '请选择会员性别!' }],
                        initialValue: current.sex&&String(current.sex)||undefined,
                      })(
                        <Select
                          style={{ width: '100%' }}
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
                        rules: [{ required: true, message: '请输入手机号!' }],
                        initialValue: current.mobilephone,
                      })(<Input disabled placeholder="请输入手机号" />)}
                    </FormItem>
                  </Col>

                  <Col {...this.colLayout}>
                    <FormItem label="证件类型">
                      {getFieldDecorator('paperstype', {
                        rules: [{ required: true, message: '请选择证件类型!' }],
                        initialValue: current.paperstype&&String(current.paperstype)||undefined,
                      })(
                        <Select
                          style={{ width: '100%' }}
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
                        rules: [{ required: true, message: '请输入部门!' }],
                        initialValue: current.paperscode,
                      })(<Input placeholder="请输入部门" />)}
                    </FormItem>
                  </Col>
                  <Col {...this.colLayout}>
                    <FormItem label="(多选)会员标签">
                      {getFieldDecorator('tag', {
                        initialValue: current.tag || undefined,
                      })(
                        <Select
                          mode="tags"
                          showSearch
                        >
                          {getTagsOption()}
                        </Select>
                      )}
                    </FormItem>
                  </Col>

                  <Col md={8}>
                    <FormItem label="居住地址">
                      {getFieldDecorator('province', {
                        rules: [{ required: true, message: '请选择4Sshop!' }],
                        initialValue: current.province,
                      })(
                        <Cascader style={{ width: '100%' }} options={citys} placeholder="请选择省份" />
                      )}
                    </FormItem>
                  </Col>
                  <Col md={16}>
                    <FormItem>
                      {getFieldDecorator('conndetail', {
                        rules: [{ required: true, message: '请输入具体地址!' }],
                        initialValue: current.conndetail,
                      })(
                        <Input
                          className="cascader-adress"
                          placeholder="请输入具体地址"
                        />
                      )}
                    </FormItem>
                  </Col>

                  <Col {...this.colLayout}>
                    <FormItem label="入会时间">
                      {getFieldDecorator('firstStartTime', {
                        rules: [{ required: true, message: '请选择入会时间!' }],
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
                        rules: [{ required: true, message: '请输入入会邀请码!' }],
                        initialValue: current.recomPeople,
                      })(<Input disabled placeholder="请输入入会邀请码" />)}
                    </FormItem>
                  </Col>
                  <Col {...this.colLayout}>
                    <FormItem label="APP推荐人">
                      {getFieldDecorator('recomPeople', {
                        rules: [{ required: true, message: '请输入APP推荐人!' }],
                        initialValue: current.recomPeople,
                      })(<Input disabled placeholder="请输入APP推荐人" />)}
                    </FormItem>
                  </Col>
                  <Col {...this.colLayout}>
                    <FormItem label="首次绑车4S店">
                      {getFieldDecorator('foursname', {
                        rules: [{ required: true, message: '请输入首次绑车4S店!' }],
                        initialValue: current.foursname,
                      })(<Input disabled placeholder="请输入首次绑车4S店" />)}
                    </FormItem>
                  </Col>
                  <Col {...this.colLayout}>
                    <FormItem label="数据来源">
                      {getFieldDecorator('source', {
                        rules: [{ required: true, message: '请输入数据来源!' }],
                        initialValue: current.source===0?'新数据':'历史数据',
                      })(<Input disabled placeholder="请输入数据来源" />)}
                    </FormItem>
                  </Col>
                  <Col {...this.colLayout}>
                    <FormItem label="数据来源端口">
                      {getFieldDecorator('dataSourceChannelStr', {
                        rules: [{ required: true, message: '请输入数据来源端口!' }],
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
                    rules: [{ required: true, message: '请输入QQ号!' }],
                    initialValue: current.qq,
                  })(<Input placeholder="请输入QQ号" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout}>
                <FormItem label="微信号">
                  {getFieldDecorator('weixin', {
                    rules: [{ required: true, message: '请输入微信号!' }],
                    initialValue: current.weixin,
                  })(<Input disabled placeholder="请输入微信号" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout}>
                <FormItem label="E-mail">
                  {getFieldDecorator('mail', {
                    rules: [{ required: true, message: '请输入E-mail!' }],
                    initialValue: current.mail,
                  })(<Input placeholder="请输入E-mail" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout}>
                <FormItem label="生日日期">
                  {getFieldDecorator('dateofbirth', {
                    rules: [{ required: true, message: '请选择生日日期!' }],
                    initialValue: current.dateofbirth ? moment(current.dateofbirth) : null,
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
                <FormItem label="婚姻状况">
                  {getFieldDecorator('marry', {
                    rules: [{ required: true, message: '请选择婚姻状况!' }],
                    initialValue: current.marry&&String(current.marry)||undefined,
                  })(
                    <Select
                      style={{ width: '100%' }}
                      placeholder="请选择婚姻状况"
                    >
                      <Option value="1">男</Option>
                      <Option value="2">女</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col {...this.colLayout}>
                <FormItem label="学历">
                  {getFieldDecorator('education', {
                    rules: [{ required: true, message: '请选择学历!' }],
                    initialValue: current.education&&String(current.education)||undefined,
                  })(
                    <Select
                      style={{ width: '100%' }}
                      placeholder="请选择学历"
                    >
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
                  {getFieldDecorator('education', {
                    rules: [{ required: true, message: '请选择行业!' }],
                    initialValue: current.education&&String(current.education)||undefined,
                  })(
                    <Select
                      style={{ width: '100%' }}
                      placeholder="请选择行业"
                    >
                     {getOption(industry)}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col {...this.colLayout}>
                <FormItem label="公司名称">
                  {getFieldDecorator('workunit', {
                    rules: [{ required: true, message: '请输入公司名称!' }],
                    initialValue: current.workunit,
                  })(<Input placeholder="请输入公司名称" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout}>
                <FormItem label="职务">
                  {getFieldDecorator('occupaction', {
                    rules: [{ required: true, message: '请选择职务!' }],
                    initialValue: current.occupaction,
                  })(
                    <Select
                      style={{ width: '100%' }}
                      placeholder="请选择职务"
                    >
                      {getOption(occupaction)}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col {...this.colLayout}>
                <FormItem label="期望的提醒服务">
                  {getFieldDecorator('remindservice', {
                    rules: [{ required: true, message: '请选择期望的提醒服务!' }],
                    initialValue: current.remindservice,
                  })(
                    <Select
                      style={{ width: '100%' }}
                      placeholder="请选择期望的提醒服务"
                    >
                      <option value="高级管理者">高级管理者</option>
                      <option value="高级职员">高级职员</option>
                      <option value="其他">其他</option>
                      <option value="一般职员">一般职员</option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col {...this.colLayout}>
                <FormItem label="期望的活动">
                  {getFieldDecorator('hopeactivity', {
                    rules: [{ required: true, message: '请选择期望的活动!' }],
                    initialValue: current.hopeactivity,
                  })(
                    <Select
                      style={{ width: '100%' }}
                      placeholder="请选择期望的活动"
                    >
                      <option value="高级管理者">高级管理者</option>
                      <option value="高级职员">高级职员</option>
                      <option value="其他">其他</option>
                      <option value="一般职员">一般职员</option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col {...this.colLayout}>
                <FormItem label="客户性质">
                  {getFieldDecorator('unittype', {
                    rules: [{ required: true, message: '请选择客户性质!' }],
                    initialValue: current.unittype||'',
                  })(
                    <Select
                      style={{ width: '100%' }}
                      placeholder="请选择客户性质"
                    >
                      {getOption(unittype)}
                    </Select>
                  )}
                </FormItem>
              </Col>

              <Col md={8}>
                <FormItem label="兴趣爱好">
                  {getFieldDecorator('province', {
                    rules: [{ required: true, message: '请选择4Sshop!' }],
                    initialValue: current.province,
                  })(
                    <Cascader style={{ width: '100%' }} options={citys} placeholder="请选择省份" />
                  )}
                </FormItem>
              </Col>
              <Col md={16}>
                <FormItem>
                  {getFieldDecorator('aihao5', {
                    rules: [{ required: true, message: '其他：宅、上网、电子游戏、金融理财、其他!' }],
                    initialValue: current.aihao5,
                  })(
                    <Input
                      className="cascader-adress"
                      placeholder="其他：宅、上网、电子游戏、金融理财、其他"
                    />
                  )}
                </FormItem>
              </Col>

              <Col md={8}>
                <FormItem label="使用地址">
                  {getFieldDecorator('province', {
                    rules: [{ required: true, message: '请选择4Sshop!' }],
                    initialValue: current.province,
                  })(
                    <Cascader style={{ width: '100%' }} options={citys} placeholder="请选择省份" />
                  )}
                </FormItem>
              </Col>
              <Col md={16}>
                <FormItem>
                  {getFieldDecorator('unitdetail', {
                    rules: [{ required: true, message: '请输入具体地址!' }],
                    initialValue: current.unitdetail,
                  })(
                    <Input
                      className="cascader-adress"
                      placeholder="请输入具体地址"
                    />
                  )}
                </FormItem>
              </Col>

              <Col md={8}>
                <FormItem label="身份证地址">
                  {getFieldDecorator('paperdetail', {
                    rules: [{ required: true, message: '请选择4Sshop!' }],
                    initialValue: current.paperdetail,
                  })(
                    <Cascader style={{ width: '100%' }} options={citys} placeholder="请选择省份" />
                  )}
                </FormItem>
              </Col>
              <Col md={16}>
                <FormItem>
                  {getFieldDecorator('paperdetail', {
                    rules: [{ required: true, message: '请输入具体地址!' }],
                    initialValue: current.paperdetail,
                  })(
                    <Input
                      className="cascader-adress"
                      placeholder="请输入具体地址"
                    />
                  )}
                </FormItem>
              </Col>

              <Col {...this.colLayout}>
                <FormItem label="员工标识">
                  {getFieldDecorator('staffTag ', {
                    rules: [{ required: true, message: '请输入员工标识!' }],
                    initialValue: current.staffTag ? current.staffTag : '否',
                  })(<Input disabled placeholder="请输入员工标识" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout}>
                <FormItem label="套餐标识">
                  {getFieldDecorator('setmealTag', {
                    rules: [{ required: true, message: '请输入套餐标识!' }],
                    initialValue: current.setmealTag ? current.setmealTag : '否',
                  })(<Input disabled placeholder="请输入套餐标识" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout}>
                <FormItem label="车辆标识">
                  {getFieldDecorator('carTag', {
                    rules: [{ required: true, message: '请输入车辆标识!' }],
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
                    rules: [{ required: true, message: '请输入联系人姓名!' }],
                    initialValue: current.remarkscontact,
                  })(<Input placeholder="请输入联系人姓名" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout}>
                <FormItem label="与会员关系">
                  {getFieldDecorator('contactperson', {
                    rules: [{ required: true, message: '请输入与会员关系!' }],
                    initialValue: current.contactperson,
                  })(<Input placeholder="请输入与会员关系" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout}>
                <FormItem label="手机号">
                  {getFieldDecorator('remarksphone', {
                    rules: [{ required: true, message: '请输入手机号!' }],
                    initialValue: current.remarksphone,
                  })(<Input placeholder="请输入手机号" />)}
                </FormItem>
              </Col>

              <Col {...this.colLayout}>
                <FormItem label="联系人2姓名">
                  {getFieldDecorator('remarkscontact1', {
                    rules: [{ required: true, message: '请输入联系人姓名!' }],
                    initialValue: current.remarkscontact1,
                  })(<Input placeholder="请输入联系人姓名" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout}>
                <FormItem label="与会员关系">
                  {getFieldDecorator('contactperson1', {
                    rules: [{ required: true, message: '请输入与会员关系!' }],
                    initialValue: current.contactperson1,
                  })(<Input placeholder="请输入与会员关系" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout}>
                <FormItem label="手机号">
                  {getFieldDecorator('remarksphone1', {
                    rules: [{ required: true, message: '请输入手机号!' }],
                    initialValue: current.remarksphone1,
                  })(<Input placeholder="请输入手机号" />)}
                </FormItem>
              </Col>

              <Col {...this.colLayout}>
                <FormItem label="联系人3姓名">
                  {getFieldDecorator('remarkscontact2', {
                    rules: [{ required: true, message: '请输入联系人姓名!' }],
                    initialValue: current.remarkscontact2,
                  })(<Input placeholder="请输入联系人姓名" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout}>
                <FormItem label="与会员关系">
                  {getFieldDecorator('contactperson2', {
                    rules: [{ required: true, message: '请输入与会员关系!' }],
                    initialValue: current.contactperson2,
                  })(<Input placeholder="请输入与会员关系" />)}
                </FormItem>
              </Col>
              <Col {...this.colLayout}>
                <FormItem label="手机号">
                  {getFieldDecorator('remarksphone2', {
                    rules: [{ required: true, message: '请输入手机号!' }],
                    initialValue: current.remarksphone2,
                  })(<Input placeholder="请输入手机号" />)}
                </FormItem>
              </Col>
            </Row>
          </div>


        </Form>
        <Button type="primary" style={{position:'fixed',bottom:'15px',right:'20px'}} onClick={this.validate}>
            提交
        </Button>
      </Fragment>
    )
  }
}
export default MemberInfo;