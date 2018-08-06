import { LOGIN_ENDPOINT } from './constants';

const getHotspotBySlug = (state, slug) =>
    Object.values(state.hotspots)
        .filter(hotspot => hotspot.slug === slug)
        .pop();

class InitialState {
    constructor(hotspotsService, messagesService, citiesService, cityzensService) {
        this.hotspotsService = hotspotsService;
        this.messagesService = messagesService;
        this.citiesService = citiesService;
        this.cityzensService = cityzensService;
    }

    static dataTree() {
        return {
            authenticatedCityzen: {},
            visitor: {
                position: {},
            },
            componentsState: {
                leftSideMenu: {
                    open: false,
                },
                map: {
                    markerTooltip: {},
                },
                hotspotModal: {
                    open: false,
                    contentIsLoading: false,
                    networkError: false,
                },
                geocodeModal: {
                    open: false,
                    content: {
                        subtitle: '',
                        inputLabel: '',
                    },
                    contentIsLoading: false,
                    networkError: false,
                    geocoding: false,
                    geocodingFailed: false,
                },
                settingUpHotspotModal: {
                    open: false,
                    contentIsLoading: false,
                    networkError: false,
                },
                snackbar: {
                    visible: false,
                    level: 'info',
                    message: '',
                },
                markerPreview: {
                    enabled: false,
                },
                widget: {},
                onLoad: {
                    removingSlideshowImage: false,
                    fetchingComments: false,
                },
                hotspotTypeDescriptionModal: {
                    open: false,
                    hotspotType: '',
                },
                // overlay when user have to click in map for create new hotspot
                dropMarkerMapOverlay: {
                    visible: false,
                },
            },
            algolia: {
                hits: [],
                query: '',
                networkError: false,
            },
            hotspots: [],
            map: {},
            city: {},
            edition: {
                mode: 'TURNED_OFF',
                hotspot: {},
                message: {},
            },
            cityzens: {},
        };
    }

    async defaultState(req, res, next) {
        const dataTree = { ...InitialState.dataTree() };
        dataTree.visitor.fromMobile = req.useragent.isMobile;
        dataTree.componentsState.leftSideMenu.open = !req.useragent.isMobile; // leftSideMenu must be open default when desktop user agent
        if (req.user) {
            dataTree.authenticatedCityzen = req.user;
            try {
                const response = await this.cityzensService.getCityzen(
                    req.user.accessToken,
                    req.user.profile.id,
                );
                if (response.status >= 400) {
                    return next({ statusCode: response.status });
                }
                dataTree.authenticatedCityzen.profileFromApi = await response.json();
            } catch (error) {
                return next(
                    `defaultState, error: ${error && error.message ? error.message : error}`,
                );
            }
        }
        req.initialState = dataTree;
        return next();
    }

    async getDashboard(req, res, next) {
        req.initialState.componentsState.leftSideMenu.open = !req.useragent.isMobile; // leftSideMenu must be open default when desktop user agent
        if (req.params && req.params.citySlug) {
            try {
                const response = await this.citiesService.getCity(req.params.citySlug);
                if (response.status >= 400) {
                    return next({ statusCode: response.status });
                }
                const city = await response.json();
                const accessToken = req.user ? req.user.accessToken : undefined;
                const hotspots = await this.hotspotsService.getHotspots(accessToken, {
                    insee: city.insee,
                });

                req.initialState.city = city;
                req.initialState.map.center = {
                    lat: city.position2D.latitude,
                    lng: city.position2D.longitude,
                };
                req.initialState.hotspots = hotspots;
                next();
                return Promise.resolve();
            } catch (error) {
                return next(error);
            }
        } else {
            next();
            return Promise.resolve();
        }
    }

    async readHotspot(req, res, next) {
        if (req.params && req.params.hotspotSlug) {
            try {
                const { hotspotSlug } = req.params;
                const hotspot = getHotspotBySlug(req.initialState, hotspotSlug);
                if (!hotspot) {
                    return next({ statusCode: 404 });
                }
                const messages = await this.messagesService.getMessages(hotspot.id);
                req.initialState.messages = messages;
                req.initialState.componentsState.hotspotModal.open = true;
                req.initialState.componentsState.hotspotModal.currentHotspotSlug =
                    req.params.hotspotSlug;
                return next();
            } catch (error) {
                return next(
                    `/${req.params.citySlug}/${req.params.hotspotSlug}, error: ${
                        error && error.message ? error.message : error
                    }`,
                );
            }
        } else {
            return next('Invalid request parameter');
        }
    }

    async getProfile(req, res, next) {
        if (req.params && req.params.userId) {
            const accessToken = req.user ? req.user.accessToken : undefined;
            if (!accessToken) {
                return res.redirect(LOGIN_ENDPOINT);
            }
            try {
                const response = await this.cityzensService.getCityzen(
                    req.user.accessToken,
                    req.params.userId,
                );
                if (response.status >= 400) {
                    return next({ statusCode: response.status });
                }
                const cityzen = await response.json();
                req.initialState.cityzens[cityzen.id] = cityzen;
                return next();
            } catch (error) {
                return next(
                    `/profile/${req.params.userId}, error: ${
                        error && error.message ? error.message : error
                    }`,
                );
            }
        } else {
            return next(`Invalid request parameter for /profile/${req.params.userId}`);
        }
    }
}

export default InitialState;
