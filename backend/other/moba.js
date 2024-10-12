// Deprecated webscrapping method (using mobalytics)

const axios = require('axios');

let pageData = '';

async function fetchData() {
  if (!pageData) {
    try {
      const { data } = await axios.get('https://mobalytics.gg/lol/champions/tahmkench/build/top');
      pageData = data;
      console.log('Page data fetched successfully');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

function getMostPopularWinRate() {
  if (pageData) {
    const mostPopularMatch = pageData.match(/Most Popular[\s\S]*?([0-9.]+%)<\/span>/);
    if (mostPopularMatch && mostPopularMatch[1]) {
      return mostPopularMatch[1];
    }
  }
  return 'Most popular win rate not found';
}

function getSecondMostPopularWinRate() {
  if (pageData) {
    const secondMostPopularMatch = pageData.match(/2nd Most Popular[\s\S]*?([0-9.]+%)<\/span>/);
    if (secondMostPopularMatch && secondMostPopularMatch[1]) {
      return secondMostPopularMatch[1];
    }
  }
  return '2nd most popular win rate not found';
}

function getAlternativeWinRate() {
  if (pageData) {
    const alternativeMatch = pageData.match(/Alternative[\s\S]*?([0-9.]+%)<\/span>/);
    if (alternativeMatch && alternativeMatch[1]) {
      return alternativeMatch[1];
    }
  }
  return 'Alternative win rate not found';
}

function getOffMetaWinRate() {
  if (pageData) {
    const offMetaMatch = pageData.match(/Off-Meta[\s\S]*?([0-9.]+%)<\/span>/);
    if (offMetaMatch && offMetaMatch[1]) {
      return offMetaMatch[1];
    }
  }
  return 'Off-meta win rate not found';
}

async function main() {
  await fetchData();
  console.log('Most Popular Win Rate:', getMostPopularWinRate());
  console.log('2nd Most Popular Win Rate:', getSecondMostPopularWinRate());
  console.log('Alternative Win Rate:', getAlternativeWinRate());
  console.log('Off-meta Win Rate:', getOffMetaWinRate());
}

main();
