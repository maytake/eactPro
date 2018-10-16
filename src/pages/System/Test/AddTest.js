import React, { PureComponent } from 'react';
import Link from 'umi/link';
import router from 'umi/router';


class Test extends PureComponent {
  constructor(props){
    super(props);
    this.state={}
  }

  dog(){
    router.push('/ChangePassword');
  }

  render(){
    return (
      <div>233</div>
    )
  }
}
export default Test;
