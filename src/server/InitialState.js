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
            componentsState: {
                leftSideMenu: {
                    open: true,
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
                    contentIsLoading: false,
                    networkError: false,
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
                hotspot: {}
            },
            form: {}
        };
    }

    async defaultState(req, res, next) {
        if (req.params && req.params.citySlug) {
            try {
                const dataTree = { ...InitialState.dataTree() };
                const city = await this.citiesService.getCity(req.params.citySlug);
                const hotspots = await this.hotspotsService.getPublicHotspots({
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
                next(error);
                return Promise.reject(error);
            }
        } else {
            next(new Error('Invalid request parameter'));
            return Promise.reject();
        }
    }

    async readHotspot(req, res, next) {
        if (req.params && req.params.hotspotSlug) {
            try {
                const { hotspotSlug } = req.params;
                const hotspot = getHotspotBySlug(req.initialState, hotspotSlug);
                const messages = await this.messagesService.getMessages(hotspot.id);
                req.initialState.messages = messages;
                req.initialState.componentsState.hotspotModal.open = true;
                req.initialState.componentsState.hotspotModal.currentHotspotSlug =
                    req.params.hotspotSlug;
                next();
            } catch (error) {
                next(error);
            }
        } else {
            next('Invalid request parameter');
        }
    }
}

export default InitialState;
