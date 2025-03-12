const { EmbedBuilder } = require('discord.js');

module.exports = async function orderPrices(interaction) {
  try {
      const orderpriceEmbed = new EmbedBuilder()
          .setColor(0x2b2d31)
          .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67b9fcda&is=67b8ab5a&hm=608513e03261c8d4c4cef09ea84f120e9371eaca8fd52125411feedbbaa0c1a9&=&format=webp&quality=lossless&width=585&height=44')
          .setTitle('.lunar Prices')
          .addFields(
            { name: '<:Car:1342692602583191684> Livery Services', value: '• LEO 150 + \n• Fire 200 + \n• DOT 175 + ', inline: true },
            { name: '<:Clothing:1342692047475314749> Clothing Services', value: '• Shirt 75 + \n• Pants 75 + \n• Full Set 125 + ', inline: true },
            { name: '<:ELS:1342692788717748295> ELS Services', value: '• 1 Stage 50 + \n• 3 Stages 125 + ', inline: true },
            { name: '<:Palatte:1342662723821109258> Graphic Services', value: '• Logo 150 + \n• Banner 100 + \n• Server Pack 400 + ', inline: true },
            { name: '<:Discord:1342692973837811792> Discord Services', value: '• Embeds 75 + \n• Full servers 500 + \n • Server Pack 700 +\n • Bots 500 +\n• Commands 150 + ', inline: true },
            { name: '<:Bot:1346686609004695635> Bot Orders', value: '• Commands 150 + \n • Custom Bot 500 + '}
          )
          .setFooter({ text: 'These are base prices, if you have any questions open a support ticket!' })

      await interaction.reply({
          embeds: [orderpriceEmbed], 
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
