import React, { PureComponent } from 'react';
import { Card, List } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './UpdateInfo.less';

@connect(({ updateInfo, loading }) => ({
  updateInfo,
  loading: loading.effects['updateInfo/queryInfo'],
}))
class UpdateInfo extends PureComponent {
    constructor(props){
      super(props);
      this.state={}
    }

    componentDidMount() {
      const { dispatch } = this.props;
      dispatch({
        type: 'updateInfo/queryInfo',
      });
    }

    render(){
      
      const { updateInfo:{information}, loading }=this.props;
      if (information.length===0) {
        return '';
      };
      const noticeData=information.updateContent.replace(/\n/g,'').split('；');
      const pageHeaderContent =(
          <div className={styles.version}>
            <span className={styles.versionItem}><strong>版本名称：</strong> {information.versionName}</span> 
            <span><strong>版本号：</strong> {information.versionNo}</span> 
          </div>
      )
      
      const extraContent = (
        <div>
          <strong>更新时间：</strong>{information.updateTime}
        </div>
      );

      return (
        <PageHeaderWrapper
            title="系统更新信息"
            content={pageHeaderContent}
            extraContent={extraContent}
        >
            <Card bordered={false} loading={loading}>
              <List
                size="large"
                itemLayout="horizontal"
                dataSource={noticeData}
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
  
