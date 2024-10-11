const axios = require('axios');
const readline = require('readline');

let pageData = '';

async function fetchData() {
  if (!pageData) {
    const championName = await getChampionName();
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

function getChampionName() {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Enter the champion name: ', (answer) => {
      if (answer.trim()) {
        resolve(answer.trim());
      } else {
        console.error('Champion name cannot be empty');
        rl.close();
        reject('Champion name cannot be empty');
      }
      rl.close();
    });
  });
}

module.exports = fetchData;
