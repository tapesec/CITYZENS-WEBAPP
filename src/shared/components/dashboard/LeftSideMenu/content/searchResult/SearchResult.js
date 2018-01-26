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

const SearchResult = props => (
    <CustomScroll>
        <List twoLine avatarList style={{ maxHeight: '200px' }}>
            {props.hotspotsList.map(hit => (
                <Fragment key={hit.objectID || hit.id}>
                    <ListItem style={{ cursor: 'pointer' }}>
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
                        <ListItemText style={{ flexBasis: '240px', maxWidth: '240px', overflow: 'hidden' }}>
                            <h3 className="mdc-typography--subheading2 mdc-theme--secondary">
                                <Link className="itemTitle" to="/martignas/mairie">
                                    {hit.title}
                                </Link>
                            </h3>
                            <ListItemSecondaryText>
                                {hit.address.name || hit.address}
                            </ListItemSecondaryText>
                        </ListItemText>
                        <ListItemMeta
                            style={{ flexBasis: 'min-content', alignItems: 'right' }}
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
};
SearchResult.defaultProps = {
    hotspotsList: [],
};
export default SearchResult;
