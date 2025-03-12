const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');

module.exports = async function graphicCourse(interaction) {
    try {
        const graphicCourseEmbed = new EmbedBuilder()
            .setColor(0x2b2d31)
            .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67b9fcda&is=67b8ab5a&hm=608513e03261c8d4c4cef09ea84f120e9371eaca8fd52125411feedbbaa0c1a9&=&format=webp&quality=lossless&width=585&height=44')
            .setDescription(`The Graphic Course is an interactive, and helpful course. If you are a new or beginner, this course is perfect for you! Check it out below!\n\n [Graphic Course](https://www.roblox.com/game-pass/1093048168) `)
            .setFooter({ text: 'Once purchased, open a management ticket, and wait to be roled!' })

        await interaction.reply({
            embeds: [graphicCourseEmbed], 
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
