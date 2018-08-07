import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from 'rmwc/Typography';
import { Icon } from 'rmwc/Icon';
import { visitorComeFromMobile } from '../../reducers/visitor';
import { getCityzenProfileFromApi, isAuthenticated } from '../../reducers/authenticatedCityzen';
import ImageCDN from './../lib/ImageCDN';
import ComboIcon from './../lib/comboIcon/ComboIcon';

import './profile.scss';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // isEditMode: false,
        };
        this.displaySettingsAction = this.displaySettingsAction.bind(this);
        this.turnOnEditMode = this.turnOnEditMode.bind(this);
    }

    turnOnEditMode() {
        this.setState({
            // isEditMode: true,
        });
    }

    displaySettingsAction() {
        const content = [{ label: 'Editer le profil', action: () => ({}) /* editMessage */ }].map(
            item => (
                <Typography
                    tag="div"
                    use="body2"
                    className="combo-item"
                    key={item.label}
                    role="button"
                    onClick={() => item.action(item)}>
                    {item.label}
                </Typography>
            ),
        );
        return this.props.isAuthenticated && this.props.authenticatedCityzen === true ? (
            <ComboIcon
                actionComponent={() => <Icon strategy="ligature">settings</Icon>}
                className="contextual-action"
                content={content}
            />
        ) : null;
    }

    render() {
        // const { isFromMobile } = this.props;
        console.log(this.props, 'props');
        return (
            <section className="Profile">
                <section className="top-section">
                    <div className="settings">{this.displaySettingsAction()}</div>
                    <div className="avatar-picture">
                        <ImageCDN
                            process
                            processParam="output=format:png/resize=w:140,fit:clip/compress"
                            style={{
                                width: '80px',
                                borderRadius: '40px',
                                border: '2px solid white',
                                boxSizing: 'border-box',
                                boxShadow: '0px 0px 2px 0px grey',
                            }}
                            filename="KI9EVeOiS3KbqA5G7es1"
                            alt="avatar de MR X"
                        />
                    </div>
                </section>

                <section className="content-section">
                    <Typography className="pseudo" use="subtitle1" tag="h1" theme="text-primary">
                        Lionnel DUPOUY
                    </Typography>
                    <Typography className="description" use="body2" tag="h1" theme="text-primary">
                        {
                            'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit'
                        }
                    </Typography>
                </section>
            </section>
        );
    }
}

Profile.propTypes = {
    // isFromMobile: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    authenticatedCityzen: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
    isFromMobile: visitorComeFromMobile(state),
    authenticatedCityzen: getCityzenProfileFromApi(state),
    isAuthenticated: isAuthenticated(state),
});

export default connect(mapStateToProps)(Profile);
