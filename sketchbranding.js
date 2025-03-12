const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'sketchbranding',
  description: 'Sketch Branding',
  async execute(message, args) {
      // Check if the user has administrator permissions
      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
          return message.reply({ content: 'You need Administrator permissions to use this command.' });
      }

      const embeds = [
        new EmbedBuilder()
        .setTitle('Sketch Branding')
        .setColor(0x2b2d31)
        .setDescription(`
Sketch Studios, an all inclusive high quality design server branding pack. Listed below is what the pack includes:

• Marketplace Banner
• Showcase Banner
• Self Roles Banner
• Assistance Banner
• Services Banner
• Dashoard Banner
• 2 logo variations (Blue, white)
• Footer banner

**Price:** 500
**[Purchase Link](https://www.roblox.com/catalog/83527934470369)**
**Open a management ticket to claim!**`)

.setFooter({ text: `**If you have any questions, open a support ticket!**` })
.setImage('https://media.discordapp.net/attachments/1342574733484621846/1344499626535030875/Untitled_design_54.png?ex=67c1225a&is=67bfd0da&hm=3b1bd04a4eb094c0705fb5b4e1e58b673702dea89167e49bb1ffb18531737cc8&=&format=webp&quality=lossless&width=1399&height=420')
      ]

      await message.channel.send({ embeds });

      const sentReply = await message.reply({ content: 'Sketch Branding sent!' });
      setTimeout(() => sentReply.delete(), 5000);
  }
} 