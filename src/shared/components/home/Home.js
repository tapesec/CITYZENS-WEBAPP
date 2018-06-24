import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from 'rmwc/Typography';
import { Grid, GridCell } from 'rmwc/Grid';
import { Ripple } from 'rmwc/Ripple';
import { visitorComeFromMobile } from '../../reducers/visitor';
import ImageCDN from './../lib/ImageCDN';

import './Home.scss';

const Home = ({ isFromMobile }) => (
    <section className="layout">
        <Grid className="first-view-line">
            {!isFromMobile ? <GridCell span="1" /> : null}
            <GridCell phone="12" span="5">
                <div className="logo-map">
                    <ImageCDN
                        className="logo"
                        filename="TlFeYNnVSSOsm4TT6h6v"
                        alt="Logo de Cityzens"
                    />
                    <ImageCDN
                        className="blazon"
                        filename="q1EgV7WYS8aD2L1DYXbk"
                        alt="Blazon de la ville de Martignas"
                    />
                </div>
            </GridCell>
            <GridCell span="5">
                <section className="punchline">
                    <Typography tag="h1" theme="text-primary-on-background">
                        CITYZENS
                    </Typography>
                    <Typography tag="span" use="headline5" theme="text-primary-on-background">
                        Le réseau social de votre ville
                    </Typography>
                    <Typography tag="p" use="body1" theme="tex-primary-on-background">
                        Cityzens est un réseau social intéractif vous permettant de suivre toutes
                        les informations de votre ville.
                    </Typography>
                    <Typography tag="p" use="body1" theme="tex-primary-on-background">
                        Connectez-vous à Martignas et ne manquez aucun évenements
                    </Typography>
                    <div className="signin-call-to-action">
                        <Ripple primary>
                            <Typography
                                tag="a"
                                className="signin"
                                href="/login"
                                use={isFromMobile ? 'caption' : 'body1'}
                                theme="text-primary-on-secondary">
                                DEVENEZ UN CITYZEN
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
                    </div>
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
                    filename="C9SSLXJVQSiOatN9svqR"
                    alt="Capture d'écran"
                />
            </GridCell>
            <GridCell span="1" />
            <GridCell span="5">
                <Typography tag="h2" use="headline5" theme="text-primary-on-background">
                    Une carte intéractive
                </Typography>
                <Typography tag="p" use="body1" theme="tex-primary-on-background">
                    Un contenu simple et rapidement accessible. Vous serez surpris de voir tout ce
                    qu’il se passe dans votre ville en naviguant au hasard sur la carte.
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
    </section>
);

Home.propTypes = {
    isFromMobile: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    isFromMobile: visitorComeFromMobile(state),
});

export default connect(mapStateToProps)(Home);
