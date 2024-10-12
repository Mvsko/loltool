const axios = require('axios');

let pageData = '';

async function fetchData(championName) {
  if (!pageData) {
    const url = `https://u.gg/lol/champions/${championName}/build/`;
    
    try {
      const { data } = await axios.get(url);
      pageData = data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }
  return pageData;
}

module.exports = fetchData;
