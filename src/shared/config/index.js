const mapApiKey = process.env.GOOGLE_MAP_API_KEY;
const algoliaApplicationId = process.env.ALGOLIA_APPLICATION_ID;
const algoliaSearchApiKey = process.env.ALGOLIA_SEARCH_API_KEY;
const algoliaHotspotsIndex = process.env.ALGOLIA_HOTSPOTS_INDEX;
const cityzensApiBaseUrl = process.env.API_URL;
const fileStackApiKey = process.env.FILE_STACK_API_KEY;
const fileStackBaseContentUrl = process.env.FILE_STACK_CONTENT_BASE_URL;

export default {
    google: {
        mapApiKey,
    },
    algolia: {
        algoliaApplicationId,
        algoliaSearchApiKey,
        algoliaHotspotsIndex,
    },
    cityzensApi: {
        baseUrl: cityzensApiBaseUrl,
    },
    fileStack: {
        apiKey: fileStackApiKey,
        baseContentUrl: fileStackBaseContentUrl,
    },
};
