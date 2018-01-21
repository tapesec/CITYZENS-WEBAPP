import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryText,
    ListItemStartDetail,
    ListDivider,
} from 'rmwc/List';
import CustomScroll from 'react-custom-scroll';

const SearchResult = props => (
    <CustomScroll>
        <List twoLine avatarList style={{ maxHeight: '200px' }}>
            {props.hotspotsList.map(hit => (
                <Fragment key={hit.objectID || hit.id}>
                    <ListItem
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setTimeout(() => {
                                props.focusHotspot(hit.objectID || hit.id);
                            }, 50);
                        }}>
                        <ListItemStartDetail>
                            <img
                                style={{
                                    display: 'block',
                                    height: '100%',
                                    width: '100%',
                                    borderRadius: '50%',
                                }}
                                alt="avatar"
                                src="https://dummyimage.com/300.png"
                            />
                        </ListItemStartDetail>
                        <ListItemText>
                            <h3 className="mdc-typography--subheading2 mdc-theme--secondary">
                                {hit.title}
                            </h3>
                            <ListItemSecondaryText>
                                {hit.address.name || hit.address}
                            </ListItemSecondaryText>
                        </ListItemText>
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
