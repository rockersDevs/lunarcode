const { EmbedBuilder } = require('discord.js');

module.exports = async function orderInfo(interaction) {
  try {
      const orderinfoEmbed = new EmbedBuilder()
          .setColor(0x2b2d31)
          .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67b9fcda&is=67b8ab5a&hm=608513e03261c8d4c4cef09ea84f120e9371eaca8fd52125411feedbbaa0c1a9&=&format=webp&quality=lossless&width=585&height=44')
          .setTitle('.lunar Terms of Service')
          .setDescription('Welcome to **.lunars** ordering hub. Below are our Service Terms Of Service. Breaking these Terms, will result in being banned from the server.\n\n• No leaking/sharing\n• No reselling\n • You are allowed order changes while your ticket is open, after that no guarentees!')
      await interaction.reply({
          embeds: [orderinfoEmbed], 
          ephemeral: true, 
      });

  } catch (error) {
      console.error('Error executing the price embed', error);
      await interaction.reply({
          content: 'An error occurred while sending the price embed.',
          ephemeral: true,
      });
  }
};
