const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');

module.exports = async function perks(interaction) {
    try {
        const pekrsEmbed = new EmbedBuilder()
            .setColor(0x2b2d31)
            .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67b9fcda&is=67b8ab5a&hm=608513e03261c8d4c4cef09ea84f120e9371eaca8fd52125411feedbbaa0c1a9&=&format=webp&quality=lossless&width=585&height=44')
            .setTitle('.lunar Perks')
            .setDescription(`
• [.lunar + ](https://www.roblox.com/catalog/105945717803105)

• 10% of all orders (lifetime)
• Access to supporter channels
• Support the server`)

        await interaction.reply({
            embeds: [pekrsEmbed], 
            ephemeral: true, 
        });

    } catch (error) {
        console.error('Error executing the perks embed', error);
        await interaction.reply({
            content: 'An error occurred while sending the perks embed.',
            ephemeral: true,
        });
    }
};
