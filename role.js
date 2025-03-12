const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const roles = {
  'update_role': '1342682346993877083',     // Replace with actual role ID
  'announcement_role': '1342667463623577770', // Replace with actual role ID
  'order_status_role': '1342667464097529856'  // Replace with actual role ID
};

module.exports = (client) => {
  const allowedId = '1241828749662621836'; // The role ID allowed to send the menu

  // Log whenever the bot receives a message
  client.on('messageCreate', async (message) => {

    // Ignore messages from bots
    if (message.author.bot) return;

    // Check for the command
    if (message.content === '!roles') {
      // Check if the member has the required role
      if (!message.member.roles.cache.has(allowedId)) {
        return message.reply({ content: 'You cannot send the roles menu.', ephemeral: true });
      }

      // Embeds for the message
      const embed1 = new EmbedBuilder()
        .setColor(0x2b2d31)
        .setImage('https://media.discordapp.net/attachments/1338977625359646795/1347316231509901443/comission_roles.png?ex=67cb6185&is=67ca1005&hm=bf394a0e16828dee0dec4c867319d9c8f9f26e415c7bd15d853697f30169ebe9&=&format=webp&quality=lossless&width=1399&height=420')
      const embed2 = new EmbedBuilder()
        .setColor(0x2b2d31)
        .setImage('https://media.discordapp.net/attachments/1338977625359646795/1347316262300156005/image.png?ex=67cb618c&is=67ca100c&hm=566121dc99c7d82a259064c9554c33834b83aa8082945603b098ecfa317af372&=&format=webp&quality=lossless&width=630&height=89')
        .setDescription(`
          <:Tools:1342669726698180680> | Update Ping
          • Get notifications for server updates
  
          <:Megaphone:1342669701662245014> | Announcement Ping
          • Get server announcement notifications
  
          <:Palatte:1342662723821109258> | Order Status Ping
          • Get notified on order status
        `);

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
            .setEmoji('<:Palatte:1342662723821109258> ')
            .setLabel('Order Status')
            .setStyle(ButtonStyle.Secondary)
        );

      try {
 
        await message.channel.send({ embeds: [embed1, embed2], components: [row] });

      } catch (err) {
        message.reply({ content: 'There was an error sending the roles menu.', ephemeral: true });
      }
    }
  });

  // Handle button interaction to assign/remove roles
  client.on('interactionCreate', async (interaction) => {

    // Make sure the interaction is a button click
    if (!interaction.isButton()) return;

    const roleId = roles[interaction.customId];

    // If the roleId is invalid, log the error and return
    if (!roleId) {
      return;
    }

    // Get the member and role
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const role = interaction.guild.roles.cache.get(roleId);

    if (!role) {
      return interaction.reply({ content: 'Role not found', ephemeral: true });
    }

    // Toggle the role: add if not present, remove if already present
    try {
      if (member.roles.cache.has(role.id)) {
        await member.roles.remove(role);
        await interaction.reply({ content: `Removed the "${role.name}" role.`, ephemeral: true });
      } else {
        await member.roles.add(role);
        await interaction.reply({ content: `Added the "${role.name}" role.`, ephemeral: true });
      }
    } catch (err) {
      await interaction.reply({ content: 'There was an error processing your request.', ephemeral: true });
    }
  });
};
