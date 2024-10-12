const fs = require('fs');
const path = require('path');

async function handleCommand(command, args = {}) {
    const commandName = command.trim();
    const commandsDir = path.join(__dirname, 'commands');

    if (fs.existsSync(commandsDir)) {
        const files = fs.readdirSync(commandsDir);

        for (const file of files) {
            if (file.endsWith('.js')) {
                const commandModule = require(path.join(commandsDir, file));

                if (commandModule.name === commandName || 
                    (commandModule.aliases && commandModule.aliases.includes(commandName))) {
                    console.log(`Executing command: ${commandName}...`);
                    const result = await commandModule.execute(args);
                    return result;
                }
            }
        }
    }

    return 'Unknown command. Please try again.';
}

module.exports = handleCommand;
