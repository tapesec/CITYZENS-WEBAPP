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
            {props.hits.map(hit => (
                <Fragment key={hit.objectID}>
                    <ListItem>
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
                            <ListItemSecondaryText>{hit.address.name}</ListItemSecondaryText>
                        </ListItemText>
                    </ListItem>
                    <ListDivider />
                </Fragment>
            ))}
        </List>
    </CustomScroll>
);

SearchResult.propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object),
};
SearchResult.defaultProps = {
    hits: [],
};
export default SearchResult;
