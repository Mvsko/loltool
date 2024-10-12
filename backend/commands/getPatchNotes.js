const axios = require('axios');

const getpatchnotes = async () => {
  const url = 'https://ddragon.leagueoflegends.com/api/versions.json';

  try {
    const response = await axios.get(url);
    const versions = response.data;
    const lastThreePatches = versions.slice(0, 3).map(version => version.split('.').slice(0, 2).join('.').replace('.','-'));

    if (lastThreePatches.length === 0) {
      return { error: 'No patch notes found' };
    }

    return lastThreePatches;
  } catch (error) {
    console.error('Error fetching the latest patch:', error);
    return { error: 'Failed to fetch the latest patch version' };
  }
};

module.exports = {
  name: 'getpatchnotes',
  execute: getpatchnotes,
};
