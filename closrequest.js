const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// Replace with actual role ID
const roleId = '1348807013983060079';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('closerequest')
    .setDescription('Close or claim a ticket request')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('User to ping')
        .setRequired(true)
    ),

  async execute(interaction) {
    const member = interaction.guild.members.cache.get(interaction.user.id);

    // Check if the member has the correct role
    if (!member || !member.roles.cache.has(roleId)) {
      await interaction.reply({
        content: 'You cannot claim tickets because you do not have the correct role!',
        ephemeral: true
      });
      return;
    }

    // Retrieve the user to ping from the slash command options
    const user = interaction.options.getUser('user');

    // Create the 'Yes' button
    const yesButton = new ButtonBuilder()
      .setStyle(ButtonStyle.Danger)
      .setCustomId('yes_button')
      .setLabel('Yes');

    // Create the embed message
    const embed = new EmbedBuilder()
      .setColor('ffbd59')
      .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png')
      .setDescription(
        'This ticket has been requested to be closed. Please state yes if you\'re fine with it being closed. If no, please state the reason, and how we can help you!'
      );

    // Send the embed message with the 'Yes' button
    try {
      const sentMessage = await interaction.reply({
        embeds: [embed],
        content: user ? `<@${user.id}>` : undefined // Mention the user if provided
      });

      // Set up a listener for the button interaction
      const filter = (i) => i.user.id === interaction.user.id;  // Only allow the user who executed the command to interact

      // Listen for button interactions
      const collector = sentMessage.createMessageComponentCollector({ filter }); // No time limit set

      collector.on('collect', async (buttonInteraction) => {
        if (buttonInteraction.customId === 'yes_button') {
          const closeEmbed = new EmbedBuilder()
            .setColor('ffbd59')
            .setDescription(`The ticket has been accepted to be closed. Please close the ticket!`)
            .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png');
          
          await buttonInteraction.update({
            embeds: [closeEmbed],
            components: [], // Optionally, remove the button after a response
          });

          // Do not delete the original message
        }

        // Stop the collector after the button is clicked
        collector.stop();
      });

    } catch (error) {
      console.error('Error sending the response:', error);
      await interaction.reply({
        content: 'There was an error while processing your request. Please try again later.',
        ephemeral: true
      });
    }
  }
};
