/* eslint-disable no-nested-ternary */
import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Icon, Select, Badge, Form, Button, Modal, message, Table, Tooltip } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { AddKey } from '@/utils/utils';
import styles from './AddMember.less';
import loading from "../../../layouts/BasicLayout";
const { Option } = Select;
const FormItem = Form.Item;

@connect(({ carInfo, loading }) => ({
    carInfo,
    loadings: loading.effects['carInfo/getCarInfo'],
    subLoadings: loading.effects['carInfo/stop'],
}))
@Form.create()
class CarInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            carId: '',

        }
        this.okHandle = this.okHandle.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        const { dispatch, location } = this.props;
        const id = location.query.id;
        dispatch({
            type: 'carInfo/getCarInfo',
            payload: {
                pkMembermgcust: id,
                page: "1",
                pageSize: "20",
                sortType: "auto",
            }
        });
    }

    setDefaultCar(key, isStop, isDefault, id) {
        const { dispatch } = this.props;
        if (!isDefault && !isStop) {
            dispatch({
                type: 'carInfo/setDefault',
                payload: {
                    pkMembermgcar: id,
                },
                callback: () => {
                    this.getData();
                }
            });
        }
    }

    handleModalVisible = flag => {
        this.setState({
            modalVisible: !!flag,
        });
    };

    handleTableChange = (pagination, filters, sorter) => {
        const { dispatch, location } = this.props;
        const id = location.query.id;
        dispatch({
            type: 'carInfo/getCarInfo',
            payload: {
                pkMembermgcar: id,
                page: pagination.current,
                pageSize: pagination.pageSize,
                sortType: "auto",
            },
        });
    };

    Edit = (carId) => {
        const id = this.props.location.query.id;
        router.push({
            pathname: '/member/memberProfile/addMember/carInfo/addCarInfo',
            query: { carId, id }
        })
    }

    SwitchStatus(key, status, id) {
        const { dispatch } = this.props;
        if (status !== 1) {
            dispatch({
                type: 'carInfo/start',
                payload: {
                    pkMembermgcar: id,
                },
                callback: () => {
                    this.getData();
                }
            });
        } else {
            this.handleModalVisible(true);
            this.setState({
                carId: id,
            })
        }
    };

    okHandle(e) {
        e.preventDefault();
        const { form, dispatch } = this.props;
        const { carId } = this.state;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
            dispatch({
                type: 'carInfo/stop',
                payload: {
                    pkMembermgcar: carId,
                    stopReason: fieldsValue.stopReason,
                },
                callback: () => {
                    this.handleModalVisible();
                    this.setState({
                        carId: '',
                    })
                    this.getData();
                }
            });
        });
    }

    render() {
        const { modalVisible } = this.state;
        const {
            loadings,
            subLoadings,
            carInfo: { carInfoList },
            form: { getFieldDecorator },
        } = this.props;
        if (Object.keys(carInfoList).length === 0) {
            return null;
        }
        const data = carInfoList.page;
        const { content, totalElements, size, } = data;

        const resData = AddKey(content, 'pkMembermgcust');
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            total: totalElements,
            pageSize: size,
            defaultCurrent: 1,
        };

        const columns = [
            {
                title: '车架号',
                dataIndex: 'carframeno',
                key: 'carframeno',
                render: (text, record) => {
                    const carId = record.pkMembermgcar
                    const id = this.props.location.query.id;
                    return (
                        <Link to={{ 
                            pathname: '/member/memberProfile/addMember/carInfo/addCarInfo', 
                            query: { 
                                carId, 
                                id,
                                view:'true', } 
                            }}
                        > 
                            {text}
                        </Link>
                    );
                },
            },
            {
                title: '品牌',
                dataIndex: 'brandname',
                key: 'brandname',
            },
            {
                title: '车系',
                dataIndex: 'carseriesname',
                key: 'carseriesname',
            },
            {
                title: '车型',
                dataIndex: 'cartypename',
                key: 'cartypename',
            },
            {
                title: '车牌号',
                dataIndex: 'licenseplate',
                key: 'licenseplate',
            },
            {
                title: '所属4S店',
                dataIndex: 'belongfourname',
                key: 'belongfourname',
            },
            {
                title: '状态',
                dataIndex: 'vstatus',
                key: 'vstatus',
                render: text => {
                    // eslint-disable-next-line no-nested-ternary
                    return text === 0 ? <Badge status="default" text='未开通' /> : text === 1 ? <Badge status="success" text="已开通" /> : <Badge status="error" text="已停用" />;
                },
            },
            {
                title: '默认车辆',
                dataIndex: 'defaultcar',
                key: 'defaultcar',
                render: (text, record) => {
                    const isDefault = record.membercust.defaultCarId === record.pkMembermgcar;
                    const isStop = record.vstatus !== 1
                    return (
                        <Fragment>
                            <Tooltip title='是否设置为默认车辆'>
                                <Button
                                    icon='heart'
                                    shape="circle"
                                    onClick={({ key }) => this.setDefaultCar(key, isStop, isDefault, record.pkMembermgcar)}
                                    type={isDefault ? 'primary' : 'default'}
                                    style={{ marginRight: '8px' }}
                                />
                            </Tooltip>
                        </Fragment>
                    );
                },
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                width: '130px',
                render: (text, record) => {
                    const canstop = record.vstatus !== 1;
                    return (
                        <Fragment>
                            <Tooltip title={canstop ? '启用' : '停用'}>
                                <Button
                                    icon={canstop ? 'play-circle' : 'pause-circle'}
                                    onClick={({ key }) => this.SwitchStatus(key, record.vstatus, record.pkMembermgcar)}
                                    type="primary"
                                    style={{ marginRight: '8px' }}
                                />
                            </Tooltip>
                            <Tooltip title="编辑">
                                <Button
                                    icon="edit"
                                    onClick={() => this.Edit(record.pkMembermgcar)}
                                    type="primary"
                                    style={{ marginRight: '8px' }}
                                />
                            </Tooltip>
                        </Fragment>
                    );
                },
            },
        ];

        if (Object.keys(data).length === 0) {
            return (
                <div className="ant-card-body">
                    <div className={styles.noData}>
                        <Icon type="frown-o" />
                        暂无数据
                    </div>
                </div>
            );
        }

        return (
            <Fragment>
                <div className="ant-card-body">
                    <Table
                        loading={loadings}
                        dataSource={resData}
                        pagination={paginationProps}
                        columns={columns}
                        onChange={this.handleTableChange}
                    />
                    <Modal
                        title="停用原因"
                        className={styles.standardListForm}
                        bodyStyle={{ padding: '28px 20px 0' }}
                        destroyOnClose
                        visible={modalVisible}
                        onOk={this.okHandle}
                        onCancel={() => this.handleModalVisible()}
                        confirmLoading={subLoadings}
                    >

                        <FormItem
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 15 }}
                            label="原因"
                        >
                            {getFieldDecorator('stopReason', {
                                rules: [{ required: true, message: '请选择原因!' }],
                            })(
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="请选择原因!"
                                    onChange={this.handleSelectChange}
                                >
                                    <Option value="APP中删除车辆">APP中删除车辆</Option>
                                    <Option value="微信中中删除车辆">微信中中删除车辆</Option>
                                    <Option value="后台停用车辆">后台停用车辆</Option>
                                    <Option value="车辆过户">车辆过户</Option>
                                </Select>
                            )}
                        </FormItem>


                    </Modal>
                </div>
            </Fragment>
        )
    }
}
export default CarInfo;