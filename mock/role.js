
const dataSource = {
    list: [{
        key: '1',
        name: '开发人员',
        code: 1001031,
        type: '4S店服务顾问',
        status: '启用',
    }, {
        key: '2',
        name: '开发人员',
        code: 1001031,
        type: '4S店服务顾问',
        status: '启用',
    }],
    pagination: { 
        total: 46, 
        pageSize: 10, 
        current: 1
    }
}

const content = {
    roleName: "库里", 
    roleCode: "23203131", 
    status: "Y", 
    type: "1",
    permission:[ "0-0-1-0"]
}

export default {
    'GET /api/RoleList': (req, res) => {
        res.send({ status: 'ok', dataSource });
    },
    'POST /api/RoleList': (req, res) => {
        res.send({ status: 'ok', dataSource });
    },
    'POST /api/AddRole': (req, res) => {
        res.send({ status: 'ok', msg: '提交成功！', dataSource });
    },
    'GET /api/RomoveRole': (req, res) => {
        res.send({ status: 'ok', msg: '删除成功！', dataSource });
    },
    'GET /api/getRoleUpdate': (req, res) => {
        res.send({ status: 'ok', content, });
    },

}
