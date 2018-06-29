import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'rmwc/Typography';
import Icon from 'rmwc/Icon';
import { getMessageComments } from '../../../../../reducers/comments';
import HotspotComment from '../HotspotComment/HotspotComment';
import DateFormater from '../../../../lib/DateFormater';
import ImageCDN from './../../../../lib/ImageCDN';
import ComboIcon from './../../../../lib/comboIcon/ComboIcon';
import './../HotspotMessage.scss';
import HotspotCommentForm from '../HotspotComment/HotspotCommentForm';

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
        } = this.props;

        const editMessage = () => {
            edit(message.id, message.title, message.body, message.pinned);
        };

        const displayEditAction = () =>
            cityzenIsAuthor ? (
                <ComboIcon
                    className="contextual-action"
                    items={[
                        { label: 'Editer', action: editMessage },
                        { label: 'Supprimer', action: () => {} },
                    ]}
                />
            ) : null;

        const displayComments = () =>
            messageComments.map(comment => <HotspotComment key={comment.id} comment={comment} />);

        return (
            <Fragment>
                <article key={message.id} className="HotspotMessage">
                    <div className="message-section" style={{ display: 'flex' }}>
                        <ImageCDN
                            style={{ width: '50px', marginRight: '16px', marginTop: '40px' }}
                            filename="KI9EVeOiS3KbqA5G7es1"
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
                                    {message.author.pseudo}
                                </Typography>{' '}
                                <Typography
                                    tag="span"
                                    style={{ color: 'gray' }}
                                    use="body2"
                                    theme="text-secondary-on-background">
                                    <DateFormater duration date={message.createdAt} />
                                </Typography>
                            </header>
                            <Typography
                                tag="p"
                                use="body2"
                                dangerouslySetInnerHTML={{ __html: message.body }}
                            />
                            <Typography tag="em" use="body2" theme="text-secondary-on-background">
                                <DateFormater
                                    labelPrefix="Dernière mise à jour "
                                    duration
                                    date={message.updatedAt}
                                />
                            </Typography>
                            <footer>
                                <Typography
                                    onClick={() =>
                                        this.setState({
                                            commentsAreVisible: !this.state.commentsAreVisible,
                                        })
                                    }
                                    tag="p"
                                    use="caption"
                                    theme="text-secondary-on-background"
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
                        </div>
                    </div>
                    {cityzenIsAuthenticated && this.state.commentsAreVisible ? (
                        <Fragment>
                            <HotspotCommentForm
                                parentId={message.id}
                                hotspotId={hotspotId}
                                cityzen={cityzen}
                                style={{ marginBottom: '20px' }}
                                onSubmit={() => {}}
                            />
                            {displayComments()}
                        </Fragment>
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
};

HotspotMessage.defaultProps = {
    cityzenIsAuthor: false,
    cityzen: undefined,
    edit: () => {},
};

const mapStateToProps = (state, ownProps) => ({
    messageComments: getMessageComments(state, ownProps.message.id),
});

export default connect(mapStateToProps)(HotspotMessage);
