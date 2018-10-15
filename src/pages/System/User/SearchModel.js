import React, { PureComponent } from 'react';
import { Table, Modal, Input, Form, Button, Row } from 'antd';

import styles from './SearchModel.less';
const FormItem = Form.Item;

@Form.create()
class SearchModel extends PureComponent {
  state={}

  render(){

    const { modalVisible, handleAdd, handleModalVisible,form: { getFieldDecorator }} = this.props;
    
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      defaultCurrent: 2,
      total: 100,
      pageSize: 10,
    };

    const columns = [{
      title: '编码',
      dataIndex: 'code',
      sorter: (a, b) => a.code - b.code,
    }, {
      title: '名称',
      dataIndex: 'name',
      sorter: (a, b) =>{
        console.log(a.name.localeCompare(b.name,  'zh-CN'));
        return a.name.localeCompare(b.name,  'zh-CN');
      } 
    },{
      title:'描述',
      dataIndex: 'describe',
      sorter: (a, b) =>{
        return a.describe.localeCompare(b.describe,  'zh-CN');
      } 
    }];

    const data = [{
      key: '1',
      code: 10524,
      name: '德化盈众',
      describe: '泉州盈众汽车销售服务有限公司德化分公司是盈众集团旗',
    },{
      key: '2',
      code: 10525,
      name: '福海盈众',
      describe: '厦门盈众汽车销售服务有限公司德化分公司是盈众集团旗',
    },{
      key: '3',
      code: 10526,
      name: '漳州盈众',
      describe: '漳州盈众汽车销售服务有限公司德化分公司是盈众集团旗',
    }];
    
    const okHandle = () => {
      handleAdd();
    }

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      }
    };

    return (
      <Modal
      title="新增资源"
      className={styles.standardListForm}
      width={960}
      bodyStyle={{ padding: '28px 20px 0' }}
      destroyOnClose
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      >

      <Form onSubmit={this.handleSearch} layout="inline">
        <Row style={{textAlign:'right',marginBottom:'16px'}}>
          <FormItem>{getFieldDecorator('code ')(<Input placeholder="编号" />)}</FormItem>
          <FormItem>{getFieldDecorator('name')(<Input placeholder="姓名" />)}</FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </FormItem>
        </Row>
      </Form>

      <Table 
          rowSelection={rowSelection}
          columns={columns} 
          dataSource={data} 
          pagination={paginationProps}
          size="small"
      /> 
      </Modal>
      
    )
  }
}
export default SearchModel;
