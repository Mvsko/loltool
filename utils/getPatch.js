const cheerio = require('cheerio');
const fetchData = require('./fetchData');

async function getPatch() {
  const pageData = await fetchData();
  if (pageData) {
    const patchMatch = pageData.match(/Patch (\d+\.\d+)/);
    if (patchMatch && patchMatch[1]) {
      return patchMatch[1] || 'Patch not found';
    }
  }
  return 'Data not available';
}

module.exports = getPatch;
