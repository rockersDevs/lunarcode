const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');

module.exports = async function donation(interaction) {
    try {
        const donationEmbed = new EmbedBuilder()
            .setColor(0x2b2d31)
            .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67b9fcda&is=67b8ab5a&hm=608513e03261c8d4c4cef09ea84f120e9371eaca8fd52125411feedbbaa0c1a9&=&format=webp&quality=lossless&width=585&height=44')
            .setTitle('.lunar Donations')
            .setDescription(`
• [Small Donation](https://www.roblox.com/catalog/114634324503827)
• [Medium Donation](https://www.roblox.com/catalog/77883803425858)
• [Large Donation](https://www.roblox.com/catalog/131825765440659)

• Support the server
• Gain access to supporter channels
• Gain the <@&1342682348193448027> role`)

        await interaction.reply({
            embeds: [donationEmbed], 
            ephemeral: true, 
        });

    } catch (error) {
        console.error('Error executing the donation function:', error);
        await interaction.reply({
            content: 'An error occurred while sending the donation Embed.',
            ephemeral: true,
        });
    }
};
