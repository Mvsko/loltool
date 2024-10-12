const fs = require('fs');
const path = require('path');

const championsFilePath = path.join(__dirname, '../data/champions.json');

const getHighestWinrate = () => {
    if (!fs.existsSync(championsFilePath)) {
        return { error: 'Champions data file not found.' };
    }

    const data = fs.readFileSync(championsFilePath);
    const champions = JSON.parse(data);

    let highestWinrateChampion = null;

    champions.forEach(champion => {
        const matches = parseInt(champion.matches.replace(/,/g, ''), 10);
        if (matches > 500) {
            if (!highestWinrateChampion || parseFloat(champion.winRate) > parseFloat(highestWinrateChampion.winRate)) {
                highestWinrateChampion = champion;
            }
        }
    });

    if (highestWinrateChampion) {
        return highestWinrateChampion;
    } else {
        return { error: 'No champion found with more than 500 matches.' };
    }
};

module.exports = {
    name: 'gethighestwinrate',
    execute: () => {
        return getHighestWinrate();
    }
};
