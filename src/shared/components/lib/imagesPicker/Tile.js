import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'rmwc/Typography';
import ImageCDN from '../../lib/ImageCDN';

export default class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
        };
        this.toggleSelected = this.toggleSelected.bind(this);
    }

    unselect() {
        this.setState({ selected: false });
    }

    toggleSelected() {
        this.setState({ selected: !this.state.selected });
    }

    render() {
        const { icon, index } = this.props;
        return (
            <div
                key={Math.random()}
                role="button"
                tabIndex={0}
                onKeyPress={this.props.onIconSelectedConnector(icon.handle)}
                className={`icon-tile ${this.state.selected ? 'selected' : ''}`}
                onClick={this.props.onIconSelectedConnector(icon.handle, index)}>
                <ImageCDN
                    style={{ width: '50px' }}
                    process
                    processParam="output=format:png/resize=w:100,fit:clip/compress"
                    filename={icon.handle}
                    title={icon.title}
                    key={icon.handle}
                    alt={icon.title}
                />
                <Typography
                    className="tile-label"
                    tag="span"
                    use="caption"
                    theme="text-on-primary-background">
                    {icon.title}
                </Typography>
            </div>
        );
    }
}

Tile.propTypes = {
    icon: PropTypes.shape({
        handle: PropTypes.string,
        title: PropTypes.string,
    }).isRequired,
    index: PropTypes.number.isRequired,
    onIconSelectedConnector: PropTypes.func.isRequired,
};
