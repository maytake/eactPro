import React, { PureComponent } from 'react';
import { Table, Modal, Input, Form, Button, Row } from 'antd';

import styles from './SearchModel.less';
const FormItem = Form.Item;

@Form.create()
class SearchModel extends PureComponent {
  state = {
    selectedRows: [],
    selectedRowKeys: [],
  };

  render() {
    const { selectedRowKeys } = this.state;
    const {
      columns,
      data,
      modalVisible,
      handleAdd,
      handleModalVisible,
      form: { getFieldDecorator },
    } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      defaultCurrent: 2,
      total: 100,
      pageSize: 10,
    };

    const okHandle = () => {
      const { selectedRows } = this.state;
      handleAdd(selectedRows);
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: (_selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({
          selectedRowKeys:_selectedRowKeys,
          selectedRows,
        });
      },
     
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
          <Row style={{ textAlign: 'right', marginBottom: '16px' }}>
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
    );
  }
}
export default SearchModel;
