import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';



 class Resource extends PureComponent {
  componentDidMount() {

  }

  render() {
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div>Resource</div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default Resource;