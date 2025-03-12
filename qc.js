const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { execute } = require('./review');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('qualitycontrol')
  .setDescription('Submit a quality control review')
  .addStringOption(option =>
    option.setName('designer')
      .setDescription('Your username')
      .setRequired(true)
  )
  .addStringOption(option =>
    option.setName('product')
      .setDescription('The product you made.')
      .setRequired(true)
  )
  .addAttachmentOption(option =>
    option.setName('image')
      .setDescription('The image of the product.')
      .setRequired(true)
  ),

  async execute(interaction) {
    const requiredroleId = '1348802121583034398';

    const member = interaction.member

    if (!member.roles.cache.has(requiredroleId)) {
      return interaction.reply({
        content: 'Sorry, you cant submit a quality control review!',
        ephemeral: true,
      });
    }

    const designer = interaction.options.getString('designer');
    const product = interaction.options.getString('product');
    const image = interaction.options.getAttachment('image');

    const qcEmbed = new EmbedBuilder()
    .setColor(0x2b2d31)
    .setDescription('Please review the quality control submission!')
    .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67b9fcda&is=67b8ab5a&hm=608513e03261c8d4c4cef09ea84f120e9371eaca8fd52125411feedbbaa0c1a9&=&format=webp&quality=lossless&width=585&height=44')
    .addFields(
      { name: 'Designer', value: designer, inline: true },
      { name: 'Product', value: product, inline: true },
    );

    const channelId = '1348806426876973129'

    try {
      const channel = await interaction.client.channels.fetch(channelId)

      await channel.send({
        content: `<@&1348802365158981754>, a new Quality Control has been submitted!`,
        embeds: [qcEmbed],
        files: [image]
      });
      await interaction.reply({
        content: 'Your quality control has been submitted',
        ephemeral: true,
      });
    } catch (error) {
      console.error('Error sending embed',  error);
      await interaction.reply({
        content: 'Error submitting this quality control request!',
        ephemeral: true
      })
      
    }
  }
}