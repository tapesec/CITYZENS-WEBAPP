import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'rmwc/Icon';
import { Typography } from 'rmwc/Typography';
import ReactFilestack from 'filestack-react';
import config from '../../config';
import ImageCDN from '../lib/ImageCDN';

const fileStackOptions = {
    fromSources: ['local_file_system', 'url', 'webcam'],
    accept: ['image/*'],
    // maxSize: 300000,
    maxFiles: 1,
    minFiles: 1,
    lang: 'fr',
    transformations: {
        rotate: true,
        crop: {
            force: true,
            aspectRatio: 1 / 1,
        },
    },
};

class AvatarUploader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <ReactFilestack
                apikey={config.fileStack.apiKey}
                security={config.fileStack.security}
                options={fileStackOptions}
                onSuccess={result => {
                    const image = result.filesUploaded[0];
                    const { handle } = image;
                    this.props.onAvatarUploaded(handle);
                    this.setState({
                        uploadedHandle: handle,
                    });
                }}
                onError={() => {
                    this.props.displayMessageToScreen();
                }}
                render={({ onPick }) => (
                    <div
                        onClick={onPick}
                        role="button"
                        tabIndex={-1}
                        onKeyUp={onPick}
                        className="avatar-import-area">
                        {this.state.uploadedHandle ? (
                            <ImageCDN
                                filename={this.state.uploadedHandle}
                                process
                                processParam="output=format:png/resize=w:120,fit:clip/compress/circle"
                            />
                        ) : (
                            <Typography use="headline2" tag="span" theme="onSecondary">
                                <Icon strategy="ligature">camera_alt</Icon>
                            </Typography>
                        )}
                    </div>
                )}
            />
        );
    }
}

AvatarUploader.propTypes = {
    onAvatarUploaded: PropTypes.func.isRequired,
    displayMessageToScreen: PropTypes.func.isRequired,
};

export default AvatarUploader;
