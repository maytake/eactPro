import React, { PureComponent } from 'react';
import { Card, Avatar } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './UpdateInfo.less';

class UpdateInfo extends PureComponent {
    constructor(props){
      super(props);
      this.state={}
    }
  
  
    render(){
        
    const pageHeaderContent =
     
        <div className={styles.pageHeaderContent}>
          <div className={styles.avatar}>
            <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              早安，祝你开心每一天！
            </div>
            <div>
            祝你开心每一天
            </div>
          </div>
        </div>
    

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>项目数</p>
          <p>56</p>
        </div>
        <div className={styles.statItem}>
          <p>团队内排名</p>
          <p>
            8<span> / 24</span>
          </p>
        </div>
        <div className={styles.statItem}>
          <p>项目访问</p>
          <p>2,223</p>
        </div>
      </div>
    );

      return (
        <PageHeaderWrapper
            title="系统更新信息"
            content={pageHeaderContent}
            extraContent={extraContent}
        >
            <Card bordered={false}>

            </Card>
        </PageHeaderWrapper>
      )
    }
  }
  export default UpdateInfo;
  
