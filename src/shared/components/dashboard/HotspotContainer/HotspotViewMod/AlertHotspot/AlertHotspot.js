import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'rmwc/Icon';
import { Typography } from 'rmwc/Typography';
import { Elevation } from 'rmwc/Elevation';
import ReactFilestack from 'filestack-react';
import CustomScroll from 'react-custom-scroll';
import helpers from './../../../../../helpers';
import config from '../../../../../config';
import actions from '../../../../../../client/actions';
import { getCityzenId, isAuthenticated } from '../../../../../reducers/authenticatedCityzen';
import HotspotTitle from './../HotspotHeader/HotspotTitle';
import ActionsToolbar from '../../Toolbar/ActionsToolbar';
import withViewCounter from '../../../../hoc/hotspots/withViewCounter';
import AlertImage from './AlertImage';
import Footer from '../../Footer/Footer';
import DateFormater from '../../../../lib/DateFormater';

import './AlertHotspot.scss';

const DisplayQuestionOrSayThanks = props =>
    props.hotspot.voterList.some(vote => vote[0] === props.cityzenId) ? ( // [[cityzenId, pertinence], …]
        <Typography
            tag="p"
            use="subheading2"
            className="question-disabled"
            theme="text-primary-background">
            Vous avez déjà répondu, merci.
        </Typography>
    ) : (
        <Typography tag="div" className="thumb-container" theme="text-icon-on-primary">
            <div>
                <Icon
                    strategy="component"
                    onClick={() => {
                        props.alertStillExist(props.hotspot.id, true);
                    }}>
                    thumb_up
                </Icon>
            </div>
            <div>
                <Icon
                    strategy="component"
                    onClick={() => {
                        props.alertStillExist(props.hotspot.id, false);
                    }}>
                    thumb_down
                </Icon>
            </div>
        </Typography>
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
        crop: { force: true },
    },
};

const DiplayImageDescriptionOrImport = (
    HotspotId,
    imageLocation,
    cityzenIsAuthenticated,
    saveUploadedImage,
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
                onError={err => {
                    console.log(err); // eslint-disable-line no-console
                }}
                render={({ onPick }) => (
                    <div
                        onClick={onPick}
                        role="button"
                        tabIndex={-1}
                        onKeyUp={onPick}
                        className="alert-dropzone">
                        <Typography tag="span" use="headline">
                            Cliquez ici pour déposer vos images ou prendre une photo
                        </Typography>
                    </div>
                )}
            />
        );
    }
    return (
        <div className="loged-out-alert-dropzone">
            <Typography tag="span" use="headline">
                <a href="/login">Connectez vous</a> pour déposez une image ou prendre une photo
            </Typography>
        </div>
    );
};

DiplayImageDescriptionOrImport.propTypes = {};

const AlertHotspot = props => (
    <Fragment>
        <ActionsToolbar />

        <section className="HotspotContent AlertHotspot">
            <CustomScroll heightRelativeToParent="100%">
                <header>
                    <HotspotTitle
                        title={helpers.generateTitleForMarker(props.hotspot)}
                        avatarUrl={helpers.generateAvatarForAlertHotspot(props.hotspot)}
                        address={props.hotspot.address}
                    />
                </header>
                {DiplayImageDescriptionOrImport(
                    props.hotspot.id,
                    props.hotspot.imageDescriptionLocation,
                    props.cityzenIsAuthenticated,
                    props.saveUploadedImage,
                )}
                <Elevation z="4" style={{ margin: '1px' }}>
                    <article className="HotspotMessage">
                        <Typography
                            tag="p"
                            use="subheading2"
                            className="question-label"
                            theme="text-primary-on-background">
                            {props.hotspot.message.content}
                        </Typography>
                        <Typography tag="p" use="subheading1" theme="text-primary-on-light">
                            <DateFormater
                                labelPrefix="Dernière mise à jour "
                                duration
                                date={props.hotspot.message.updatedAt}
                            />
                        </Typography>
                    </article>
                </Elevation>
                <div className="pertinence-section">
                    <Typography tag="p" use="headline" className="question-label" theme="secondary">
                        Il y a t&apos;il toujours quelque chose ?
                    </Typography>
                    {props.cityzenIsAuthenticated ? (
                        DisplayQuestionOrSayThanks(props)
                    ) : (
                        <Typography
                            tag="p"
                            use="subheading2"
                            className="question-disabled"
                            theme="text-primary-background">
                            <a href="/login">Connectez vous</a> pour nous le dire
                        </Typography>
                    )}
                </div>
            </CustomScroll>
        </section>
        <Footer views={props.hotspot.views} />
    </Fragment>
);

AlertHotspot.propTypes = {
    hotspot: PropTypes.shape({
        message: PropTypes.shape({
            updatedAt: PropTypes.string,
            content: PropTypes.string.isRequired,
        }),
        address: PropTypes.shape({}),
        views: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        author: PropTypes.shape({
            id: PropTypes.string,
        }),
        imageDescriptionLocation: PropTypes.string,
    }).isRequired,
    cityzenIsAuthenticated: PropTypes.bool.isRequired,
    saveUploadedImage: PropTypes.func.isRequired,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(withViewCounter(AlertHotspot));
