import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from 'rmwc/Typography';
import Icon from 'rmwc/Icon';
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
        return (
            <div className={`ComboIcon ${this.props.className}`}>
                <Icon onClick={this.onClickHandler} strategy="ligature">
                    keyboard_arrow_down
                </Icon>
                {this.state.open ? (
                    <Fragment>
                        <div className="dropdown-caret">
                            <div className="caret-outer" />
                            <div className="caret-inner" />
                        </div>
                        <div className="combo-box">
                            {this.props.items.map(item => (
                                <Typography
                                    tag="div"
                                    use="body2"
                                    className="combo-item"
                                    key={item.label}
                                    role="button"
                                    onClick={ComboIcon.onSelectItem(item)}>
                                    {item.label}
                                </Typography>
                            ))}
                        </div>
                    </Fragment>
                ) : null}
            </div>
        );
    }
}

ComboIcon.propTypes = {
    className: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default onClickOutside(ComboIcon);
