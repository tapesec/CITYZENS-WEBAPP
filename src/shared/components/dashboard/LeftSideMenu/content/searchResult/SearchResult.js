import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryText,
    ListItemGraphic,
    ListItemMeta,
    ListDivider,
} from 'rmwc/List';
import Typography from 'rmwc/Typography';
import CustomScroll from 'react-custom-scroll';
import ImageCDN from '../../../../lib/ImageCDN';
import constants from './../../../../../../shared/constants';
import helper from './../../../../../../shared/helpers';

const SearchResult = props => {
    const openHotspotInSPAModal = hit => e => {
        e.stopPropagation();
        props.openHotspotInSPAModal(hit.objectID || hit.id);
    };

    const listItemOnClick = hit => () => {
        if (hit.type === constants.HOTSPOT.TYPE.ALERT) {
            props.openHotspotInSPAModal(hit.objectID || hit.id);
        } else {
            props.history.push(`/${props.city.slug}/${hit.slug}`);
        }
    };

    const getAdresseLabelAndDistance = hit => {
        // eslint-disable-next-line no-underscore-dangle
        const highlightResult = hit._highlightResult;
        // eslint-disable-next-line no-underscore-dangle
        if (highlightResult) {
            return highlightResult.address.value;
        }
        return hit.address.name;
    };

    const getLabelDistanceOrMarkerIcon = hit => {
        // eslint-disable-next-line no-underscore-dangle
        const rankingInfo = hit._rankingInfo;
        const onClickHandle = () => {
            if (props.isMobileDevice) {
                setTimeout(() => {
                    props.toggleLeftSideMenuVisibility();
                }, 50);
            }
            props.focusHotspot(hit.objectID || hit.id);
        };
        if (rankingInfo) {
            return (
                <ListItemMeta
                    style={{
                        flexBasis: 'min-content',
                        alignItems: 'right',
                        cursor: 'pointer',
                        fontSize: props.dense ? '9px' : '12px',
                        minWidth: '30px',
                        padding: '3px',
                    }}
                    tag="span"
                    basename="">
                    {helper.formatDistance(rankingInfo.geoDistance)}
                </ListItemMeta>
            );
        }
        return (
            <ListItemMeta
                style={{
                    flexBasis: 'min-content',
                    alignItems: 'right',
                    cursor: 'pointer',
                }}
                onClick={e => {
                    e.stopPropagation();
                    onClickHandle();
                }}>
                pin_drop
            </ListItemMeta>
        );
    };

    getLabelDistanceOrMarkerIcon.propTypes = {
        focusHotspot: PropTypes.func.isRequired,
        toggleLeftSideMenuVisibility: PropTypes.func.isRequired,
        isMobileDevice: PropTypes.bool.isRequired,
    };

    return (
        <section className="SearchResult">
            <CustomScroll heightRelativeToParent="100%">
                <List twoLine dense={props.dense} avatarList style={{ margin: '0 10px 10px 10px' }}>
                    {props.hotspotsList.map(hit => (
                        <Fragment key={hit.objectID || hit.id}>
                            <ListItem style={{ cursor: 'pointer' }} onClick={listItemOnClick(hit)}>
                                <ListItemGraphic>
                                    <ImageCDN
                                        filename={hit.avatarIconUrl}
                                        style={{
                                            display: 'block',
                                            borderRadius: '50%',
                                        }}
                                        alt="avatar"
                                        process
                                        processParam="compress"
                                    />
                                </ListItemGraphic>
                                <ListItemText
                                    style={{
                                        flexBasis: '240px',
                                        maxWidth: '240px',
                                        overflow: 'hidden',
                                    }}>
                                    {hit.type === constants.HOTSPOT.TYPE.ALERT ? (
                                        <Typography
                                            tag="h3"
                                            theme="secondary"
                                            className="itemTitle mdc-typography--subheading2"
                                            tabIndex={0}
                                            onClick={openHotspotInSPAModal(hit)}
                                            onKeyDown={openHotspotInSPAModal(hit)}>
                                            {helper.generateTitleForMarker(hit)}
                                        </Typography>
                                    ) : (
                                        <Typography tag="h3" theme="secondary">
                                            <Link
                                                className="itemTitle mdc-typography--subheading2"
                                                to={`/${props.city.slug}/${hit.slug}`}
                                                dangerouslySetInnerHTML={{
                                                    __html: helper.generateTitleForMarker(hit),
                                                }}
                                            />
                                        </Typography>
                                    )}

                                    <ListItemSecondaryText>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: getAdresseLabelAndDistance(hit),
                                            }}
                                        />
                                    </ListItemSecondaryText>
                                </ListItemText>
                                {getLabelDistanceOrMarkerIcon(hit)}
                            </ListItem>
                            <ListDivider />
                        </Fragment>
                    ))}
                </List>
            </CustomScroll>
        </section>
    );
};

SearchResult.propTypes = {
    hotspotsList: PropTypes.arrayOf(PropTypes.object),
    city: PropTypes.shape({
        slug: PropTypes.string.isRequired,
    }).isRequired,
    dense: PropTypes.bool.isRequired,
    openHotspotInSPAModal: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-typos
    history: ReactRouterPropTypes.history.isRequired,
};
SearchResult.defaultProps = {
    hotspotsList: [],
};
export default SearchResult;
