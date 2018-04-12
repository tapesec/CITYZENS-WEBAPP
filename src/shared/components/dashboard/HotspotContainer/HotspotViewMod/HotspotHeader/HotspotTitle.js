import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactFilestack from 'filestack-react';
import actions from '../../../../../../client/actions';
import config from '../../../../../config';
import HotspotAvatar from './HotspotAvatar';
import './HotspotTitle.scss';

const fileStackOptions = {
    fromSources: ['local_file_system', 'url', 'webcam'],
    accept: ['image/*', '.pdf'],
    maxSize: 100000,
    maxFiles: 1,
    minFiles: 1,
    lang: 'fr',
    transformations: {
        crop: { force: true },
        circle: true,
    },
};

const HotspotTitle = ({
    title,
    address,
    hotspotId,
    persistHotspotAvatarIcon,
    isAuthor,
    avatarUrl,
    noAvatar,
}) => {
    const displayAvatar = () => {
        if (!noAvatar) {
            return isAuthor ? (
                <ReactFilestack
                    apikey={config.fileStack.apiKey}
                    options={fileStackOptions}
                    onSuccess={result => {
                        const newAvatarIcon = result.filesUploaded[0];
                        const { url } = newAvatarIcon;
                        persistHotspotAvatarIcon(hotspotId, url);
                    }}
                    onError={() => {}}
                    render={({ onPick }) => (
                        <HotspotAvatar onPick={onPick} editionMode url={avatarUrl} />
                    )}
                />
            ) : (
                <HotspotAvatar editionMode={false} url={avatarUrl} />
            );
        }
        return null;
    };

    return (
        <div className="HotspotHeader">
            {displayAvatar()}
            <div className="HotspotTitle">
                <h1>{title}</h1>
                <p>
                    {address.name}, {address.city}
                </p>
            </div>
        </div>
    );
};

HotspotTitle.propTypes = {
    hotspotId: PropTypes.string,
    title: PropTypes.string.isRequired,
    address: PropTypes.shape({
        name: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
    }).isRequired,
    persistHotspotAvatarIcon: PropTypes.func,
    isAuthor: PropTypes.bool,
    avatarUrl: PropTypes.string,
    noAvatar: PropTypes.bool,
};

HotspotTitle.defaultProps = {
    noAvatar: false,
    avatarUrl: '',
    hotspotId: undefined,
    persistHotspotAvatarIcon: () => {},
    isAuthor: false,
};

const mapDispatchToProps = dispatch => ({
    persistHotspotAvatarIcon: (hotspotId, iconUrl) => {
        dispatch(actions.hotspotAvatarUploaded(hotspotId, iconUrl));
    },
});

export default connect(() => ({}), mapDispatchToProps)(HotspotTitle);
