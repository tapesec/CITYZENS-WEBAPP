import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'rmwc/Typography';
import DateFormater from '../../../../lib/DateFormater';
import ImageCDN from './../../../../lib/ImageCDN';
import ComboIcon from './../../../../lib/comboIcon/ComboIcon';
import './../HotspotMessage.scss';

const HotspotMessage = ({ message, cityzenIsAuthor, edit }) => {
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
        <article key={message.id} className="HotspotMessage">
            <div style={{ display: 'flex' }}>
                <ImageCDN
                    style={{ width: '50px', marginRight: '16px', marginTop: '40px' }}
                    filename="KI9EVeOiS3KbqA5G7es1"
                    alt="avatar de l'auteur"
                />
                <div>
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
                </div>
            </div>
        </article>
    );
};

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
    edit: PropTypes.func,
};

HotspotMessage.defaultProps = {
    cityzenIsAuthor: false,
    edit: () => {},
};

export default HotspotMessage;
