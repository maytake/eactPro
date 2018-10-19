import React, { PureComponent } from 'react';
import { Card, List } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './UpdateInfo.less';

class UpdateInfo extends PureComponent {
    constructor(props){
      super(props);
      this.state={}
    }
  
    render(){
      const pageHeaderContent =(
          <div className={styles.version}>
            <span className={styles.versionItem}><strong>版本名称：</strong> 2.0.0.20181017</span> 
            <span><strong>版本号：</strong> 2.0.0.20181017_release</span> 
          </div>
      )
      
      const extraContent = (
        <div>
          <strong>更新时间：</strong> 2018-10-17 12:30:00
        </div>
      );
      const noticList=[
        '1、APP2.8的所有接口及后台功能；',
        '2、所有接口添加参数验签校验；',
        '3、大部分接口添加登录校验；',
        '4、CRM后台修改客户手机号异常；',
        '5、被删除的套餐无法正常过户问题；',
        '6、原APP维保订单的服务单数据获取修改；',
      ]
      return (
        <PageHeaderWrapper
            title="系统更新信息"
            content={pageHeaderContent}
            extraContent={extraContent}
        >
            <Card bordered={false}>
              <List
                size="large"
                itemLayout="horizontal"
                dataSource={noticList}
                renderItem={item => (
                  <List.Item className={styles.listItem}>{item}</List.Item>
                )}
              />
            </Card>
        </PageHeaderWrapper>
      )
    }
  }
  export default UpdateInfo;
  
