const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'easter',
  description: 'Easter 25',
  async execute(message, args) {
      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
          return message.reply({ content: 'You need Administrator permissions to use this command.' });
    }

    const embeds = [
      new EmbedBuilder()
      .setColor(0x2b2d31)
      .setImage('https://media.discordapp.net/attachments/1342507182624735296/1347798709798436986/easter251.png?ex=67cd22dd&is=67cbd15d&hm=36228bf3492a44cad2c51a4c6e01eb561c33af56caaa4908f47989d2593b5e29&=&format=webp&quality=lossless&width=1800&height=540'),
   
      new EmbedBuilder()
      .setColor(0x2b2d31)
      .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67cc71da&is=67cb205a&hm=f2d8306f24830d31f45333bd0ea86218fc18f17949b7be100c8b5eb5796b4b63&=&format=webp&quality=lossless&width=585&height=44')
      .setDescription(`
**Day 1:**
<:Paint:1347799897029480448> | [.paint](https://discord.gg/xgvU6gYbnt)
Prize: 1000 Robux
Days: 2

**Open a ticket to join this event. Must have 50 + members!**
**.lunar** - https://discord.gg/hZ3zXmntPA`)
    ]

    await message.channel.send({ embeds });

    const sentReply = await message.reply({ content: 'Easter Event sent!' });
    setTimeout(() => sentReply.delete(), 1000);
  }
}