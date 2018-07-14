import React from 'react';
import PropTypes from 'prop-types';
import ImageCDN from '../../../lib/ImageCDN';

import './PawnMarker.scss';

class PawnMarker extends React.Component {
    componentDidMount() {}

    render() {
        const { title, filename, type, iconType, clickAction, id } = this.props;
        return (
            <div
                role="button"
                tabIndex={-1}
                className="PawnMarker"
                data-type="pawnMarker"
                data-icon-type={iconType}
                style={this.props.style}
                data-hotspot-type={type}>
                <ImageCDN
                    process
                    processParam="output=format:png/resize=w:60,fit:clip/compress"
                    id={id}
                    style={{ width: '40px' }}
                    filename={filename.split('/')[3]}
                    dataType="pawnMarker"
                    data-icon-type={iconType}
                    data-hotspot-type={type}
                    alt={title}
                    onClick={clickAction}
                />
            </div>
        );
    }
}

PawnMarker.propTypes = {
    title: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    iconType: PropTypes.string,
    clickAction: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
};

PawnMarker.defaultProps = {
    iconType: '',
};

export default PawnMarker;
