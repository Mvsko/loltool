const fs = require('fs');
const path = require('path');
const setLastConnection = require('./setLastConnection');

const configFilePath = path.join(__dirname, '../data/config.json');

const getlastconnection = async (args = {}) => {
    if (!fs.existsSync(configFilePath)) {
        return { error: 'Config file not found.' };
    }

    const data = fs.readFileSync(configFilePath);
    const config = JSON.parse(data);

    if (args.shouldSet) {
        await setLastConnection.execute();
    }

    return { lastConnection: config.lastConnection };
};

module.exports = {
    name: 'getlastconnection',
    execute: getlastconnection,
};
