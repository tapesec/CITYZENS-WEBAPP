import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'rmwc/Icon';
import { Typography } from 'rmwc/Typography';
import actions from '../../../../../../client/actions';
import { getCityzenId, isAuthenticated } from '../../../../../reducers/authenticatedCityzen';
import ActionsToolbar from '../../Toolbar/ActionsToolbar';
import withViewCounter from '../../../../hoc/hotspots/withViewCounter';
import Footer from '../../Footer/Footer';
import DateFormater from '../../../../lib/DateFormater';

import '../HotspotContent.scss';
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

const AlertHotspot = props => (
    <Fragment>
        <ActionsToolbar />
        <section className="HotspotContent AlertHotspot">
            <Typography tag="div" className="iconContainer" theme="text-icon-on-primary">
                <Icon strategy="component">warning</Icon>
            </Typography>

            <article className="HotspotMessage">
                <Typography
                    tag="p"
                    use="subheading2"
                    className="question-label"
                    theme="text-primary-on-light">
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
        views: PropTypes.number.isRequired,
    }).isRequired,
    cityzenIsAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    cityzenId: getCityzenId(state),
    cityzenIsAuthenticated: isAuthenticated(state),
});

const mapDispatchToProps = dispatch => ({
    alertStillExist: (hotspotId, boolean) => {
        dispatch(actions.alertStillExist(hotspotId, boolean));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(withViewCounter(AlertHotspot));
