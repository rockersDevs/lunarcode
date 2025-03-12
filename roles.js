const { EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const roles = {
  'update_role': '1342682346993877083',
  'announcement_role': '1342667463623577770',
  'order_status_role': '1342667464097529856'
}

module.exports = {
  name: 'roles',
  description: 'Sends self roles menu',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply({ content: 'You need Administrator permissions to use this command.' });
    }
    
    const embeds = [
      new EmbedBuilder()
        .setColor(0x2b2d31)
        .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342667280487677952/lunar_Roles_Banner.png?ex=67bf1519&is=67bdc399&hm=fe72aa021a0b1fe80f0f62db560936df788a2900eefef05632927c138e1bf6bd&=&format=webp&quality=lossless&width=1399&height=420'),

      new EmbedBuilder()
        .setColor(0x2b2d31)
        .setDescription(`
          <:Tools:1342669726698180680> | Update Ping
          • Get notifications for server updates

          <:Megaphone:1342669701662245014> | Announcement Ping
          • Get server announcement notifications

          <:Palatte:1342662723821109258> | Order Status Ping
          • Get notified on order status
        `)
        .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67bf42da&is=67bdf15a&hm=f02bbdde64efe617eb25a4bd00f4c6114c575feae01c52a4de263f796f781d99&=&format=webp&quality=lossless&width=585&height=44')
    ];

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('update_role')
          .setEmoji('<:Tools:1342669726698180680>')
          .setLabel('Update')
          .setStyle(ButtonStyle.Secondary),
        
        new ButtonBuilder()
          .setCustomId('announcement_role')
          .setEmoji('<:Megaphone:1342669701662245014>')
          .setLabel('Announcement')
          .setStyle(ButtonStyle.Secondary),
        
        new ButtonBuilder()
          .setCustomId('order_status_role')
          .setEmoji('<:Palatte:1342662723821109258>')
          .setLabel('Order Status')
          .setStyle(ButtonStyle.Secondary)
      );

    await message.channel.send({
      embeds: [embeds], // Corrected spelling from compontents to components
      components: [row]  // Corrected spelling here
    });
  }
};

// Handling button interaction
module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (!interaction.isButton()) return;

    const roleId = roles[interaction.customId];
    if (!roleId) return;

    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = interaction.guild.roles.cache.get(roleId);

    if (!role) {
      console.log('Role not found:', roleId);
      return interaction.reply({ content: 'Role not found', ephemeral: true });
    }

    try {
      if (member.roles.cache.has(role.id)) {
        await member.roles.remove(role);
        await interaction.reply({ content: `Removed the "${role.name}" role.`, ephemeral: true });
      } else {
        await member.roles.add(role);
        await interaction.reply({ content: `Added the "${role.name}" role.`, ephemeral: true });
      }
    } catch (err) {
      console.error('Error toggling role:', err);
      await interaction.reply({ content: 'There was an error processing your request.', ephemeral: true });
    }
  }
};
