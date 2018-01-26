class InitialState {
    constructor(hotspotsService, citiesService) {
        this.hotspotsService = hotspotsService;
        this.citiesService = citiesService;
        this.dataTree = {
            authorizedUser: {},
            componentsState: {
                leftSideMenu: {
                    open: true,
                },
                map: {
                    markerTooltip: {},
                },
                hotspotModal: {
                    open: true,
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
                const city = await this.citiesService.getCity(req.params.citySlug);
                const hotspots = await this.hotspotsService.getPublicHotspots({
                    insee: city.insee,
                });
                if (req.user) {
                    this.dataTree.authorizedUser = req.user;
                }
                this.dataTree.city = city;
                this.dataTree.map.center = {
                    lat: city.position2D.latitude,
                    lng: city.position2D.longitude,
                };
                this.dataTree.hotspots = hotspots;
                req.initialState = this.dataTree;
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
}

export default InitialState;
