const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');

module.exports = async function regulations(interaction) {
    try {
        // Create the regulations embed
        const rulesEmbed = new EmbedBuilder()
            .setColor(0x2b2d31)
            .setTitle('.lunar Regulations')
            .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67b9fcda&is=67b8ab5a&hm=608513e03261c8d4c4cef09ea84f120e9371eaca8fd52125411feedbbaa0c1a9&=&format=webp&quality=lossless&width=585&height=44')
            .setDescription(`
                **1.** Discord Terms Of Service
                <:Dot:1342589686849343631> It is required to follow all Discord TOS while inside of the server.

                **2. Leaking/Reselling**
                <:Dot:1342589686849343631> Leaking, reselling, or sharing any products is against our TOS and will result in a ban.

                **3. Respect, Language**
                <:Dot:1342589686849343631> It is required to respect all members. Swearing is allowed but is to be kept at a minimum.

                **4. Content**
                <:Dot:1342589686849343631> Make sure all content is kept appropriate!

                **5. Advertising**
                <:Dot:1342589686849343631> Advertising through the server will result in a ban.`);

        // Send the embed as a reply to the interaction
        await interaction.reply({
            embeds: [rulesEmbed], // Sends the regulations embed
            ephemeral: true, // Optionally set ephemeral to true if you want the message to be hidden after it is viewed
        });

    } catch (error) {
        console.error('Error executing the regulations function:', error);
        await interaction.reply({
            content: 'An error occurred while sending the regulations.',
            ephemeral: true,
        });
    }
};
