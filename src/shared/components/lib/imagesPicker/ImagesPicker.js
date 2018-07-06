import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'rmwc/Typography';
import Icon from 'rmwc/Icon';
import ReactFilestack from 'filestack-react';
import Tile from './Tile';
import config from '../../../config';

const fileStackOptions = {
    fromSources: ['local_file_system', 'url', 'webcam'],
    accept: ['image/*'],
    // maxSize: 3000000,
    maxFiles: 1,
    minFiles: 1,
    lang: 'fr',
    transformations: {
        // circle: true,
        rotate: true,
        /* crop: {
            force: true,
            aspectRatio: 1 / 1,
        }, */
    },
};

export default class ImagesPicker extends React.Component {
    constructor(props) {
        super(props);
        this.onIconSelectedConnector = this.onIconSelectedConnector.bind(this);
    }

    onIconSelectedConnector(handle, i) {
        return () => {
            const currentIcon = this[`icon-${handle}${i}`];
            currentIcon.toggleSelected();
            if (this.previousIcon) this.previousIcon.unselect();
            this.previousIcon = currentIcon;
            this.props.onIconSelected({ target: { value: handle } });
        };
    }

    render() {
        return (
            <section className="ImagesPicker">
                <Typography
                    className="images-picker-title"
                    tag="span"
                    use="body2"
                    theme="text-on-primary-background">
                    Choisissez un icône ou importez une image
                </Typography>
                <div className="images-picker-container">
                    <div className="list-icons">
                        <ReactFilestack
                            apikey={config.fileStack.apiKey}
                            security={config.fileStack.security}
                            options={fileStackOptions}
                            onSuccess={result => {
                                const image = result.filesUploaded[0];
                                const { handle } = image;
                                if (this.previousIcon) this.previousIcon.unselect();
                                this.props.onIconUploaded({ target: { value: handle } });
                            }}
                            onError={() => {}}
                            render={({ onPick }) => (
                                <div
                                    key={Math.random()}
                                    role="button"
                                    className="icon-tile"
                                    tabIndex={0}
                                    onKeyDown={onPick}
                                    onClick={onPick}>
                                    <div
                                        className="icon-import"
                                        style={{
                                            height: '53px',
                                            cursor: 'pointer',
                                        }}>
                                        <div className="icon-symbol">
                                            <Icon style={{ color: 'white' }} strategy="ligature">
                                                cloud_upload
                                            </Icon>
                                        </div>
                                    </div>
                                    <Typography
                                        tag="span"
                                        use="caption"
                                        className="tile-label"
                                        theme="text-on-primary-background">
                                        Importer
                                    </Typography>
                                </div>
                            )}
                        />
                        {this.props.listIcons.map((icon, i) => (
                            <Tile
                                ref={node => {
                                    this[`icon-${icon.handle}${i}`] = node;
                                }}
                                index={i}
                                icon={icon}
                                onIconSelectedConnector={this.onIconSelectedConnector}
                            />
                        ))}
                    </div>
                </div>
            </section>
        );
    }
}

ImagesPicker.propTypes = {
    listIcons: PropTypes.arrayOf(PropTypes.object).isRequired,
    onIconSelected: PropTypes.func.isRequired,
    onIconUploaded: PropTypes.func.isRequired,
};
