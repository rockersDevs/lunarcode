const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');

module.exports = async function lunar(interaction) {
    try {
        const perksEmbed = new EmbedBuilder()
            .setColor(0x2b2d31)
            .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67b9fcda&is=67b8ab5a&hm=608513e03261c8d4c4cef09ea84f120e9371eaca8fd52125411feedbbaa0c1a9&=&format=webp&quality=lossless&width=585&height=44')
            .setTitle('.lunar Perks')
            .setDescription(`
• 10% of all orders while boosting
• Access to supporter channels
• Support the server`)

        await interaction.reply({
            embeds: [perksEmbed], 
            ephemeral: true, 
        });

    } catch (error) {
        console.error('Error executing the lunar embed:', error);
        await interaction.reply({
            content: 'An error occurred while sending the lunar embed.',
            ephemeral: true,
        });
    }
};
