const readline = require('readline'); 
const handleCommand = require('./commandHandler');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt() {
  rl.question('Enter your command: ', async (command) => {
    await handleCommand(command, rl);
    prompt();
  });
}

prompt();
