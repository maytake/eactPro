/* eslint-disable no-nested-ternary */
import React, { PureComponent, Fragment } from 'react';
import { Divider,Icon } from 'antd';
import isEqual from 'lodash/isEqual';
import DescriptionList from '@/components/DescriptionList';
import { connect } from 'dva';
import styles from './AddMember.less';
const { Description } = DescriptionList;



@connect(({ joinMember, loading }) => ({
    joinMember,
    loading: loading.effects['joinMember/becomeMember'],
}))
class JoinMember extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            memberInfo: props.joinMember.memberInfo
        }
    }

    static getDerivedStateFromProps(nextProps, preState) {
        // console.log(nextProps.joinMember.memberInfo);
        // console.log(preState.memberInfo);
        if (isEqual(nextProps.joinMember.memberInfo, preState.memberInfo)) {
           // console.log(111);
            return null;
        }
        return {
            memberInfo: nextProps.joinMember,
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const id = this.props.location.query.id;
        if(id){
            dispatch({
                type: 'joinMember/becomeMember',
                payload: {
                    pkMembermgcust: id
                }
            });
        }else{
            dispatch({
                type: 'joinMember/memberInfoResult',
            });
        }
    }

    render() {

        const {
            joinMember: { memberInfo },
        } = this.props;

        if (Object.keys(memberInfo).length === 0) { 
            return (
                <div className="ant-card-body">
                    <div className={styles.noData}>
                        <Icon type="frown-o" />
                        暂无数据
                    </div>
                </div>
            );
        }
        const current = memberInfo || {};
        return (
            <Fragment>
                <div className="ant-card-body">
                    <DescriptionList size="large" title="入会信息" style={{ marginBottom: 32 }}>
                        <Description term="入会渠道">{current.summary.channelStr||'暂无'}</Description>
                        <Description term="入会推荐人">{current.summary.detailedStr||'暂无'}</Description>
                        <Description term="入会4S店">{current.summary.referrer||'暂无'}</Description>
                        <Description term="入会明细">{current.summary.foursName||'暂无'}</Description>
                        <Description term="App推荐人">{current.summary.appReferrer||'暂无'}</Description>
                        <Description term="客户数据来源渠道">{current.summary.currentSourceChannelStr||'暂无'}</Description>
                        <Description term="数据来源">{current.summary.source === 0 ? '新数据' : '历史数据'}</Description>
                        <Description term="首次绑车4s店">{current.summary.bindingName||'暂无'}</Description>
                    </DescriptionList>
                    <Divider style={{ marginBottom: 32 }} />
                    <DescriptionList size="large" title="关注信息" style={{ marginBottom: 32 }}>
                        <Description term="关注状态">{current.follow.state === 0 ? '关注' : current.follow.state === 1 ? '取消关注' : '未关注'}</Description>
                        <Description term="首次关注时间">{current.follow.firstFollowTime||'暂无'}</Description>
                        <Description term="关注渠道">{current.follow.type === 0 ? '个人二维码' : current.follow.type === 1 ? '门店' : current.follow.type === 2 ? '活动' : '自行关注'}</Description>
                        <Description term="关注推荐人">{current.follow.name||'暂无'}</Description>
                        <Description term="关注推荐4S店">{current.follow.foursName||'暂无'}</Description>
                    </DescriptionList>
                    <Divider style={{ marginBottom: 32 }} />
                    <DescriptionList size="large" title="APP下载信息" style={{ marginBottom: 32 }}>
                        <Description term="APP下载">{current.subEntity.isDownloadDescri === 0 ? '未下载' : '已下载'}</Description>
                        <Description term="APP最近使用">{current.subEntity.appReferrer||'暂无'}</Description>
                        <Description term="APP最近使用">{current.subEntity.firstLoginTime||'暂无'}</Description>
                        <Description term="APP最近使用">{current.subEntity.lastLoginTime||'暂无'}</Description>
                        <Description term="手机机型">{current.subEntity.machineType||'暂无'}</Description>
                    </DescriptionList>
                </div>
            </Fragment>
        )
    }
}
export default JoinMember;