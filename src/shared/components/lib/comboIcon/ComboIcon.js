import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import './ComboIcon.scss';

class ComboIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.onClickHandler = this.onClickHandler.bind(this);
        // this.onSelectItem = this.onSelectItem.bind(this);
    }
    static onSelectItem(item) {
        return () => item.action();
    }

    onClickHandler() {
        this.setState({
            open: !this.state.open,
        });
    }

    handleClickOutside() {
        this.setState({
            open: false,
        });
    }

    render() {
        const ActionComponent = this.props.actionComponent;
        return (
            <div className={`ComboIcon ${this.props.className}`}>
                <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={this.onClickHandler}
                    onClick={this.onClickHandler}>
                    {ActionComponent()}
                </div>
                {this.state.open ? (
                    <Fragment>
                        <div className="dropdown-caret">
                            <div className="caret-outer" />
                            <div className="caret-inner" />
                        </div>
                        <div className="content">{this.props.content}</div>
                    </Fragment>
                ) : null}
            </div>
        );
    }
}

ComboIcon.propTypes = {
    className: PropTypes.string.isRequired,
    content: PropTypes.func.isRequired,
    actionComponent: PropTypes.func.isRequired,
};

export default onClickOutside(ComboIcon);
