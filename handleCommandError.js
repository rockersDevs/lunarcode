const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = async function handleCommandError(interaction, client, error) {
    try {
        console.error(error);
        const errorLoggingChannelId = '1343811205768413335';
        const sendChannel = await client.channels.fetch(errorLoggingChannelId).catch(err => console.error('Error logging channel not found.', err));

        if (!sendChannel) return;

        const embed = new EmbedBuilder()
            .setColor('Red')
            .setDescription('New error flagged, this interaction will no longer work.')
            .addFields(
                { name: 'Command:', value: interaction.commandName },
                { name: 'Error Stack (Full Error)', value: error.stack || 'No stack available' },
                { name: 'Error Message', value: error.message || 'No message available' },
                { name: 'Error Time', value: `<t:${Math.floor(Date.now() / 1000)}:R>` }
            )
            .setFooter({ text: 'Error Flagging' })
            .setTimestamp();

        await sendChannel.send({ embeds: [embed] });
    } catch (error) {
        console.error(`Error in handleCommandError.js: ${error.message}`);
    }
};
