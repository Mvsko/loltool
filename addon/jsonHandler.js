const fs = require('fs');
const path = require('path');

const championsFilePath = path.join(__dirname, '../data/champions.json');

const readChampionsData = () => {
    if (fs.existsSync(championsFilePath)) {
        const data = fs.readFileSync(championsFilePath);
        return JSON.parse(data);
    }
    return [];
};

const writeChampionsData = (champions) => {
    fs.writeFileSync(championsFilePath, JSON.stringify(champions, null, 2));
};

const updateChampionData = (championName, championData) => {
    const champions = readChampionsData();
    const existingChampionIndex = champions.findIndex(champion => champion.name === championName);

    if (existingChampionIndex >= 0) {
        champions[existingChampionIndex] = championData;
    } else {
        champions.push(championData);
    }

    writeChampionsData(champions);
};

module.exports = {
    readChampionsData,
    writeChampionsData,
    updateChampionData,
};
