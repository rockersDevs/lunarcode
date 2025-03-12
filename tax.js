const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tax')
    .setDescription('Calculate the tax for robux!')
    .addNumberOption(option =>
      option.setName('amount')
        .setDescription('Amount of robux before tax!')
        .setRequired(true)
    ),

  async execute(interaction) {
    const amount = interaction.options.getNumber('amount');
    const taxRate = 0.30;

    // Calculate the tax amount and the final amount after adding the tax
    const taxAmount = Math.round(amount * taxRate); // Round tax amount to remove decimals
    const amountAfterTax = Math.round(amount + taxAmount); // Add tax to the original amount and round

    // Create an embed to show the tax calculation
    const taxEmbed = new EmbedBuilder()
      .setColor(0x2b2d31)
      .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67b9fcda&is=67b8ab5a&hm=608513e03261c8d4c4cef09ea84f120e9371eaca8fd52125411feedbbaa0c1a9&=&format=webp&quality=lossless&width=585&height=44')
      .setTitle('.lunar Tax Calculator')
      .setDescription(`Amount before tax: **${amount}**\nAmount after tax: **${amountAfterTax}**`);

    // Send the embed as a reply to the user
    await interaction.reply({
      embeds: [taxEmbed],
      ephemeral: false, // Make the message visible to everyone
    });
  },
};
