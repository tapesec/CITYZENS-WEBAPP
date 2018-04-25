import React from 'react';
import { Typography } from 'rmwc/Typography';
import { Grid, GridCell } from 'rmwc/Grid';
import { Ripple } from 'rmwc/Ripple';
import ImageCDN from './../lib/ImageCDN';

import './Home.scss';

const Home = () => (
    <section className="layout">
        <Grid className="first-view-line">
            <GridCell span="1" />
            <GridCell span="5">
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
                    <Typography tag="h1" use="display3" theme="text-primary-on-background">
                        Le réseau social de votre ville
                    </Typography>
                    <Typography tag="p" use="headline" theme="tex-primary-on-background">
                        Cityzens est un réseau social intéractif vous permettant de suivre toutes
                        les informations de votre ville.
                    </Typography>
                    <div className="signin-call-to-action">
                        <Ripple primary>
                            <Typography
                                tag="a"
                                className="signin"
                                href="/login"
                                use="headline"
                                theme="text-primary-on-secondary">
                                Devenez un Cityzen
                            </Typography>
                        </Ripple>
                        <Ripple primary>
                            <Typography
                                tag="a"
                                className="visitor"
                                href="/Martignas-sur-Jalle"
                                use="headline"
                                theme="text-primary-on-secondary">
                                Je suis un touriste
                            </Typography>
                        </Ripple>
                    </div>
                </section>
            </GridCell>
            <GridCell span="1" />
            <GridCell span="1" />
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
            <GridCell span="1" />
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
                <Typography tag="h2" use="display1" theme="text-primary-on-background">
                    Une carte intéractive
                </Typography>
                <Typography tag="p" use="headline" theme="tex-primary-on-background">
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
                    <ImageCDN filename="uiFagz6oSQiX8TTcAQAC" alt="Mur" />
                    <ImageCDN filename="a4e3l7JbSOOw05HNK5DN" alt="Travaux" />
                    <ImageCDN filename="uNBPerZcTWORohX7wtyg" alt="Accident" />
                    <ImageCDN filename="eiHWi2RQrmYiTR8zJhLO" alt="Handicapé" />
                    <ImageCDN filename="mv3vE6K6T5qWiu3Syu7r" alt="Dégradation" />
                </section>
            </GridCell>
            <GridCell span="1" />
            <GridCell span="5">
                <Typography tag="h2" use="display1" theme="text-primary-on-background">
                    Lorem ipsum dolor
                </Typography>
                <Typography tag="p" use="headline" theme="tex-primary-on-background">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur scelerisque
                    erat eget libero ullamcorper, sit amet ultrices enim consectetur. Donec
                    scelerisque nunc diam, sed suscipit enim sollicitudin ultrices.
                </Typography>
            </GridCell>
        </Grid>
    </section>
);

export default Home;
