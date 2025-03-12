const { SlashCommandBuilder } = require('discord.js');

const requiredId = '1348800254245470329';  // Replace with the actual role ID

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Shows the current status for designers and support staff.'),

  async execute(interaction) {
    try {
      // Get the member object from the interaction
      const member = interaction.guild.members.cache.get(interaction.user.id);

      // Check if the user has the required role
      if (member && member.roles.cache.has(requiredId)) {
        // Get the specific channel where the status will be sent
        const targetChannel = interaction.guild.channels.cache.get('1348800401293447271');  // Replace with the actual channel ID
        
        if (targetChannel) {
          // Send the status message to the target channel
          await targetChannel.send({
            content: '**We are currently not hiring discord designers, or management. Opening a ticket about becoming one will result in closure. We are looking for every other designer, and support staff. Open a management ticket to apply. We are also looking for affiliates. Open a management ticket to affiliate with us!**',
          });
          
          // Acknowledge the slash command interaction
          await interaction.reply({
            content: 'The status message has been sent to the target channel.',
            ephemeral: true,  // This will send a private reply to the user
          });
        } else {
          await interaction.reply({
            content: 'The target channel does not exist.',
            ephemeral: true,
          });
        }
      } else {
        await interaction.reply({
          content: 'You do not have the required role to use this command.',
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error('Error handling /status command:', error);
      await interaction.reply({
        content: 'There was an error processing your request.',
        ephemeral: true,
      });
    }
  },
};
