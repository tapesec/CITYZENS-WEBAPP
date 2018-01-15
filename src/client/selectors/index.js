import { getHits } from './../../shared/reducers/algolia'

const getHotspotsForSearchList = (state) => {
    if (getHits(state) && getHits(state).length > 0) {
        return getHits(state);
    }
    return Object.values(state.hotspots);
}


export default {
    getHotspotsForSearchList
}

