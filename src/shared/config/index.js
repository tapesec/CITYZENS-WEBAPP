const mapApiKey = process.env.GOOGLE_MAP_API_KEY;
const algoliaApplicationId = process.env.ALGOLIA_APPLICATION_ID;
const algoliaSearchApiKey = process.env.ALGOLIA_SEARCH_API_KEY;
const algoliaHotspotsIndex = process.env.ALGOLIA_HOTSPOTS_INDEX;
const cityzensApiBaseUrl = process.env.API_URL;
const fileStackApiKey = process.env.FILE_STACK_API_KEY;
const fileStackBaseContentUrl = process.env.FILE_STACK_CONTENT_BASE_URL;
const fileStackBaseProcessUrl = process.env.FILE_STACK_PROCESS_BASE_URL;
const filestackPolicy = process.env.FILE_STACK_POLICY;
const filestackSignature = process.env.FILE_STACK_SIGNATURE;
const mediaDefaultIcon = process.env.MEDIA_HOTSPOT_DEFAULT_ICON;
const infoDefaultIcon = process.env.INFO_HOTSPOT_DEFAULT_ICON;

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
        baseProcessUrl: fileStackBaseProcessUrl,
        security: {
            // expire on april 2020, all right
            policy: filestackPolicy,
            signature: filestackSignature,
        },
    },
    hotspot: {
        mediaDefaultIcon,
        infoDefaultIcon,
    },
};
