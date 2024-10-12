const fetchData = require('../utils/fetchData');
const getRole = require('../utils/getRole');
const getWinrate = require('../utils/getWinrate');
const getPickRate = require('../utils/getPickRate');
const getTier = require('../utils/getTier');
const getRank = require('../utils/getRank');
const getBanRate = require('../utils/getBanRate');
const getMatches = require('../utils/getMatches');
const getEloSearched = require('../utils/getEloSearched');
const getPatch = require('../utils/getPatch');
const { updateChampionData } = require('../addon/jsonHandler');

const championName = process.argv[2];

if (!championName) {
    console.error('Champion name is required.');
    process.exit(1);
}

const runDataCreate = async () => {
    const pageData = await fetchData(championName);
    if (!pageData) {
        console.error('Error: Champion data could not be fetched.');
        return;
    }

    const championData = {
        name: championName,
        mainRole: await getRole(),
        tier: await getTier(),
        winRate: await getWinrate(),
        rank: await getRank(),
        pickRate: await getPickRate(),
        banRate: await getBanRate(),
        matches: await getMatches(),
        patch: await getPatch(),
        elo: await getEloSearched(),
    };

    updateChampionData(championName, championData);

    console.log('Champion data saved to champions.json');
};

runDataCreate();
