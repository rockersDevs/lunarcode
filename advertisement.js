const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');

module.exports = async function advertisement(interaction) {
    try {
        const advertisementEmbed = new EmbedBuilder()
            .setColor(0x2b2d31)
            .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67b9fcda&is=67b8ab5a&hm=608513e03261c8d4c4cef09ea84f120e9371eaca8fd52125411feedbbaa0c1a9&=&format=webp&quality=lossless&width=585&height=44')
            .setTitle('.lunar Advertisements')
            .setDescription(`
• [Everyone Ping](https://www.roblox.com/catalog/81465924692688)
• [Sponsored Giveaway](https://www.roblox.com/catalog/90379412106821)  `)

        await interaction.reply({
            embeds: [advertisementEmbed], 
            ephemeral: true, 
        });

    } catch (error) {
        console.error('Error executing the advertisement function:', error);
        await interaction.reply({
            content: 'An error occurred while sending the advertisement.',
            ephemeral: true,
        });
    }
};
