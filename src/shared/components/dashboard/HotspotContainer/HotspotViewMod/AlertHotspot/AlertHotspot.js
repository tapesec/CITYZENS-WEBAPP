import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'rmwc/Icon';
import { Typography } from 'rmwc/Typography';
import ReactFilestack from 'filestack-react';
import HotspotHeader from '../common/hotspotHeader/HotspotHeader';
import config from '../../../../../config';
import actions from '../../../../../../client/actions';
import { getCityzenId, isAuthenticated } from '../../../../../reducers/authenticatedCityzen';
import ActionsToolbar from '../../Toolbar/ActionsToolbar';
import withViewCounter from '../../../../hoc/hotspots/withViewCounter';
import AlertImage from './AlertImage';
import DateFormater from '../../../../lib/DateFormater';
import { SNACKBAR } from './../../../../../../client/wording';
import { NOTIFICATION_MESSAGE } from './../../../../../../client/constants';
import constants from '../../../../../constants';

import './AlertHotspot.scss';

const DisplayQuestionOrSayThanks = props =>
    props.hotspot.voterList.some(vote => vote[0] === props.cityzenId) ? ( // [[cityzenId, pertinence], …]
        <Typography
            style={{ marginLeft: '10px' }}
            tag="span"
            use="body2"
            theme="text-secondary-on-background">
            Vous avez déjà répondu, merci.
        </Typography>
    ) : (
        <Fragment>
            <Icon
                strategy="component"
                onClick={() => {
                    props.alertStillExist(props.hotspot.id, true);
                }}>
                thumb_up
            </Icon>

            <Icon
                strategy="component"
                onClick={() => {
                    props.alertStillExist(props.hotspot.id, false);
                }}>
                thumb_down
            </Icon>
        </Fragment>
    );

DisplayQuestionOrSayThanks.propTypes = {
    hotspot: PropTypes.shape({
        id: PropTypes.string.isRequired,
        voterList: PropTypes.arrayOf().isRequired,
    }).isRequired,
    cityzenId: PropTypes.string.isRequired,
    alertStillExist: PropTypes.func.isRequired,
};

const fileStackOptions = {
    fromSources: ['local_file_system', 'url', 'webcam'],
    accept: ['image/*'],
    maxSize: 100000,
    maxFiles: 1,
    minFiles: 1,
    lang: 'fr',
    transformations: {
        rotate: true,
        crop: {
            force: true,
            aspectRatio: 2.39 / 1,
        },
    },
};

const DiplayImageDescriptionOrImport = (
    HotspotId,
    imageLocation,
    cityzenIsAuthenticated,
    saveUploadedImage,
    displayMessageToScreen,
) => {
    if (imageLocation) return <AlertImage imageLocation={imageLocation} />;
    else if (cityzenIsAuthenticated) {
        return (
            <ReactFilestack
                apikey={config.fileStack.apiKey}
                security={config.fileStack.security}
                options={fileStackOptions}
                onSuccess={result => {
                    const image = result.filesUploaded[0];
                    const { url } = image;
                    saveUploadedImage(HotspotId, url);
                }}
                onError={() => {
                    displayMessageToScreen(); // eslint-disable-line no-console
                }}
                render={({ onPick }) => (
                    <div
                        onClick={onPick}
                        role="button"
                        tabIndex={-1}
                        onKeyUp={onPick}
                        className="alert-dropzone">
                        <Typography tag="span" use="subtitle1">
                            Cliquez ici pour déposer vos images ou prendre une photo
                        </Typography>
                    </div>
                )}
            />
        );
    }
    return (
        <div className="loged-out-alert-dropzone">
            <Typography tag="span" use="subtitle1">
                <a href="/login">Connectez vous</a> pour déposez une image ou prendre une photo
            </Typography>
        </div>
    );
};

const AlertHotspot = props => (
    <Fragment>
        <ActionsToolbar closeAction={props.closeAction} />
        <section className="HotspotContent AlertHotspot">
            <section style={{ marginRight: '12px' }}>
                <HotspotHeader
                    address={props.hotspot.address.name}
                    views={props.hotspot.views}
                    hotspotIcon={constants.HOTSPOT.ALERT.AVATAR_ICON.DEFAULT}
                />
                {DiplayImageDescriptionOrImport(
                    props.hotspot.id,
                    props.hotspot.pictureDescription,
                    props.cityzenIsAuthenticated,
                    props.saveUploadedImage,
                    props.displayMessageToScreen,
                )}

                <article className="HotspotMessage">
                    <Typography
                        style={{ fontWeight: 'bold' }}
                        tag="strong"
                        use="body2"
                        theme="text-primary-on-background">
                        {props.hotspot.author.pseudo}
                    </Typography>
                    <Typography
                        tag="span"
                        style={{ color: 'gray' }}
                        use="body2"
                        theme="text-secondary-on-background">
                        <DateFormater
                            labelPrefix=" "
                            duration
                            date={props.hotspot.message.updatedAt}
                        />
                    </Typography>
                    <Typography tag="p" use="body2" theme="text-primary-on-background">
                        {props.hotspot.message.content}
                    </Typography>
                    <Typography tag="em" use="body2" theme="text-secondary-on-background">
                        <DateFormater
                            labelPrefix="Dernière mise à jour "
                            duration
                            date={props.hotspot.message.updatedAt}
                        />
                    </Typography>
                </article>

                <Typography tag="p" use="body2" className="pertinence-question" theme="secondary">
                    <Icon strategy="ligature">question_answer</Icon>
                    Il y a t&apos;il toujours quelque chose ?
                    {props.cityzenIsAuthenticated ? (
                        DisplayQuestionOrSayThanks(props)
                    ) : (
                        <Typography
                            style={{ marginLeft: '10px' }}
                            tag="span"
                            use="body2"
                            theme="text-primary-background">
                            <a href="/login">Connectez vous</a> pour nous le dire
                        </Typography>
                    )}
                </Typography>
            </section>
        </section>
    </Fragment>
);

AlertHotspot.propTypes = {
    hotspot: PropTypes.shape({
        type: PropTypes.string,
        message: PropTypes.shape({
            updatedAt: PropTypes.string,
            content: PropTypes.string.isRequired,
        }),
        address: PropTypes.shape({
            name: PropTypes.string,
        }),
        views: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        author: PropTypes.shape({
            id: PropTypes.string,
            pseudo: PropTypes.string,
        }),
        pictureDescription: PropTypes.string,
    }).isRequired,
    cityzenIsAuthenticated: PropTypes.bool.isRequired,
    saveUploadedImage: PropTypes.func.isRequired,
    displayMessageToScreen: PropTypes.func.isRequired,
    closeAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    cityzenId: getCityzenId(state),
    cityzenIsAuthenticated: isAuthenticated(state),
});

const mapDispatchToProps = dispatch => ({
    alertStillExist: (hotspotId, boolean) => {
        dispatch(actions.alertStillExist(hotspotId, boolean));
    },
    saveUploadedImage: (hotspotId, imgUrl) => {
        dispatch(actions.alertHotspotImageUploaded(hotspotId, imgUrl));
    },
    displayMessageToScreen: () => {
        dispatch(
            actions.displayMessageToScreen(
                SNACKBAR.ERROR.UPDATING_HOTSPOT_FAILED,
                NOTIFICATION_MESSAGE.LEVEL.ERROR,
            ),
        );
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withViewCounter(AlertHotspot));
