// /functions/handleCommands.js
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const path = require('path');

const clientId = '1342722024610463805'; // Your bot's client ID

module.exports = async (client, commandFolders, commandsPath) => {
    client.commandArray = []; // Will store all commands for registration

    for (const folder of commandFolders) {
        const folderPath = path.join(commandsPath, folder);

        // Check if it's a directory
        const stat = fs.statSync(folderPath);
        if (stat.isDirectory()) {
            const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const commandPath = path.join(folderPath, file);
                try {
                    const command = require(commandPath);
                    if (command.data && typeof command.data.toJSON === 'function') {
                        client.commands.set(command.data.name, command);
                        client.commandArray.push(command.data.toJSON()); // Push command data for registration
                        console.log(`Loaded command: ${command.data.name}`);
                    } else {
                        console.warn(`Skipping invalid command file: ${commandPath}`);
                    }
                } catch (err) {
                    console.error(`Error loading command from ${commandPath}:`, err);
                }
            }
        } else {
            // If it's a file directly (like group.js), load it directly
            if (folder.endsWith('.js')) {
                const commandPath = folderPath;
                try {
                    const command = require(commandPath);
                    if (command.data && typeof command.data.toJSON === 'function') {
                        client.commands.set(command.data.name, command);
                        client.commandArray.push(command.data.toJSON()); // Push command data for registration
                        console.log(`Loaded command: ${command.data.name}`);
                    } else {
                        console.warn(`Skipping invalid command file: ${commandPath}`);
                    }
                } catch (err) {
                    console.error(`Error loading command from ${commandPath}:`, err);
                }
            }
        }
    }

    const rest = new REST({ version: '9' }).setToken(process.env.token);

    try {
        console.log('Started refreshing application (/) commands.');

        // Register slash commands globally
        await rest.put(
            Routes.applicationCommands(clientId),
            {
                body: client.commandArray,
            }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error registering application (/) commands:', error);
    }
};
