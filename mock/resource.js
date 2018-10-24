const dataSource = [
  {
    key: '1',
    name: '分享达人',
    url: '/yzqc/mbe_communication/wechat_template/mbe_wechat_template_list',
    string: 'wechatPushConfig:*',
    visibleRange: '仅集团可见',
  },
  {
    key: '2',
    name: '分享达人',
    url: '/yzqc/mbe_communication/wechat_template/mbe_wechat_template_list',
    string: 'wechatPushConfig:*',
    visibleRange: '仅集团可见',
  },
];


const content = {
  name: "酷酷的",
  category: 150, 
  members:[ 
      {key: "1", type: "lucy", name: "John Brown", permission: "New York No. 1 Lake Park"},
      {key: "2", type: "jack", name: "Jim Green", permission: "London No. 1 Lake Park"},
      {key: "3", type: "lucy", name: "Jim Green", permission: "Bositon No. 1 Lake Park"}
  ],
  permission: "authority", 
  visibleRange: "2", 
  urlPath: "/system/resource",
}


export default {
  'GET /api/Resource': dataSource,
  'POST /api/AddResource': (req, res) => {
    res.send({ status: 'ok', msg: '提交成功！' });
  },
  'GET /api/RomoveResource': (req, res) => {
    res.send({ status: 'ok', msg: '删除成功！' });
  },
  'GET /api/getUpdate': (req, res) => {
      res.send({ status: 'ok', content,});
  },
};
