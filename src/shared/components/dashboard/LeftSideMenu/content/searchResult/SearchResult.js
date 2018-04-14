import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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
import constants from './../../../../../../shared/constants';
import helper from './../../../../../../shared/helpers';

const SearchResult = props => (
    <CustomScroll>
        <List twoLine avatarList style={{ maxHeight: '285px', margin: '0 10px 10px 10px' }}>
            {props.hotspotsList.map(hit => (
                <Fragment key={hit.objectID || hit.id}>
                    <ListItem>
                        <ListItemGraphic
                            style={{
                                marginRight: '25px',
                                flexBasis: 'min-content',
                                width: '40px',
                                height: '55px',
                            }}>
                            <img
                                style={{
                                    display: 'block',
                                    height: '55px',
                                    width: '55px',
                                    borderRadius: '50%',
                                }}
                                alt="avatar"
                                src={
                                    hit.type === constants.HOTSPOT.TYPE.ALERT
                                        ? helper.generateAvatarForAlertHotspot(hit)
                                        : hit.avatarIconUrl
                                }
                            />
                        </ListItemGraphic>
                        <ListItemText
                            style={{ flexBasis: '240px', maxWidth: '240px', overflow: 'hidden' }}>
                            {hit.type === constants.HOTSPOT.TYPE.ALERT ? (
                                <Typography
                                    tag="h3"
                                    theme="secondary"
                                    className="itemTitle mdc-typography--subheading2"
                                    tabIndex={0}
                                    onClick={e => {
                                        e.preventDefault();
                                        props.openHotspotInSPAModal(hit.objectID || hit.id);
                                    }}
                                    onKeyDown={() =>
                                        props.openHotspotInSPAModal(hit.objectID || hit.id)
                                    }>
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
                            }}
                            onClick={() => {
                                setTimeout(() => {
                                    props.focusHotspot(hit.objectID || hit.id);
                                }, 50);
                            }}>
                            search
                        </ListItemMeta>
                    </ListItem>
                    <ListDivider />
                </Fragment>
            ))}
        </List>
    </CustomScroll>
);

SearchResult.propTypes = {
    hotspotsList: PropTypes.arrayOf(PropTypes.object),
    city: PropTypes.shape({
        slug: PropTypes.string.isRequired,
    }).isRequired,
};
SearchResult.defaultProps = {
    hotspotsList: [],
};
export default SearchResult;
