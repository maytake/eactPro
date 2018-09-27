import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';



 class User extends PureComponent {
  componentDidMount() {

  }

  render() {
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div>User</div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default User;