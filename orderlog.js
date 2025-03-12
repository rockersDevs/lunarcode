const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('orderlog')
    .setDescription('Leave an order log!')
    .addStringOption(option =>
      option.setName('designer')
    .setDescription('Your username')
    .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('product')
     .setDescription('The product you made.')
     .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('price')
    .setDescription('Price of the order(Tax Included)')
    .setRequired(true)
    )
    .addStringOption(option => 
      option.setName('customer')
     .setDescription('The customer who ordered.')
     .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('robloxuser')
      .setDescription('Your Roblox Username')
      .setRequired(true)
    ),

  async execute(interaction) {
    // Role ID you want to check for
    const requiredRoleID = '1348802121583034398';  // Replace with your actual role ID
    
    // Get the member who executed the command
    const member = interaction.member;

    // Check if the member has the required role ID
    if (!member.roles.cache.has(requiredRoleID)) {
      // If the user doesn't have the required role, send a message informing them
      return interaction.reply({
        content: "Sorry, you don't have permission to use this command. You need the specified role.",
        ephemeral: true, // Makes the message only visible to the user who executed the command
      });
    }

    // If the user has the role, proceed with the command
    const designer = interaction.options.getString('designer');
    const product = interaction.options.getString('product');
    const price = interaction.options.getString('price');
    const customer = interaction.options.getString('customer');
    const robloxuser = interaction.options.getString('robloxuser');

    const testEmbed = new EmbedBuilder()
      .setColor(0x2b2d31)
      .setDescription('**Thanks for the order log, make sure you are in the roblox group!**')
      .setImage("https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67b9fcda&is=67b8ab5a&hm=608513e03261c8d4c4cef09ea84f120e9371eaca8fd52125411feedbbaa0c1a9&=&format=webp&quality=lossless&width=585&height=44")
      .addFields(
        { name: 'Designer', value: designer, inline: true},
        { name: 'Product', value: product, inline: true },
        { name: 'Price', value: price, inline: true },
        { name: 'Customer', value: customer, inline: true },
        { name: 'Roblox User', value: robloxuser, inline: true },
      )
      .setTimestamp();

    // Channel ID to send the embed to (replace with your channel's ID)
    const channelID = '1348806385047179335';  //channel ID

    // Get the channel object using the channel ID
    const channel = await interaction.client.channels.fetch(channelID);

    // Send the embed to the specified channel
    await channel.send({ embeds: [testEmbed] });

    // Optionally, you can reply to the interaction to confirm the log has been sent
    await interaction.reply({
      content: "The order log has been successfully sent to the designated channel.",
      ephemeral: true, // Makes the reply visible only to the user who executed the command
    });
  },
};
