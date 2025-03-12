const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');

module.exports = async function faq(interaction) {
    try {
        // Create the FAQ embed
        const faqEmbed = new EmbedBuilder()
            .setColor(0x2b2d31)
            .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67b9fcda&is=67b8ab5a&hm=608513e03261c8d4c4cef09ea84f120e9371eaca8fd52125411feedbbaa0c1a9&=&format=webp&quality=lossless&width=585&height=44')
            .setTitle('.lunar FAQ')
            .setDescription(`Q. How do I obtain roles?
                A. Head to <#1342574934479863839>, and select roles there!

                Q. What payment does this server accept?
                A. Currently we only accept Robux as payment!

                Q. How do I partner?
                A. Open a support ticket and we will assist you!

                Q. How do I become a designer or staff?
                A. Open a ticket to apply. For design, make sure to have past work!`);

        // Send the embed as a reply to the interaction
        await interaction.reply({
            embeds: [faqEmbed], // Sends the FAQ embed
            ephemeral: true, // Optionally set ephemeral to true if you want the message to be hidden after it is viewed
        });

    } catch (error) {
        console.error('Error executing the FAQ function:', error);
        await interaction.reply({
            content: 'An error occurred while sending the FAQ.',
            ephemeral: true,
        });
    }
};
