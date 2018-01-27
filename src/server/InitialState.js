class InitialState {
    constructor(hotspotsService, citiesService) {
        this.hotspotsService = hotspotsService;
        this.citiesService = citiesService;
    }

    static dataTree() {
        return {
            authorizedUser: {},
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
            },
            algolia: {
                hits: [],
                query: '',
                networkError: false,
            },
            hotspots: [],
            map: {},
            city: {},
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
                    dataTree.authorizedUser = req.user;
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

    static readHotspot(req, res, next) {
        if (req.params && req.params.hotspotSlug) {
            req.initialState.componentsState.hotspotModal.open = true;
            req.initialState.componentsState.hotspotModal.currentHotspotSlug = req.params.hotspotSlug;
            next();
        } else {
            next('Invalid request parameter');
        }
    }
}

export default InitialState;
