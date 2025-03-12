const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('review')
    .setDescription('Review a designer/product')
    .addStringOption(option => 
      option.setName('designer')
        .setDescription('The designer you want to review')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('rating')
        .setDescription('Rating 1-5')
        .setRequired(true)
        .addChoices(
          { name: '1', value: '1' },
          { name: '2', value: '2' },
          { name: '3', value: '3' },
          { name: '4', value: '4' },
          { name: '5', value: '5' }))
    .addStringOption(option =>
      option.setName('product')
        .setDescription('Product for the review')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('notes')
        .setDescription('Notes on the product')
        .setRequired(true)),

  async execute(interaction) {
    try {
      const designer = interaction.options.getString('designer');
      const rating = interaction.options.getString('rating');
      const product = interaction.options.getString('product');
      const notes = interaction.options.getString('notes');
  
      const stars = '<:Star:1348806202100023378>'.repeat(Number(rating)); 
  
      const reviewEmbed = new EmbedBuilder()
        .setTitle('.lunar Reviews')
        .setColor(0x2b2d31)
        .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67b9fcda&is=67b8ab5a&hm=608513e03261c8d4c4cef09ea84f120e9371eaca8fd52125411feedbbaa0c1a9&=&format=webp&quality=lossless&width=585&height=44')
        .setDescription('**Thanks for the review!**')
        .setFooter({ text: `Review submitted by ${interaction.user.tag}` })
        .setTimestamp()
        .addFields(
          { name: 'Designer', value: designer, inline: true },
          { name: 'Rating', value: stars, inline: true }, 
          { name: 'Product', value: product, inline: true },
          { name: 'Notes', value: notes, inline: true }
        );
    
      const channelId = '1348801336027910264'; 
      const channel = await interaction.client.channels.fetch(channelId);
  
      if (!channel) {
        return interaction.reply('Could not find the review channel');
      }
  
      await channel.send({ embeds: [reviewEmbed] });
  
      await interaction.reply({ content: 'Thanks for the review!', ephemeral: true });
    } catch (error) {
      console.error('Error executing review command:', error);
      await interaction.reply({ content: 'An error occurred while processing your review.', ephemeral: true });
    }
  }
};
