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
import CustomScroll from 'react-custom-scroll';
import constants from './../../../../../../shared/constants';
import helper from './../../../../../../shared/helpers';

const SearchResult = props => (
    <CustomScroll>
        <List twoLine avatarList style={{ maxHeight: '285px' }}>
            {props.hotspotsList.map(hit => (
                <Fragment key={hit.objectID || hit.id}>
                    <ListItem>
                        <ListItemGraphic style={{ marginRight: '10px', flexBasis: 'min-content' }}>
                            <img
                                style={{
                                    display: 'block',
                                    height: '55px',
                                    width: '55px',
                                    borderRadius: '50%',
                                }}
                                alt="avatar"
                                src="https://dummyimage.com/300.png"
                            />
                        </ListItemGraphic>
                        <ListItemText
                            style={{ flexBasis: '240px', maxWidth: '240px', overflow: 'hidden' }}>
                            {hit.type === constants.HOTSPOT.TYPE.ALERT ? (
                                <h3
                                    onClick={() => props.openHotspotInModal(hit.objectID || hit.id)}
                                    className="mdc-typography--subheading2 mdc-theme--secondary">
                                    {helper.generateTitleForMarker(hit)}
                                </h3>
                            ) : (
                                <h3 className="mdc-typography--subheading2 mdc-theme--secondary">
                                    <Link
                                        className="itemTitle"
                                        to={`/${props.city.slug}/${hit.slug}`}>
                                        {helper.generateTitleForMarker(hit)}
                                    </Link>
                                </h3>
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
    openHotspotInModal: PropTypes.func.isRequired,
};
SearchResult.defaultProps = {
    hotspotsList: [],
};
export default SearchResult;
