const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('suggestions')
  .setDescription('Leave a suggestion!')
  .addStringOption(option => 
    option.setName('suggestion')
    .setDescription('Suggestion')
    .setRequired(true)),
    
    async execute(interaction) {
      try {
        const suggestion = interaction.options.getString('suggestion');

        const suggestionEmbed = new EmbedBuilder()
        .setTitle('.lunar Suggestions')
        .setColor(0x2b2d31)
        .setDescription(`Suggested by: ${interaction.user.tag}`)
        .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67c72bda&is=67c5da5a&hm=61c10378026f2b83e9c63aee5ba6f8f165fb413424eff89a7f2b9e42a7a992a5&=&format=webp&quality=lossless&width=585&height=44')
        .setTimestamp()
        .addFields(
          { name: 'Suggestion', value: suggestion }
        );

        const channelId = '1348808095052206191';
        const channel = await interaction.client.channels.fetch(channelId);

        if (!channel) {
          return interaction.reply('Could not find suggestion channel!')
        }
        await channel.send({ embeds: [suggestionEmbed] });
        await interaction.reply({ content: 'Thanks for the suggestion!', ephemeral: true })
      } catch (error) {
        console.error('Error executing suggestion command:', error);
        await interaction.reply({ content: 'Error sending suggestion', ephemeral: true })
      }
    }
}