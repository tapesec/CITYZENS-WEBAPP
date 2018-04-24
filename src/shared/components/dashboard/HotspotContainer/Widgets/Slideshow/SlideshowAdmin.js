import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'rmwc/Typography';
import { Grid, GridCell } from 'rmwc/Grid';
import { Button } from 'rmwc/Button';
import ReactFilestack from 'filestack-react';
import CustomScroll from 'react-custom-scroll';
import { connect } from 'react-redux';
import actions from '../../../../../../client/actions';
import ImageCDN from '../../../../lib/ImageCDN';
import config from '../../../../../config';
import ActionsToolbar from '../../Toolbar/ActionsToolbar';
import { componentIsLoading } from '../../../../../reducers/componentsState';

import './SlideshowAdmin.scss';

const SlideshowAdmin = ({
    hotspotId,
    imagesId,
    saveSlideshowWidget,
    storageFolder,
    isRemovingImage,
}) => {
    const getImageUploaderOptions = () => ({
        fromSources: ['local_file_system', 'url', 'webcam'],
        accept: ['image/*', '.pdf'],
        maxSize: 100000,
        maxFiles: 5,
        minFiles: 1,
        lang: 'fr',
        storeTo: { path: `/${storageFolder}/` },
        transformations: {
            rotate: true,
            crop: {
                force: true,
                aspectRatio: 2.39 / 1,
            },
        },
    });

    const deleteImage = imageId => () => {
        const newSlideshow = imagesId.filter(currentImageId => currentImageId !== imageId);
        saveSlideshowWidget(hotspotId, newSlideshow);
    };
    return (
        <Fragment>
            <ActionsToolbar />
            <section className="HotspotContent">
                <CustomScroll heightRelativeToParent="100%">
                    <Typography tag="h1" theme="text-secondary-on-background" use="display1">
                        {"Configurez votre carousel d'image"}
                    </Typography>
                    <ReactFilestack
                        apikey={config.fileStack.apiKey}
                        security={config.fileStack.security}
                        buttonText="Ajoutez une photo au carousel d'image"
                        buttonClass="classname"
                        options={getImageUploaderOptions()}
                        onSuccess={result => {
                            const newImagesId = [
                                ...imagesId,
                                ...result.filesUploaded.map(file => file.handle),
                            ];
                            saveSlideshowWidget(hotspotId, newImagesId);
                        }}
                        render={({ onPick }) => (
                            <Button
                                raised
                                onClick={onPick}
                                style={{ marginTop: '20px' }}
                                theme="secondary-bg text-primary-on-secondary">
                                Cliquez ici pour ajouter des images à votre diaporama
                            </Button>
                        )}
                    />
                    <section className="pictures-list">
                        <Typography tag="h2" theme="text-secondary-on-background" use="headline">
                            {'Liste des images de votre diaporama'}
                        </Typography>
                        <Grid>
                            {imagesId.map(imageId => (
                                <GridCell span="4" key={imageId}>
                                    <ImageCDN
                                        filename={imageId}
                                        style={{ width: '100%' }}
                                        alt="Image du diaporama"
                                        iconAction="delete_forever"
                                        onClick={deleteImage(imageId)}
                                        loading={isRemovingImage}
                                    />
                                </GridCell>
                            ))}
                        </Grid>
                        {imagesId.length === 0 ? (
                            <Typography
                                tag="p"
                                theme="text-secondary-on-background"
                                use="subheading2">
                                {
                                    "Il n'y a encore aucune image dans le diaporama, cliquez sur le bouton au dessus pour en ajouter"
                                }
                            </Typography>
                        ) : (
                            ''
                        )}
                    </section>
                </CustomScroll>
            </section>
        </Fragment>
    );
};

SlideshowAdmin.propTypes = {
    hotspotId: PropTypes.string.isRequired,
    imagesId: PropTypes.arrayOf(PropTypes.string),
    saveSlideshowWidget: PropTypes.func.isRequired,
    storageFolder: PropTypes.string.isRequired,
    isRemovingImage: PropTypes.bool.isRequired,
};

SlideshowAdmin.defaultProps = {
    imagesId: [],
};

const mapStateToProps = state => ({
    isRemovingImage: componentIsLoading.removingSlideshowImage(state),
});

const mapDispatchToProps = dispatch => ({
    saveSlideshowWidget: (hotspotId, picturesUrl) => {
        dispatch(actions.saveSlideshowWidget(hotspotId, picturesUrl));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SlideshowAdmin);
