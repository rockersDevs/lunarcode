const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const roleId = '1348807013983060079';

const embed = new EmbedBuilder()
  .setColor(0x2b2d31)
  .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67c87d5a&is=67c72bda&hm=c0c18938226f75cd1c0d1f1502b437696d437b243a2a949989ea3e3297e069c1&=&format=webp&quality=lossless&width=585&height=44')
  .setDescription('This ticket has been unclaimed. Please wait for an available designer to claim this ticket!');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unclaim')
    .setDescription('Unclaim an order ticket'),

  async execute(interaction) {
    const member = interaction.guild.members.cache.get(interaction.user.id);

    if (!member) {
      return interaction.reply({
        content: 'You must be a valid member of the server to use this command.',
        ephemeral: true
      });
    }

    // Allow only members without the staff role to unclaim the ticket
    if (!member.roles.cache.has(roleId)) {
      return interaction.reply({
        content: 'You cannot run this command because you do not have the correct role!',
        ephemeral: true
      });
    }

    // If the user has the correct role (staff), proceed with unclaiming the ticket.
    await interaction.reply({
      embeds: [embed],
    });
  }
};
