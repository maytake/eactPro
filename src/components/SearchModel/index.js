import React, { PureComponent } from 'react';
import { Table, Modal, Input, Form, Button, Row } from 'antd';
import isEqual from 'lodash/isEqual';
const FormItem = Form.Item;

@Form.create()
class SearchModel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      selectedRowKeys: props.selectedKeys,
      columns:props.columns,
    };
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.columns, preState.columns)) {
      return null;
    }
    return {
      columns:nextProps.columns,
    };
  }

  render() {
    const { selectedRowKeys, columns, selectedRows } = this.state;
    const {
      tableData,
      modalVisible,
      handleAdd,
      handleSearch,
      handleTableChange,
      handleModalVisible,
      form: { getFieldDecorator },
      tableLoading,
      selectionType,
      total,
      pageSize,
    } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      total: Number(total),
      pageSize: Number(pageSize),
      defaultCurrent: 1,
    };

    const okHandle = () => {
      handleAdd({selectedRows});
    };
    
    const validateSearch=(e)=>{
      e.preventDefault();
      const { form } = this.props;
      form.validateFields((err, fieldsValue) => {
          if (err) return;
          handleSearch(fieldsValue);
      });
    }

    const rowSelection = {
      type:selectionType,
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
        <Form onSubmit={validateSearch} layout="inline">
          <Row style={{ textAlign: 'right', marginBottom: '16px' }}>
            <FormItem style={{display:'none'}}>{getFieldDecorator('code')(<Input placeholder="编号" />)}</FormItem>
            <FormItem>{getFieldDecorator('name')(<Input placeholder="姓名" />)}</FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </FormItem>
          </Row>
        </Form>

        <Table
          loading={tableLoading}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={tableData}
          pagination={paginationProps}
          onChange={handleTableChange}
          size="small"
        />
      </Modal>
    );
  }
}
export default SearchModel;
