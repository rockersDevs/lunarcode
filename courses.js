const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const claim = require('../commands/claim');

module.exports = {
  name: 'courses',
  description: 'Sends courses',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return message.reply({ content: 'You need Administrator permissions to use this command.' });
    }

    const embeds = [
      new EmbedBuilder()
      .setColor(0x2b2d31)
      .setImage('https://media.discordapp.net/attachments/1342507182624735296/1346666504887992400/lunar_courses.png?ex=67c9046a&is=67c7b2ea&hm=864bc289d55f63bdc34020c36883a7348de14ea948b5d48523396199c4ca0a6b&=&format=webp&quality=lossless&width=1399&height=420'),

      new EmbedBuilder()
      .setColor(0x2b2d31)
      .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67c87d5a&is=67c72bda&hm=c0c18938226f75cd1c0d1f1502b437696d437b243a2a949989ea3e3297e069c1&=&format=webp&quality=lossless&width=585&height=44')
      .setDescription(`Welcome to **.lunar's** Courses. We offer a variety of different courses. Choose an option below to buy a course. When purchased, click the "Claim" button and provide proof!`)
    ]

    const claimButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
    .setCustomId('claim_course')
    .setLabel('Claim')
    .setStyle(ButtonStyle.Secondary)
    )
    const courseRow = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
      .setCustomId('courses')
      .setPlaceholder('Select a course option')
      .addOptions(
        { label: 'Course Overview', emoji: '<:Info:1346299947070259231>', value: 'course_overview'},
        { label: 'discord.js Bot Course', emoji: '<:Bot:1346686609004695635>', value: 'discord_course'},
        { label: 'Graphic Course', emoji: '<:Palatte:1342662723821109258> ', value: 'graphic_course' }
      )
    )
    await message.channel.send({
      embeds,
      components: [courseRow, claimButton]
    })

    const sentReply = await message.reply({ content: 'Courses sent!' });
    setTimeout(() => sentReply.delete(), 2000);

  }
}