const dataSource = [
    {
        key: '0',
        account: '112267',
        name: '温晶晶',
        time: '2018-08-08 12:06:27',
        agency: '惠安盈众',
        role: '销售顾问',
        phone: '15906013968',
        email: '	xiaolin.xie@enjoyauto.com	',
        mall: '商城',
        status: '1',
    },
    {
        key: '1',
        account: '212267',
        name: '温晶晶',
        time: '2018-08-08 12:06:27',
        agency: '惠安盈众',
        role: '销售顾问',
        phone: '15906013968',
        email: '	xiaolin.xie@enjoyauto.com	',
        mall: '商城',
        status: '2',
    },
];

const content = {
    name: "酷酷的",
    category: 150, 
    members:[ 
        {key: "1", type: "lucy", name: "John Brown", permission: "New York No. 1 Lake Park"},
        {key: "2", type: "jack", name: "Jim Green", permission: "London No. 1 Lake Park"}
    ],
    permission: "authority", 
    visibleRange: "2", 
    urlPath: "/system/resource",
}


export default {
    'GET /api/UserList': (req, res) => {
        res.send({ status: 'ok', dataSource });
    },
    'POST /api/UserList': (req, res) => {
        res.send({ status: 'ok', dataSource });
    },

    'POST /api/AddUser': (req, res) => {
        res.send({ status: 'ok', msg: '提交成功！' });
    },
    'POST /api/SetUserPassword': (req, res) => {
        res.send({ status: 'ok', msg: '密码设置成功！' });
    },
    'GET /api/RomoveUser': (req, res) => {
        res.send({ status: 'ok', msg: '删除成功！' });
    },
    'GET /api/ChangeStatus': (req, res) => {
        if (req.query.status === '1') {
            res.send({ status: 'ok', msg: '启用成功！' });
        } else {
            res.send({ status: 'ok', msg: '停用成功!' });
        }
    },
    'GET /api/getUpdate': (req, res) => {
        res.send({ status: 'ok', content,});
    },
}
