const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');

module.exports = async function courseOverview(interaction) {
    try {
        const courseOverviewEmbed = new EmbedBuilder()
            .setColor(0x2b2d31)
            .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67b9fcda&is=67b8ab5a&hm=608513e03261c8d4c4cef09ea84f120e9371eaca8fd52125411feedbbaa0c1a9&=&format=webp&quality=lossless&width=585&height=44')
            .setFooter({ text: 'Once purchased, open a management ticket, and wait to be roled!' })
            .setDescription('Welcome to **.lunars** courses! We offer different courses. Check out our different course options!\n\nBot Course: **Available** \nClothing Course (Soon!) \n Livery Course (Soon!) \n Graphic Course (Soon!)')

        await interaction.reply({
            embeds: [courseOverviewEmbed], 
            ephemeral: true, 
        });

    } catch (error) {
        console.error('Error executing the course overview function:', error);
        await interaction.reply({
            content: 'An error occurred while sending the course overview.',
            ephemeral: true,
        });
    }
};
