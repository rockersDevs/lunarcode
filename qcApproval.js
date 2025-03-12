const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const roleID = '1348802121583034398'; // Example role ID, update as necessary

module.exports = {
  data: new SlashCommandBuilder()
    .setName('qcapproval')
    .setDescription('Let the customer know they are awaiting QC approval'),

  async execute(interaction) {
    // Check if the user has the role
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const hasRole = member && member.roles.cache.has(roleID);

    // If the user doesn't have the required role, return an error message
    if (!hasRole) {
      return interaction.reply({
        content: 'You do not have the required role to use this command.',
        ephemeral: true,
      });
    }

    // Create the embed message
    const qcapprovalEmbed = new EmbedBuilder()
      .setColor('ffbd59')
      .setDescription('Hello! This order is currently awaiting quality control approval. Once approved it will be sent for you to review. Please do not ping the designer during this process!')
      .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67c9ceda&is=67c87d5a&hm=9f9ff20d4a26c62175dbff669e27f92878c13bd142484c6b2e5964acd2b92aec&=&format=webp&quality=lossless&width=585&height=44'); // Add an image URL if you need to

    // Send the embed in the channel
    return interaction.reply({
      embeds: [qcapprovalEmbed],
    });
  }
};
