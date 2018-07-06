const getHotspotBySlug = (state, slug) =>
    Object.values(state.hotspots)
        .filter(hotspot => hotspot.slug === slug)
        .pop();

class InitialState {
    constructor(hotspotsService, citiesService, messagesService) {
        this.hotspotsService = hotspotsService;
        this.citiesService = citiesService;
        this.messagesService = messagesService;
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
        };
    }

    async defaultState(req, res, next) {
        const dataTree = { ...InitialState.dataTree() };
        dataTree.visitor.fromMobile = req.useragent.isMobile;
        dataTree.componentsState.leftSideMenu.open = !req.useragent.isMobile; // leftSideMenu must be open default when desktop user agent
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
                if (req.user) {
                    dataTree.authenticatedCityzen = req.user;
                }
                dataTree.city = city;
                dataTree.map.center = {
                    lat: city.position2D.latitude,
                    lng: city.position2D.longitude,
                };
                dataTree.hotspots = hotspots;
                req.initialState = dataTree;
                next();
                return Promise.resolve();
            } catch (error) {
                return next(error);
            }
        } else {
            req.initialState = dataTree;
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
                return next(error);
            }
        } else {
            return next('Invalid request parameter');
        }
    }
}

export default InitialState;
