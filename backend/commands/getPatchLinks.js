const getPatchNotes = require('./getPatchNotes');
const getPatchTimelapse = require('../utils/getPatchTimelapse');

const getPatchLinks = async () => {
    const patches = await getPatchNotes.execute();
  
    if (patches.error) {
        return patches;
    }

    const patchLinks = await Promise.all(patches.map(async (patch) => {
        const [x1, x2] = patch.split('-');
        const link = `https://www.leagueoflegends.com/fr-fr/news/game-updates/patch-${x1}-${x2}-notes/`;
        
        const timeElapsed = await getPatchTimelapse(link);

        return [link, patch, timeElapsed];
    }));

    return patchLinks;
};

module.exports = {
    name: 'getpatchlinks',
    execute: getPatchLinks,
};
