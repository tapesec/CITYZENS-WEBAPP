import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from 'rmwc/Typography';
import { Grid, GridCell } from 'rmwc/Grid';
import { Ripple } from 'rmwc/Ripple';
import { visitorComeFromMobile } from '../../reducers/visitor';
import ImageCDN from './../lib/ImageCDN';
import actions from './../../../client/actions';
import TextFieldValidationMessages from './../lib/form/ValidationMessage';

import './Home.scss';

const logoFilenameId = 'LEcgoqx5RieLXUxo6qup';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            errorEmail: false,
        };
        this.submitLead = this.submitLead.bind(this);
        this.emailInputOnChange = this.emailInputOnChange.bind(this);
    }

    submitLead(evt) {
        evt.preventDefault();
        if (
            /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/.test(
                this.state.email,
            )
        ) {
            this.props.submitLead(this.state.email);
            this.setState({
                email: '',
                errorEmail: false,
            });
        } else {
            this.setState({
                errorEmail: true,
            });
        }
    }

    emailInputOnChange(evt) {
        this.setState({
            email: evt.target.value,
        });
    }

    render() {
        const { isFromMobile } = this.props;
        return (
            <section className="layout">
                <Grid className="first-view-line">
                    {!isFromMobile ? <GridCell span="1" /> : null}
                    <GridCell phone="12" span="5">
                        <div className="logo-map">
                            <ImageCDN
                                className="logo"
                                filename={logoFilenameId}
                                alt="Logo de Cityzens"
                            />
                        </div>
                    </GridCell>
                    <GridCell span="5">
                        <section className="punchline">
                            <Typography tag="h1" theme="text-primary-on-background">
                                Moncoeurde<span style={{ color: '#009688' }}>Ville.fr</span>
                            </Typography>
                            <Typography
                                tag="span"
                                className="subtitle"
                                use="headline5"
                                theme="text-primary-on-background">
                                Le réseau social de votre ville
                            </Typography>
                            <Typography tag="p" use="body1" theme="tex-primary-on-background">
                                <span className="organization-title">MoncoeurdeVille.fr</span> est
                                un réseau social intéractif vous permettant de suivre toutes les
                                informations de votre ville.
                            </Typography>
                            <div className="signin-call-to-action">
                                <Ripple primary>
                                    <Typography
                                        tag="a"
                                        className="signin"
                                        target="_blank"
                                        href="https://medium.com/moncoeurdeville/a-la-d%C3%A9couverte-de-monc%C5%93urdeville-fr-ff7211b9b98d"
                                        use={isFromMobile ? 'caption' : 'body1'}
                                        theme="text-primary-on-secondary">
                                        EN SAVOIR PLUS
                                    </Typography>
                                </Ripple>
                            </div>
                            {/* <Typography tag="p" use="body1" theme="tex-primary-on-background">
                        Connectez-vous à Martignas-sur-Jalle et ne manquez aucun évenements
                        </Typography> 
                    */}
                            {/* <div className="signin-call-to-action">
                        <Ripple primary>
                            <Typography
                                tag="a"
                                className="signin"
                                href="/login"
                                use={isFromMobile ? 'caption' : 'body1'}
                                theme="text-primary-on-secondary">
                                INSCRIPTION
                            </Typography>
                        </Ripple>
                        <Ripple primary>
                            <Typography
                                tag="a"
                                className="visitor"
                                href="/Martignas-sur-Jalle"
                                use={isFromMobile ? 'caption' : 'body1'}
                                theme="text-primary-on-secondary">
                                DECOUVREZ MARTIGNAS
                            </Typography>
                        </Ripple>
                    </div> */}
                        </section>
                    </GridCell>
                    {!isFromMobile ? <GridCell span="1" /> : null}
                </Grid>
                <Grid className="face-view-line">
                    {!isFromMobile ? <GridCell span="1" /> : null}
                    <GridCell span="1">
                        <ImageCDN filename="VCiosL1jQRuX5dWIGkSl" alt="ouvrier" />
                    </GridCell>
                    <GridCell span="1">
                        <ImageCDN filename="41tnz4eRQrSIdqbRBHxA" alt="Sportif" />
                    </GridCell>
                    <GridCell span="1">
                        <ImageCDN filename="5VFAQTUUSNaaFVtCRBaK" alt="Nurse" />
                    </GridCell>
                    <GridCell span="1">
                        <ImageCDN filename="uh7wHpRTu6nP49ZA4Tkg" alt="Mother" />
                    </GridCell>
                    <GridCell span="1">
                        <ImageCDN filename="RSixiA9TIO4dKtvgFHYA" alt="Boulanger" />
                    </GridCell>
                    <GridCell span="1">
                        <ImageCDN filename="Q2TOQsftRinmHpHGZ5Kx" alt="Policier" />
                    </GridCell>
                    <GridCell span="1">
                        <ImageCDN filename="u6B8HU4ZQMWfBNDzLkb0" alt="Enfant" />
                    </GridCell>
                    <GridCell span="1">
                        <ImageCDN filename="LBOg3Vu3R4GiZevZj0KU" alt="Maire" />
                    </GridCell>
                    <GridCell span="1">
                        <ImageCDN filename="5KKormr7SPu9hUJnYOVV" alt="Viel homme" />
                    </GridCell>
                    <GridCell span="1">
                        <ImageCDN filename="whqfOtTOu3HzXFeSpRAw" alt="Coiffeuse" />
                    </GridCell>
                    {!isFromMobile ? <GridCell span="1" /> : null}
                </Grid>

                <Grid className="second-view-line">
                    <GridCell span="1" />
                    <GridCell span="4">
                        <ImageCDN
                            className="screen-shot1"
                            filename="mTXrTns9Sf2MJwsMn4FV"
                            alt="Capture d'écran"
                        />
                    </GridCell>
                    <GridCell span="1" />
                    <GridCell span="5">
                        <Typography tag="h2" use="headline5" theme="text-primary-on-background">
                            Une carte intéractive
                        </Typography>
                        <Typography tag="p" use="body1" theme="tex-primary-on-background">
                            Un contenu simple et rapidement accessible. Vous serez surpris de voir
                            tout ce qu’il se passe dans votre ville en naviguant au hasard sur la
                            carte.
                        </Typography>
                    </GridCell>
                </Grid>
                <Grid className="third-view-line">
                    <GridCell span="1" />
                    <GridCell span="4">
                        <section>
                            <ImageCDN filename="iMTfeaOyS0iReA0OLhGN" alt="Calendrier" />
                            <ImageCDN filename="QXg7dCRhQbiEi4iRGSDz" alt="Mur" />
                            <ImageCDN filename="a4e3l7JbSOOw05HNK5DN" alt="Travaux" />
                            <ImageCDN filename="uNBPerZcTWORohX7wtyg" alt="Accident" />
                            <ImageCDN filename="eiHWi2RQrmYiTR8zJhLO" alt="Handicapé" />
                            <ImageCDN filename="mv3vE6K6T5qWiu3Syu7r" alt="Dégradation" />
                        </section>
                    </GridCell>
                    <GridCell span="1" />
                    <GridCell span="5">
                        <Typography tag="h2" use="headline5" theme="text-primary-on-background">
                            {"Créer des points d'interets"}
                        </Typography>
                        <Typography tag="p" use="body1" theme="tex-primary-on-background">
                            {`Signalez sur la carte des points d'interets, créer un espace de communication
                    avec les habitants de votre ville et ne manquez plus aucun évenements.`}
                        </Typography>
                    </GridCell>
                </Grid>
                <Grid className="fourth-view-line">
                    <GridCell span="1" />
                    <GridCell span="4">
                        <section>
                            <ImageCDN filename="V0dsh7ZRSr2IIdhICY1T" alt="Blazon-Martignas" />
                        </section>
                    </GridCell>
                    <GridCell span="1" />
                    <GridCell span="5">
                        <Typography tag="h2" use="headline5" theme="text-primary-on-background">
                            Un homme averti en vaut deux
                        </Typography>
                        <Typography tag="p" use="body1" theme="text-primary-on-background">
                            <span className="organization-title">MoncoeurdeVille.fr</span>{' '}
                            {"ouvrira d'abord à "}
                            <span className="organization-title">Martignas-sur-Jalle</span>
                            {', vous serez prévenu en avant première.'}
                        </Typography>
                        <form className="lead-form">
                            <div>
                                <input
                                    onChange={this.emailInputOnChange}
                                    type="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                />
                                <button type="button" onClick={this.submitLead}>
                                    Envoyer
                                </button>
                            </div>
                            {this.state.errorEmail ? (
                                <TextFieldValidationMessages
                                    messages={["Cette adresse n'est pas valide"]}
                                />
                            ) : null}
                        </form>
                    </GridCell>
                </Grid>
            </section>
        );
    }
}

Home.propTypes = {
    isFromMobile: PropTypes.bool.isRequired,
    submitLead: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isFromMobile: visitorComeFromMobile(state),
});

const mapDispatchToProps = dispatch => ({
    submitLead: email => {
        dispatch(actions.submitLead(email));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);
