import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ActionsToolbar from './../Toolbar/ActionsToolbar';
import { Icon } from 'rmwc/Icon';
import { Typography } from 'rmwc/Typography';
import DateFormater from './../../../lib/DateFormater';
import './HotspotContent.scss';
import './AlertHotspot.scss';

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
            <Typography tag="div" className="thumb-container" theme="text-icon-on-primary">
                <div>
                    <Icon strategy="component">thumb_up</Icon>
                </div>
                <div>
                    <Icon strategy="component">thumb_down</Icon>
                </div>
            </Typography>
        </section>
    </Fragment>
);

AlertHotspot.propTypes = {
    hotspot: PropTypes.shape({
        message: PropTypes.shape({
            updatedAt: PropTypes.string,
            content: PropTypes.string.isRequired,
        }),
    }).isRequired,
};

export default AlertHotspot;
