import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card,Button, Icon } from 'antd';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';

import styles from './AddMember.less';
const { Description } = DescriptionList;

class AddMember extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      noTitleKey: 'app',
    };
  }

  onTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'memberInfo':
        router.push(`${match.url}/memberInfo`);
        break;
      case 'carInfo':
        router.push(`${match.url}/carInfo`);
        break;
      case 'packageInfo':
        router.push(`${match.url}/packageInfo`);
        break;
      default:
        break;
    }
  };

  render() {
    
    const {
      listLoading,
      children,
      match,
      location, } = this.props;

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
              <div className="member-sex"><strong>夏银华</strong> 女  金卡</div>
              <div className="member-button">
                <Button type="primary" icon="phone" size="small" />
                <Button type="primary" icon="message" size="small" />
                <Button type="primary" icon="file-text" size="small" />
           
              </div>
            </div>
            <div className="member-Info">
              <DescriptionList style={{ marginBottom: 15 }} size="small" col="4">
                <Description term="手机号码">18611452949</Description>
                <Description term="入会4S店">厦门盈众</Description>
                <Description term="入会时间">2017-02-08</Description>
                <Description term="APP">未下载</Description>
                <Description term="现金余额">0</Description>
                <Description term="成长值">7500</Description>
                <Description term="积分余额">1023</Description>
                <Description term="可用积分">1848</Description>
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