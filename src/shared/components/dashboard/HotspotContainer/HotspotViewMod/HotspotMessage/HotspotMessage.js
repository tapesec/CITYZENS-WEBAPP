import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from 'rmwc/Typography';
import Icon from 'rmwc/Icon';
import DateFormater from '../../../../lib/DateFormater';
import ImageCDN from './../../../../lib/ImageCDN';
import ComboIcon from './../../../../lib/comboIcon/ComboIcon';
import './../HotspotMessage.scss';
import HotspotCommentForm from '../HotspotComment/HotspotCommentForm';

class HotspotMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentFormIsVisible: false,
        };
    }

    render() {
        const {
            message,
            cityzenIsAuthor,
            edit,
            cityzenIsAuthenticated,
            parentId,
            cityzen,
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
                                            commentFormIsVisible: !this.state.commentFormIsVisible,
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
                                    {this.state.commentFormIsVisible ? (
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
                    {cityzenIsAuthenticated && this.state.commentFormIsVisible ? (
                        <HotspotCommentForm
                            parentId={parentId}
                            cityzen={cityzen}
                            style={{ marginBottom: '20px' }}
                            onSubmit={() => {}}
                        />
                    ) : null}
                </article>
            </Fragment>
        );
    }
}

HotspotMessage.propTypes = {
    message: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.shape({
            pseudo: PropTypes.string.isRequired,
        }),
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string,
        body: PropTypes.string.isRequired,
    }).isRequired,
    cityzenIsAuthor: PropTypes.bool,
    cityzenIsAuthenticated: PropTypes.bool.isRequired,
    cityzen: PropTypes.shape({}),
    parentId: PropTypes.string.isRequired,
    edit: PropTypes.func,
};

HotspotMessage.defaultProps = {
    cityzenIsAuthor: false,
    cityzen: undefined,
    edit: () => {},
};

export default HotspotMessage;
