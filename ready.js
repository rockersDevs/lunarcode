const { ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const mongoURL = process.env.mongoURL;
const figlet = require('figlet');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        // Ensure client is fully ready before setting status
        if (!client.user) {
            console.log("Bot is not logged in correctly.");
            return;
        }

        try {
            // Set the bot's status to Do Not Disturb (DND)
            await client.user.setStatus('dnd');
            console.log('Bot status set to Do Not Disturb (DND)');

            // Get the first guild the bot is in (you can loop through all guilds if needed)
            const guild = client.guilds.cache.first();

            if (guild) {
                // Retrieve the member count of the guild
                const memberCount = guild.memberCount;

                // Set the custom activity with the member count
                client.user.setActivity(`${memberCount} members in .lunar!`, { type: ActivityType.Watching });
                console.log('Bot activity set to: Watching ' + `${memberCount} members in lunar!`);
            } else {
                console.log("No guilds found!");
            }

            // Run the figlet ASCII art
            figlet('.lunar!', (err, data) => {
                if (err) {
                    console.log('Something went wrong with figlet...');
                    console.dir(err);
                    return;
                }
                console.log(data);
            });

        } catch (error) {
            console.log("Error setting status or activity: ", error);
        }

        console.log('Ready!');
    },
};
