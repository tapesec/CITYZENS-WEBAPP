import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CustomScroll from 'react-custom-scroll';
import { Elevation } from 'rmwc/Elevation';
import ActionsToolbar from '../../Toolbar/ActionsToolbar';
import HotspotTitle from '../HotspotHeader/HotspotTitle';
import EventHotspotDescription from './EventHotspotDescription';
import EventHotspotDateTime from './EventHotspotDateTime';
import EventHotspotCountDown from './EventHotspotCountDown';
import Footer from '../../Footer/Footer';
import Slideshow from '../../Widgets/Slideshow/Slideshow';
import actions from '../../../../../../client/actions';
import { getCityzenId, isAuthenticated } from '../../../../../reducers/authenticatedCityzen';
import withViewCounter from '../../../../hoc/hotspots/withViewCounter';
import constants from './../../../../../constants';
import config from '../../../../../config';

const EventHotspot = ({
    hotspot,
    cityzenIsAuthenticated,
    cityzenId,
    editEventHotspot,
    openSettingUpHotspotModal,
    selectWidgetToConfigure,
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
                    slideShowAction={() => {
                        selectWidgetToConfigure(hotspot.id, constants.WIDGET.NAME.MEDIA_SLIDE_SHOW);
                    }}
                />
            );
        }
        return <ActionsToolbar />;
    };

    const displaySlideshowWidget = () => {
        if (hotspot.slideShow.length > 0) {
            return <Slideshow imageIds={hotspot.slideShow} />;
        }
        return null;
    };

    return (
        <Fragment>
            {buildToolbar()}
            <section className="HotspotContent">
                <CustomScroll heightRelativeToParent="100%">
                    <article style={{ marginRight: '12px' }}>
                        <HotspotTitle
                            title={hotspot.title}
                            address={hotspot.address}
                            hotspotId={hotspot.id}
                            isAuthor={cityzenId === hotspot.author.id}
                            avatarUrl={`${hotspot.avatarIconUrl}?policy=${
                                config.fileStack.security.policy
                            }&signature=${config.fileStack.security.signature}`}
                        />
                        <EventHotspotDateTime date={hotspot.dateEnd} />
                        <EventHotspotCountDown dateEnd={hotspot.dateEnd} />
                        {displaySlideshowWidget()}
                        <Elevation z="4" style={{ margin: '1px' }}>
                            <EventHotspotDescription
                                description={hotspot.description}
                                author={hotspot.author}
                                dateEnd={hotspot.dateEnd}
                            />
                        </Elevation>
                    </article>
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
    selectWidgetToConfigure: PropTypes.func.isRequired,
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
    selectWidgetToConfigure: (hotspotId, widgetName) => {
        dispatch(actions.selectWidgetToConfigure(hotspotId, widgetName));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(withViewCounter(EventHotspot));
