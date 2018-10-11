const dataSource = [{
    key: '1',
    name: '分享达人',
    url: '/yzqc/mbe_communication/wechat_template/mbe_wechat_template_list',
    string: 'wechatPushConfig:*',
    visibleRange:'仅集团可见'

},{
  key: '2',
  name: '分享达人',
  url: '/yzqc/mbe_communication/wechat_template/mbe_wechat_template_list',
  string: 'wechatPushConfig:*',
  visibleRange:'仅集团可见'

}];
export default {
    'GET /api/Resource': dataSource,
    'POST /api/AddResource' :(req, res) => {
      res.send({ status: 'ok', msg: '提交成功！' });
    },
  };
  