import React, { PureComponent } from 'react';
import { Table, Modal, Input, Form, Button, Row } from 'antd';

const FormItem = Form.Item;

@Form.create()
class SearchModel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      selectedRowKeys: props.selectedKeys,
    };
  }


  render() {
    const { selectedRowKeys, selectedRows } = this.state;
    const {modelKey} = this.props;
    const {
      columns,
      tableData,
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
      handleAdd({selectedRows,modelKey});
    };

    const rowSelection = {
     
      onChange: (_selectedRowKeys, _selectedRows) => {
        this.setState({
          selectedRowKeys:_selectedRowKeys,
          selectedRows:_selectedRows,
        });
      },
     
    };

    return (
      <Modal
        title="新增资源"
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
          dataSource={tableData}
          pagination={paginationProps}
          size="small"
        />
      </Modal>
    );
  }
}
export default SearchModel;
