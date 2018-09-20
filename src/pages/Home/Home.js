import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';



@connect(({ home, loading }) => ({
  home,
  loadings:  loading.effects['home/fetchBasic'],
}))
 class Home extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetchBasic',
    });
  }

  render() {
    const { home, loadings } = this.props;
    const { Introduction} = home;
    return (
      <PageHeaderWrapper
        title="更新简介"
        content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
      >
        <Card bordered={false} loading={loadings}>
          {Introduction.map((item) => (<div key={item}>{item}</div>))}
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default Home;