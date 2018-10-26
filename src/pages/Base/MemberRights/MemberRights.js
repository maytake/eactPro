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

    function getNonce() {
      var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
      var value = "";
      var num = Math.floor(Math.random() * 25 + 8);
      for (var i = 0; i < num; i++) {
        var id = parseInt(Math.random() * 61);
        value += chars[id];
      }
      return value;
    }


    var ts = new Date().getTime();
    var str = '{ "password": "Santy_011", "username": "109039" }';
    const sign = MD5('content=' + str + 'nonce=' + getNonce() + '&signMethod=MD5&ts=' + ts + '&type=crm3&version=3.0&SECRET=AD7061F216EC445083C921D7EDD85DEF').toLowerCase();
    
    console.log(sign);
    const data = {
      "content": "{\"password\":\"Santy_011\",\"username\":\"109039\"}",
      "ts": "1540518073000",
      "signMethod": "MD5",
      "type": "crm3",
      "sign": sign,
      "nonce": "fAsLv4YXGywB08CAulVUvfX7B0dyTNz",
      "version": "3.0"
    }


    const { dispatch } = this.props;
    dispatch({
      type: 'memberRights/fetchData',
      payload: data,
    });
  }

  render() {
    return (
      <button onClick={this.dog.bind(this)}>会员权益</button>
    )
  }
}
export default MemberRights;
