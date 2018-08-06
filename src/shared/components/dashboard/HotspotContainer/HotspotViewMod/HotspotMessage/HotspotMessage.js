import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'rmwc/Typography';
import Icon from 'rmwc/Icon';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { getMessageComments } from '../../../../../reducers/comments';
import HotspotComment from '../HotspotComment/HotspotComment';
import DateFormater from '../../../../lib/DateFormater';
import ImageCDN from './../../../../lib/ImageCDN';
import ComboIcon from './../../../../lib/comboIcon/ComboIcon';
import './../HotspotMessage.scss';
import HotspotCommentForm from '../HotspotComment/HotspotCommentForm';
import actions from '../../../../../../client/actions';
import { componentIsLoading } from '../../../../../reducers/componentsState';

class HotspotMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentsAreVisible: false,
        };
    }

    render() {
        const {
            message,
            cityzenIsAuthor,
            edit,
            cityzenIsAuthenticated,
            cityzen,
            hotspotId,
            messageComments,
            fetchMessageComments,
            deleteMessage,
            deleteComment,
            fetchingComments,
        } = this.props;

        const editMessage = () => {
            edit(message.id, message.title, message.body, message.pinned);
        };

        const deleteHotspotMessage = () => {
            deleteMessage(hotspotId, message.id);
        };

        const displayEditAction = () => {
            const content = [
                { label: 'Editer', action: editMessage },
                { label: 'Supprimer', action: deleteHotspotMessage },
            ].map(item => (
                <Typography
                    tag="div"
                    use="body2"
                    className="combo-item"
                    key={item.label}
                    role="button"
                    onClick={() => item.action(item)}>
                    {item.label}
                </Typography>
            ));
            return cityzenIsAuthor ? (
                <ComboIcon
                    actionComponent={() => <Icon strategy="ligature">keyboard_arrow_down</Icon>}
                    className="contextual-action"
                    content={content}
                />
            ) : null;
        };

        const displayComments = () => (
            <Fragment>
                <HotspotCommentForm
                    parentId={message.id}
                    hotspotId={hotspotId}
                    cityzen={cityzen}
                    style={{ marginBottom: '20px' }}
                    onSubmit={() => {}}
                />{' '}
                {fetchingComments ? (
                    <div style={{ margin: 'auto', display: 'block', width: '50px' }}>
                        <Loader type="Circles" color="#018786" height="50" width="50" />
                    </div>
                ) : (
                    messageComments.map(comment => (
                        <HotspotComment
                            hotspotId={hotspotId}
                            key={comment.id}
                            comment={comment}
                            cityzenIsAuthor={cityzen.id === comment.author.id}
                            deleteComment={deleteComment}
                        />
                    ))
                )}
            </Fragment>
        );
        return (
            <Fragment>
                <article key={message.id} className="HotspotMessage">
                    <div className="message-section" style={{ display: 'flex' }}>
                        <ImageCDN
                            style={{ width: '50px', marginRight: '16px', marginTop: '40px' }}
                            filename={
                                this.props.defaultAvatar ||
                                message.author.pictureCityzen ||
                                message.author.pictureExtern
                            }
                            alt="avatar de l'auteur"
                        />
                        <div className="message-content">
                            <header>
                                {displayEditAction()}
                                <Typography
                                    style={{ marginBottom: 10 }}
                                    use="body1"
                                    tag="h2"
                                    theme="secondary">
                                    {message.title}
                                </Typography>
                                <Typography
                                    style={{ fontWeight: 'bold' }}
                                    tag="strong"
                                    use="body2"
                                    theme="text-primary-on-background">
                                    <Link to={`/profile/${message.author.id}`}>
                                        {message.author.pseudo}
                                    </Link>
                                </Typography>{' '}
                                <Typography
                                    tag="span"
                                    style={{ color: 'gray' }}
                                    use="body2"
                                    theme="text-secondary-on-background">
                                    <DateFormater duration date={message.createdAt} />
                                </Typography>
                            </header>
                            <Typography tag="p" use="body2">
                                {message.body}
                            </Typography>
                            <Typography tag="em" use="body2" theme="text-secondary-on-background">
                                <DateFormater
                                    labelPrefix="Dernière mise à jour "
                                    duration
                                    date={message.updatedAt}
                                />
                            </Typography>
                            {!this.props.defaultAvatar ? (
                                <footer>
                                    <Typography
                                        onClick={() => {
                                            this.setState({
                                                commentsAreVisible: !this.state.commentsAreVisible,
                                            });
                                            fetchMessageComments(hotspotId, message.id);
                                        }}
                                        className="comment-link"
                                        tag="span"
                                        use="caption"
                                        style={{ cursor: 'pointer' }}>
                                        <Icon
                                            style={{
                                                fontSize: '1rem',
                                                verticalAlign: 'middle',
                                            }}
                                            strategy="ligature">
                                            add_comment
                                        </Icon>{' '}
                                        Commentez{' '}
                                        {message.commentsCount
                                            ? `(${message.commentsCount})`
                                            : '(0)'}{' '}
                                        {this.state.commentsAreVisible ? (
                                            <Icon
                                                style={{
                                                    fontSize: '1rem',
                                                    verticalAlign: 'middle',
                                                }}
                                                strategy="ligature">
                                                keyboard_arrow_down
                                            </Icon>
                                        ) : null}
                                    </Typography>
                                </footer>
                            ) : null}
                        </div>
                    </div>
                    {cityzenIsAuthenticated && this.state.commentsAreVisible
                        ? displayComments()
                        : null}
                    {this.state.commentsAreVisible && !cityzenIsAuthenticated ? (
                        <Typography
                            style={{
                                padding: '5px',
                                backgroundColor: 'lightsalmon',
                                textAlign: 'center',
                                color: 'white',
                                marginTop: '20px',
                            }}
                            tag="div"
                            use="body2"
                            theme="text-primary-on-background">
                            <a href="/login">Connectez vous</a> pour répondre à{' '}
                            <strong>{message.author.pseudo}</strong>
                        </Typography>
                    ) : null}
                </article>
            </Fragment>
        );
    }
}

HotspotMessage.propTypes = {
    message: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        author: PropTypes.shape({
            pseudo: PropTypes.string,
        }),
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
        body: PropTypes.string,
    }).isRequired,
    messageComments: PropTypes.arrayOf(PropTypes.object).isRequired,
    hotspotId: PropTypes.string.isRequired,
    cityzenIsAuthor: PropTypes.bool,
    cityzenIsAuthenticated: PropTypes.bool.isRequired,
    cityzen: PropTypes.shape({}),
    edit: PropTypes.func,
    fetchMessageComments: PropTypes.func.isRequired,
    deleteMessage: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    fetchingComments: PropTypes.bool.isRequired,
    defaultAvatar: PropTypes.string,
};

HotspotMessage.defaultProps = {
    cityzenIsAuthor: false,
    cityzen: undefined,
    defaultAvatar: undefined,
    edit: () => {},
};

const mapStateToProps = (state, ownProps) => ({
    messageComments: getMessageComments(state, ownProps.message.id),
    fetchingComments: componentIsLoading.fetchingComments(state),
});

const mapDispatchToProps = dispatch => ({
    fetchMessageComments: (hotspotId, messageId) => {
        dispatch(actions.fetchMessageComments(hotspotId, messageId));
    },
    deleteMessage: (hotspotId, messageId) => {
        dispatch(actions.deleteHotspotMessage(hotspotId, messageId));
    },
    deleteComment: (hotspotId, messageId, parentId) => {
        dispatch(actions.deleteMessageComment(hotspotId, messageId, parentId));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HotspotMessage);
