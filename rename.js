const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js'); // Correct import for discord.js v14+

// Define an array of role IDs you want to restrict access to
const ROLE_IDS = ['1348807013983060079']; // Replace with your role IDs

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rename')
    .setDescription('Renames the channel to a new name')
    .addStringOption(option => 
      option.setName('newname')
        .setDescription('The new name for the channel')
        .setRequired(true)),

  async execute(interaction) {
    // Check if the user has at least one of the required roles
    const hasRole = ROLE_IDS.some(roleId => interaction.member.roles.cache.has(roleId));

    if (!hasRole) {
      return interaction.reply({ content: 'You do not have the required role to rename channels.', ephemeral: true });
    }

    const newChannelName = interaction.options.getString('newname');

    // Ensure the bot has permission to rename channels
    const botMember = await interaction.guild.members.fetch(interaction.client.user.id);

    // Check if the bot has either 'ADMINISTRATOR' or 'MANAGE_CHANNELS' permission
    if (!botMember.permissions.has(PermissionsBitField.Flags.Administrator) && !botMember.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      return interaction.reply({ content: 'I do not have the permission to rename channels.', ephemeral: true });
    }

    try {
      // Renaming the channel
      await interaction.channel.setName(newChannelName);
      return interaction.reply(`Channel has been renamed to **${newChannelName}**`);
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: 'There was an error renaming the channel.', ephemeral: true });
    }
  }
};
