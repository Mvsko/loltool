const fs = require('fs');
const path = require('path');

async function handleCommand(command, rl) {
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
          await commandModule.execute(rl);
          return;
        }
      }
    }
  }

  console.log('Unknown command. Please try again.');
  rl.prompt();
}

module.exports = handleCommand;
