import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card,Button, Icon } from 'antd';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';

import styles from './AddMember.less';
const { Description } = DescriptionList;

@connect(({ addMemberProfile, loading }) => ({
  addMemberProfile,
  listLoading: loading.models.addMemberProfile,
}))
class AddMember extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const id=this.props.location.query.id;
    if(id){
      this.getEdit(id);
    }else{
      this.getData();
    };
    dispatch({
      type: 'addMemberProfile/getMemberTags',
    });
  };

  getData(){
    const { dispatch } = this.props;
    dispatch({
      type: 'addMemberProfile/defaultData',
    });
    
  };

  getEdit(id){
    const { dispatch } = this.props;
    dispatch({
      type: 'addMemberProfile/toUpdate',
      payload:{
        pkMembermgcust:id,
      }
    });
  };

  onTabChange = key => {
    const id=this.props.location.query.id;
    const { match } = this.props;
    switch (key) {
      case 'memberInfo':
        router.push({
          pathname:`${match.url}/memberInfo`,
          query:{id}
        });
        break;
      case 'becomeMember':
        router.push({
          pathname:`${match.url}/becomeMember`,
          query:{id}
        });
        break;
      case 'carInfo':
        router.push({
          pathname:`${match.url}/carInfo`,
          query:{id}
        });
        break;
      case 'packageInfo':
        router.push({
          pathname:`${match.url}/packageInfo`,
          query:{id}
        });
        break;
      default:
        break;
    }
  };

  render() {
    
    const {
      listLoading,
      children,
      addMemberProfile:{dataSource},
      match,
      location, } = this.props;
    if(Object.keys(dataSource).length===0){return null;}
    const entity = dataSource.entity;
    const operationTabList = [
      {
        key: 'memberInfo',
        tab: '会员信息',
      },
      {
        key: 'becomeMember',
        tab: '入会信息',
      },
      {
        key: 'carInfo',
        tab: '车辆信息',
      },
      {
        key: 'packageInfo',
        tab: '套餐信息',
      },
      {
        key: 'receiptInfo',
        tab: '账户明细',
      },
      {
        key: 'dealHistory',
        tab: '交易历史',
      },
      {
        key: 'communicateHistory',
        tab: '沟通历史',
      },
      {
        key: 'modifyHistory',
        tab: '变更历史',
      },
      {
        key: 'visitHistory',
        tab: '访问历史',
      },
    ];

    return (
      <PageHeaderWrapper>
        <section className={styles.memberInfo}>
          <main className="member-header">
            <div className="member-portrait"> 
              <div className="member-sex"><strong>{entity.name}</strong> {entity.sex}  {entity.gradename}</div>
              <div className="member-button">
                <Button type="primary" icon="phone" size="small" />
                <Button type="primary" icon="message" size="small" />
                <Button type="primary" icon="file-text" size="small" />
              </div>
            </div>
            <div className="member-Info">
              <DescriptionList style={{ marginBottom: 15 }} size="small" col="4">
                <Description term="手机号码">{entity.mobilephone}</Description>
                <Description term="入会4S店">{entity.foursname}</Description>
                <Description term="入会时间">{entity.firstStartTime}</Description>
                <Description term="APP">{entity.isDownload===0?'未下载':'已下载'}</Description>
                <Description term="现金余额">{entity.accountbalance}</Description>
                <Description term="成长值">{entity.growupvalue}</Description>
                <Description term="积分余额">{entity.integralvalue}</Description>
                <Description term="可用积分">{entity.availableintegralvalue===null?0:entity.availableintegralvalue}</Description>
              </DescriptionList>
              
            </div>
          </main>
          <Card
            bordered={false}
            style={{ width: '100%' }}
            tabList={operationTabList}
            activeTabKey={location.pathname.replace(`${match.path}/`, '')}
            onTabChange={(key) => { this.onTabChange(key); }}
            loading={listLoading}
          >
            {children}
          </Card>
        </section>

      </PageHeaderWrapper>
    );
  }
}
export default AddMember;