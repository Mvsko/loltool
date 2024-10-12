const axios = require('axios');
const cheerio = require('cheerio');

const getPatchNotes = async () => {
  const url = 'https://www.leagueoflegends.com/fr-fr/news/tags/patch-notes/';

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const patchNotes = [];

    $('.article-card .article-card__title').each((index, element) => {
      const title = $(element).text().trim();

      if (title.includes('Notes de patch')) {
        const lastWord = title.split(' ').pop();
        patchNotes.push(lastWord);
      }

      if (patchNotes.length === 3) {
        return false;
      }
    });

    if (patchNotes.length === 0) {
      return { error: 'No patch notes found' };
    }

    return patchNotes;
  } catch (error) {
    console.error('Error fetching patch notes:', error);
    return { error: 'Failed to fetch patch notes' };
  }
};

module.exports = {
  name: 'getpatchnotes',
  execute: getPatchNotes,
};
