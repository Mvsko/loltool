const fs = require('fs');
const path = require('path');

const configFilePath = path.join(__dirname, '../data/config.json');

const setLastConnection = () => {
    if (!fs.existsSync(configFilePath)) {
        return { error: 'Config file not found.' };
    }

    const data = fs.readFileSync(configFilePath);
    const config = JSON.parse(data);

    config.lastConnection = new Date().toISOString();

    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));

    return { lastConnection: config.lastConnection };
};

module.exports = {
    name: 'setLastConnection',
    execute: setLastConnection,
};
