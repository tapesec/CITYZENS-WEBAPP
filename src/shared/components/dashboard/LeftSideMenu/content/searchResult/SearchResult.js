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
    return (
        <section className="SearchResult">
            <CustomScroll heightRelativeToParent="100%">
                <List twoLine dense={props.dense} avatarList style={{ margin: '0 10px 10px 10px' }}>
                    {props.hotspotsList.map(hit => (
                        <Fragment key={hit.objectID || hit.id}>
                            <ListItem style={{ cursor: 'pointer' }} onClick={listItemOnClick(hit)}>
                                <ListItemGraphic>
                                    <ImageCDN
                                        filename={
                                            hit.type === constants.HOTSPOT.TYPE.ALERT
                                                ? helper
                                                      .generateAvatarForAlertHotspot(hit)
                                                      .split('/')[3]
                                                : hit.avatarIconUrl.split('/')[3]
                                        }
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
                                                to={`/${props.city.slug}/${hit.slug}`}>
                                                {helper.generateTitleForMarker(hit)}
                                            </Link>
                                        </Typography>
                                    )}

                                    <ListItemSecondaryText>
                                        {hit.address.name || hit.address}
                                    </ListItemSecondaryText>
                                </ListItemText>
                                <ListItemMeta
                                    style={{
                                        flexBasis: 'min-content',
                                        alignItems: 'right',
                                        cursor: 'pointer',
                                        display: props.focusMarkerIcon ? 'block' : 'none',
                                    }}
                                    onClick={e => {
                                        e.stopPropagation();
                                        setTimeout(() => {
                                            props.focusHotspot(hit.objectID || hit.id);
                                        }, 50);
                                    }}>
                                    pin_drop
                                </ListItemMeta>
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
    focusMarkerIcon: PropTypes.bool.isRequired,
    openHotspotInSPAModal: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-typos
    history: ReactRouterPropTypes.history.isRequired,
};
SearchResult.defaultProps = {
    hotspotsList: [],
};
export default SearchResult;
