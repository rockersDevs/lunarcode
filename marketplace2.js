const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
  name: 'store',
  description: 'Send the marketplace embed',
   async execute(message, args) {
      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
          return message.reply({ content: 'You need Administrator permissions to use this command.' });
      }

      const embeds = [
        new EmbedBuilder()
        .setColor(0x2b2d31)
        .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342536677251485807/lunar_Marketplace_Banner.png?ex=67c72d36&is=67c5dbb6&hm=0074cbad90e2f56ccc19bd2bb94f3d7f7a8d2e23d9926403c7bb34d54ed66e30&=&format=webp&quality=lossless&width=769&height=231'),

        new EmbedBuilder()
        .setColor(0x2b2d31)
        .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67c72bda&is=67c5da5a&hm=61c10378026f2b83e9c63aee5ba6f8f165fb413424eff89a7f2b9e42a7a992a5&=&format=webp&quality=lossless&width=585&height=44')
        .setDescription('Welcome to **Liberty Designs** marketplace! Here you can find all of the marketplace services we offer. Once a purchase is made, head to <#1342574864317546497>, and open a management ticket.\n All purchases must be claimed within 7 days\nWe have the right to refuse service!')
      ]

      const storeRow = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
        .setCustomId('store')
        .setPlaceholder('Choose an option')
        .addOptions([
          { label: 'Advertisements', value: 'advertisements', emoji: '<:Megaphone:1342669701662245014>' },
          { label: 'Perks', value: 'lunar+', emoji: '<:Star:1342577749512163379>' },
          { label: 'Donations', value: 'donate', emoji: '<:Money:1344141736431325245>' },
          { label: 'Liberty +', value: 'perks', emoji: '<:lunar:1342707486083518474>' }
        ])
      )
      await message.channel.send({ embeds, components: [storeRow] });

      const sentReply = await message.reply({ content: 'Marketplace sent!' });
      setTimeout(() => sentReply.delete(), 5000);
   }
}