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

    const previousLastConnection = config.lastConnection;

    if (args.shouldSet) {
        await setLastConnection.execute();
    }

    return { lastConnection: previousLastConnection };
};

module.exports = {
    name: 'getlastconnection',
    execute: getlastconnection,
};
