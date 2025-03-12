const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const roleId = '1348807013983060079';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('claim')
    .setDescription('Claim an order ticket'),

  async execute(interaction) {
    const member = interaction.guild.members.cache.get(interaction.user.id);

    // Embed should be inside execute function because it relies on interaction
    const embed = new EmbedBuilder()
      .setColor(0x2b2d31)
      .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67c87d5a&is=67c72bda&hm=c0c18938226f75cd1c0d1f1502b437696d437b243a2a949989ea3e3297e069c1&=&format=webp&quality=lossless&width=585&height=44')
      .setDescription(`This ticket has been claimed by **<@${interaction.user.id}>**. Please refrain from pinging other staff. If the ticket is unclaimed, wait for it to be claimed again!`);

    // Allow only members with the role to claim the ticket
    if (!member || !member.roles.cache.has(roleId)) {
      await interaction.reply({
        content: 'You cannot claim tickets because you do not have the correct role!',
        ephemeral: true
      });
      return; // End the function if the user does not have the role
    }

    // If the user has the correct role, proceed with claiming the ticket
    await interaction.reply({
      embeds: [embed],
    });
  }
};
