const { execute } = require("./datacreate");

module.exports = {
    name: 'clear',
    aliases: ['cls'],
    execute: () => {
        console.clear();
    }
};
