import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider } from 'antd';
import isEqual from 'lodash/isEqual';
import styles from './AddResource.less';

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
          console.log(preState.value);
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
          target[fieldName] = e.target.value;
          this.setState({ data: newData });
        };
        onChange(newData);
      
    }

    permissionAdd() {
        const { itemlist }=this.props;
        const { data } = this.state;
        const newData = data.map(item => ({ ...item }));
        this.index += 1;
        itemlist.key=`NEW_ID_${this.index}`;
        newData.push(itemlist);
        this.setState({ data: newData }); 
    }

    permissionDelete(key) {
        const { data } = this.state;
        const { onChange } = this.props;
        const newData = data.filter(item => item.key !== key);
        this.setState({ data: newData });
        // 表单的数据存储到上层组件或者 Redux、dva 中
        onChange(newData);
    }

    render() {
        const { loading, data } = this.state;
        const {columns} = this.props;



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
