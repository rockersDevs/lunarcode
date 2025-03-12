const { SlashCommandBuilder } = require('discord.js');

// Define the command using SlashCommandBuilder
module.exports = {
    data: new SlashCommandBuilder()
        .setName('group')
        .setDescription('Send the Roblox group link'),

    async execute(interaction) {
        // Execute the command, reply with the Roblox group link
        await interaction.reply('Here is the Roblox group: **https://www.roblox.com/communities/35657999/lunar-I-ER-LC#!/store**');
    }
};
