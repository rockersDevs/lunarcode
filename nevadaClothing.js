const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const claim = require('../commands/claim');

module.exports = {
  name: 'nevadaclothing',
  description: 'Nevada Clothing',
  async execute(message, args) {
      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
          return message.reply({ content: 'You need Administrator permissions to use this command.' });
    }

    const embeds = [

      new EmbedBuilder()
      .setColor('ffbd59')
      .setImage('https://media.discordapp.net/attachments/1348162133526974576/1348162197494300683/lunarshowcase1.webp?ex=67ce7563&is=67cd23e3&hm=b25efbc893ae81f6c45a6403d6593d013a85931862833f70384b86abe0a718ee&=&format=webp&width=690&height=486'), 
      
      new EmbedBuilder()
      .setColor('ffbd59')
      .setDescription(`
**This pack includes 3 highly detailed and realistic Nevada State Patrol Uniforms. Once purchased, please open a claim ticket, and await help!**

Pack Includes:

• Class A
• Class B
• Class C
• Pants

*Designer:* <@1320136837330899074>
**Price: 400**
[Click Here](https://www.roblox.com/catalog/95298517910494)
`)
      .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67ce6c1a&is=67cd1a9a&hm=4444b443ddebe52a60caf4383cdea4ad0bff7f0f7998112c671b099884ee694f&=&format=webp&quality=lossless&width=585&height=44')
    ]

      const claimButton = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
        .setCustomId('claim_package')
        .setLabel('Claim')
        .setStyle(ButtonStyle.Secondary)
        )

    await message.channel.send({ embeds, components: [claimButton] });

    const sentReply = await message.reply({ content: 'Nevada Clothing sent!' });
    setTimeout(() => sentReply.delete(), 1000);
  }
}