const fs = require('fs');
const path = require('path');

const championsFilePath = path.join(__dirname, '../data/champions.json');

const getLastSearch = () => {
    if (!fs.existsSync(championsFilePath)) {
        return { error: 'Champions data file not found.' };
    }

    const data = fs.readFileSync(championsFilePath);
    const champions = JSON.parse(data);

    const lastSearches = champions.slice(-3);

    if (lastSearches.length > 0) {
        return lastSearches;
    } else {
        return { error: 'No searches found.' };
    }
};

module.exports = {
    name: 'getlastsearch',
    execute: () => {
        return getLastSearch();
    }
};
