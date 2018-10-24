import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input,Select, message, Popconfirm, Divider } from 'antd';
import isEqual from 'lodash/isEqual';
import styles from './AddResource.less';
const Option = Select.Option;
class TableForm extends PureComponent {
    index = 0;

    
    constructor(props) {
        super(props);

        this.state = {
            data: props.value,
            loading: false,
            /* eslint-disable-next-line react/no-unused-state */
            value: props.value,
        };
    }

    static getDerivedStateFromProps(nextProps, preState) {
        if (isEqual(nextProps.value, preState.value)) {
          // console.log(preState.value);
          return null;
        }
        return {
          data: nextProps.value,
          value: nextProps.value,
        };
      }
    
    getRowByKey(key, newData) {
        const { data } = this.state;
        return (newData || data).filter(item => item.key === key)[0];
    }

    handleFieldChange(e, fieldName, key) {
        const { data } = this.state;
        const { onChange } = this.props;
        const newData = data.map(item => ({ ...item }));
        const target = this.getRowByKey(key, newData);
        if (target) {
            if(e.target) {
                target[fieldName]=e.target.value
            }else{
                target[fieldName]=e;
            };  
            this.setState({ data: newData });
        };
        onChange(newData);
      
    }

    permissionAdd() {
        const { data } = this.state;
        const newData = data.map(item => ({ ...item }));
        const item = {
            key: `NEW_ID_${this.index}`,
            type:'',
            name: '',
            permission: ''
        };
        this.index += 1;
        newData.push(item);
        this.setState({ data: newData }); 
    }

    permissionDelete(key) {
        const { data } = this.state;
        const { onChange } = this.props;
        const newData = data.filter(item => item.key !== key);
        this.setState({ data: newData });
        // FormItem的onChange方法，表单的数据存储到上层组件或者 Redux、dva 中
        onChange(newData);
    }

    render() {
        const { loading, data } = this.state;
        const columns = [
            {
                title: '选择类型',
                dataIndex: 'type',
                key: 'type',
                render: (text, record) => (
                    <Select 
                        defaultValue="lucy" 
                        onChange={e => this.handleFieldChange(e, 'type', record.key)}
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>

                ),
            },{
            title: '按钮名称',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Input 
                value={text}
                onChange={e => this.handleFieldChange(e, 'name', record.key)}
                placeholder="请输入按钮名称" 
                />
            ),
        }, {
            title: '按钮权限字符串 ',
            dataIndex: 'permission',
            key: 'permission',
            render: (text, record) => (
                <Input 
                value={text}
                onChange={e => this.handleFieldChange(e, 'permission', record.key)}
                placeholder="请输入按钮权限字符串"
                />
            ),
        }, {
            title: '操作',
            key: 'action',
            width: '65px',
            render: (text, record) => (
                <Popconfirm title="是否要删除此行？" onConfirm={() => this.permissionDelete(record.key)}>
                    <Button icon="delete" type="primary"></Button>
                </Popconfirm>
            ),
        }];

        return (
            <Fragment>
                <Table
                    loading={loading}
                    bordered
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
                <Button
                    style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                    type="dashed"
                    onClick={() => this.permissionAdd()}
                    icon="plus"
                >
                    新增成员
                </Button>
            </Fragment>
        )
    }
}

export default TableForm;
