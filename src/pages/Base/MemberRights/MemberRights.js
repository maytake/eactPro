import React, { PureComponent } from 'react';
import { connect } from 'dva';
import MD5 from 'js-md5';
@connect(({ memberRights, loading }) => ({
  memberRights,
  loading: loading.models.memberRights,
}))
class MemberRights extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }


  dog() {
    const { dispatch } = this.props;
    dispatch({
      type: 'memberRights/fetchData',
      payload:{
        page : 1,
        pageSize : 10,
        sortType : 'code',
      }
    });
  }

  render() {
    return (
      <button onClick={this.dog.bind(this)}>会员权益</button>
    )
  }
}
export default MemberRights;
