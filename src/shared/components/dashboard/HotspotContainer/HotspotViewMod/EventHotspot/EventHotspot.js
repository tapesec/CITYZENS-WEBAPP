import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CustomScroll from 'react-custom-scroll';
import ActionsToolbar from '../../Toolbar/ActionsToolbar';
import HotspotTitle from '../HotspotHeader/HotspotTitle';
import EventHotspotDescription from './EventHotspotDescription';
import EventHotspotDateTime from './EventHotspotDateTime';
import EventHotspotCountDown from './EventHotspotCountDown';
import Footer from '../../Footer/Footer';
import actions from '../../../../../../client/actions';
import { getCityzenId, isAuthenticated } from '../../../../../reducers/authenticatedCityzen';
import withViewCounter from '../../../../hoc/hotspots/withViewCounter';

import './../HotspotContent.scss';

const EventHotspot = ({
    hotspot,
    cityzenIsAuthenticated,
    cityzenId,
    editEventHotspot,
    openSettingUpHotspotModal,
}) => {
    const buildToolbar = () => {
        if (cityzenIsAuthenticated && cityzenId === hotspot.author.id) {
            return (
                <ActionsToolbar
                    editAction={() => {
                        editEventHotspot({
                            hotspotId: hotspot.id,
                            description: hotspot.description.content,
                            dateEnd: hotspot.dateEnd,
                            scope: hotspot.scope,
                            type: hotspot.type,
                        });
                        openSettingUpHotspotModal();
                    }}
                />
            );
        }
        return <ActionsToolbar />;
    };
    return (
        <Fragment>
            {buildToolbar()}
            <section className="HotspotContent">
                <HotspotTitle
                    title={hotspot.title}
                    address={hotspot.address}
                    hotspotId={hotspot.id}
                    isAuthor={cityzenId === hotspot.author.id}
                />
                <EventHotspotDateTime date={hotspot.dateEnd} />
                <EventHotspotCountDown dateEnd={hotspot.dateEnd} />
                <CustomScroll heightRelativeToParent="100%">
                    <EventHotspotDescription
                        description={hotspot.description}
                        author={hotspot.author}
                        dateEnd={hotspot.dateEnd}
                    />
                </CustomScroll>
            </section>
            <Footer views={hotspot.views} />
        </Fragment>
    );
};

EventHotspot.propTypes = {
    hotspot: PropTypes.shape({
        title: PropTypes.string.isRequired,
        dateEnd: PropTypes.string.isRequired,
        description: PropTypes.object.isRequired,
        author: PropTypes.object.isRequired,
        views: PropTypes.number.isRequired,
    }).isRequired,
    cityzenIsAuthenticated: PropTypes.bool.isRequired,
    cityzenId: PropTypes.string,
    editEventHotspot: PropTypes.func.isRequired,
    openSettingUpHotspotModal: PropTypes.func.isRequired,
};

EventHotspot.defaultProps = {
    cityzenId: undefined,
};

const mapStateToProps = state => ({
    cityzenId: getCityzenId(state),
    cityzenIsAuthenticated: isAuthenticated(state),
});

const mapDispatchToProps = dispatch => ({
    openSettingUpHotspotModal: () => {
        dispatch(actions.openSettingUpHotspotModal());
    },
    editEventHotspot: hotspot => {
        dispatch(actions.editEventHotspot(hotspot));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(withViewCounter(EventHotspot));
