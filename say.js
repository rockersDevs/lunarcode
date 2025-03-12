const { SlashCommandBuilder } = require('discord.js');

const executiveRoleId = '1348800254245470329'; 

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Make the bot say something')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('The message for the bot to say')
        .setRequired(true)),

  async execute(interaction) {
    try {
      // Get the member object from the interaction
      const member = interaction.guild.members.cache.get(interaction.user.id);

      // Check if the user has the executive role
      if (member && member.roles.cache.has(executiveRoleId)) {
        const message = interaction.options.getString('message'); // Get the input message

        // Send the message to the current channel
        await interaction.channel.send(message);

        // Acknowledge the interaction
        await interaction.reply({
          content: `The message has been sent: "${message}"`,
          ephemeral: true,  // Sends the reply privately to the user
        });
      } else {
        // If the user doesn't have the executive role, send an error reply
        await interaction.reply({
          content: 'You do not have the required role to use this command.',
          ephemeral: true,  // Send privately to the user
        });
      }
    } catch (error) {
      await interaction.reply({
        content: 'There was an error processing your request.',
        ephemeral: true,
      });
    }
  },
};
