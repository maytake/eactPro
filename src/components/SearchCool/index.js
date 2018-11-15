import React, { Fragment, PureComponent } from 'react';
import { Input, Icon } from 'antd';
class SearchCool extends PureComponent {
    render() {
        const { value, inputDisabled, buttonDisabled, onChange, placeholder, enterHandle } = this.props;
        const enter = () => {
            enterHandle(value);
        };

        return (
            <Fragment>
                <div className="ant-input-search ant-input-search-enter-button ant-input-affix-wrapper">
                    <Input
                        disabled={inputDisabled}
                        value={value}
                        placeholder={placeholder}
                        onChange={e => {
                            onChange(e.target.value);
                        }}
                    />
                    <span className="ant-input-suffix">
                        <button
                            disabled={buttonDisabled}
                            type="button"
                            className="ant-btn ant-input-search-button ant-btn-primary"
                            onClick={enter}
                        >
                            <Icon type="search" />
                        </button>
                    </span>
                </div>

            </Fragment>
        );
    }
}

export default SearchCool;
