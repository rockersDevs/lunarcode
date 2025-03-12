const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, StringSelectMenuOptionBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
  name: 'services',
  description: 'Send the services embed',
  async execute(message, args) {
    // Check if the user has administrator permissions
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return message.reply({ content: 'You need Administrator permissions to use this command.' });
    }

    // Create the first embed
    const embed1 = new EmbedBuilder()
      .setColor(0x2b2d31)
      .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342534269884563559/lunar_Services_Banner.png?ex=67bf41f9&is=67bdf079&hm=a506f6614c3857bf8f553bf45aa285a0b07648a695fe1e488199d1242263141f&=&format=webp&quality=lossless&width=769&height=231');

    // Create the second embed
    const embed2 = new EmbedBuilder()
      .setColor(0x2b2d31)
      .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67bf42da&is=67bdf15a&hm=f02bbdde64efe617eb25a4bd00f4c6114c575feae01c52a4de263f796f781d99&=&format=webp&quality=lossless&width=585&height=44')
      .setDescription('Welcome to **.lunars** Service Hub. Please make sure to read our Terms of Service, and look over our pricing before purchasing! If you have any questions, open a support ticket!')

      const informationMenu = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
        .setCustomId('order_information')
        .setPlaceholder('View the serivce information')
        .addOptions(
          { label: 'Order Information', value: 'order_info', description: 'View our order information', emoji: '<:Info:1346299947070259231>' },
          { label: 'Pricing', value: 'order_prices', description: 'View our order prices!', emoji: '<:Money:1344141736431325245>' }
        )
      )
      
      const orderMenu = new ActionRowBuilder()
        .addComponents(
          new StringSelectMenuBuilder()
            .setCustomId('services_menu')
            .setPlaceholder('Choose an service')
            .addOptions(
              { label: 'Livery', description: 'Livery Services', value: 'livery', emoji: '<:Car:1342692602583191684>' },
              { label: 'Clothing', description: 'Clothing Services', value: 'clothing', emoji: '<:Clothing:1342692047475314749>' },
              { label: 'ELS', description: 'ELS Services', value: 'els', emoji: '<:ELS:1342692788717748295>' },
              { label: 'Graphics', description: 'Graphics Services', value: 'graphic', emoji: '<:Palatte:1342662723821109258>' },
              { label: 'Discord', description: 'Discord Services', value: 'discord', emoji: '<:Discord:1342692973837811792>' },
              { label: 'Dicord Bots', description: 'Bot Services', value: 'bot', emoji: '<:Bot:1346686609004695635>'}
            )
        );
      

    // Send the embeds
    await message.channel.send({ embeds: [embed1, embed2], components: [informationMenu, orderMenu] });

    // Send a confirmation message
    const sentReply = await message.reply({ content: 'Services sent!' });

    // Delete the confirmation message after 5 seconds
    setTimeout(() => sentReply.delete(), 5000);
  }
};
