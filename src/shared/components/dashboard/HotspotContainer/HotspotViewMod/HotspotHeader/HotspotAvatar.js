import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'rmwc/Icon';
import ImageCDN from '../../../../lib/ImageCDN';

class HotspotAvatar extends React.Component {
    constructor() {
        super();
        this.state = {
            mouseEntered: false,
        };
        this.displayImageOverlay = this.displayImageOverlay.bind(this);
    }

    displayImageOverlay(boolean) {
        this.setState({
            mouseEntered: boolean,
        });
    }

    render() {
        return this.props.editionMode ? (
            <div
                onClick={this.props.onPick}
                role="button"
                onKeyUp={this.props.onPick}
                tabIndex={-1}
                className="HotspotAvatar"
                onMouseEnter={() => {
                    this.displayImageOverlay(true);
                }}
                onMouseLeave={() => {
                    this.displayImageOverlay(false);
                }}>
                <ImageCDN
                    filename={this.props.url}
                    alt="Icône du centre d'intêret"
                    style={{ cursor: 'pointer' }}
                    className={this.state.mouseEntered ? 'HotspotAvatar-hovered' : ''}
                />
                {this.state.mouseEntered ? (
                    <Icon strategy="ligature" theme="text-primary-on-background" use="build" />
                ) : null}
            </div>
        ) : (
            <div className="HotspotAvatar">
                <ImageCDN filename={this.props.url} alt="Icône du centre d'intêret" />
            </div>
        );
    }
}

HotspotAvatar.propTypes = {
    onPick: PropTypes.func,
    editionMode: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
};

HotspotAvatar.defaultProps = {
    onPick: () => {},
};

export default HotspotAvatar;
