import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AddResource from './AddResource';



 class Resource extends PureComponent {
  componentDidMount() {

  }

  render() {
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div>Resource</div>
        </Card>
        <AddResource />
      </PageHeaderWrapper>
    );
  }
}
export default Resource;