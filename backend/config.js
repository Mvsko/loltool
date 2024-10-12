const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const championsFilePath = path.join(__dirname, 'data', 'lol_champions.json');

function getRandomChampion() {
    const data = fs.readFileSync(championsFilePath);
    const champions = JSON.parse(data).champions;

    const randomIndex = Math.floor(Math.random() * champions.length);
    console.log(`Selected champion: ${champions[randomIndex]}`);
    return champions[randomIndex];
}

function runDataCreate() {
    const randomChampion = getRandomChampion();
    const command = `node addon/datacreate.js "${randomChampion}"`;

    console.log(`Executing command: ${command}`);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`Champion processed: ${randomChampion}`);
        console.log(`stdout: ${stdout}`);
    });
}

runDataCreate();
