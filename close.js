const { EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');
const fs = require('fs');
const path = require('path');
const transcript = require('discord-html-transcripts');

const ticketsFile = path.join(__dirname, '../../tickets.json');

function loadTickets() {
    return fs.existsSync(ticketsFile) ? JSON.parse(fs.readFileSync(ticketsFile, 'utf8')) : [];
}

function saveTickets(tickets) {
    fs.writeFileSync(ticketsFile, JSON.stringify(tickets, null, 2));
}

module.exports = async function handleCloseTicket(interaction) {
    try {
        const channel = interaction.channel;
        let tickets = loadTickets();
        const ticket = tickets.find(t => t.channelId === channel.id && t.isOpen);

        if (!ticket) {
            return await interaction.reply({ content: 'Ticket not found.', ephemeral: true });
        }

        const closeEmbed = new EmbedBuilder()
            .setTitle('Close Ticket')
            .setDescription('Are you sure you want to close this ticket?')
            .setColor(16748348);

        const confirmationRow = {
            type: 1,
            components: [
                new ButtonBuilder().setCustomId('confirmClose').setLabel('Yes').setStyle(ButtonStyle.Danger),
                new ButtonBuilder().setCustomId('cancelClose').setLabel('No').setStyle(ButtonStyle.Secondary),
            ],
        };

        await interaction.reply({ embeds: [closeEmbed], components: [confirmationRow], ephemeral: true });

        const filter = (i) => ['confirmClose', 'cancelClose'].includes(i.customId) && i.user.id === interaction.user.id;
        const collector = channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async (i) => {
            if (i.customId === 'confirmClose') {
                try {
                    const transcriptChannel = await interaction.client.channels.fetch('1343818148851486730');
                    const transcriptFile = await transcript.createTranscript(channel);

                    const transcriptEmbed = new EmbedBuilder()
                        .setColor(0x2b2d31)
                        .setTitle('Ticket Transcript')
                        .setDescription(`Transcript for ticket **${channel.name}** has been created.`)
                        .addFields({ name: 'Closed By', value: `${i.user}` });

                    await transcriptChannel.send({ embeds: [transcriptEmbed], files: [transcriptFile] });

                    tickets = tickets.map(t => (t.channelId === channel.id ? { ...t, isOpen: false } : t));
                    saveTickets(tickets);

                    await i.reply({ content: 'Closing ticket...', ephemeral: true });
                    setTimeout(async () => {
                        try {
                            await channel.delete();
                        } catch (error) {
                            console.error(`Error deleting ticket: ${error.message}`);
                            await i.followUp({ content: 'Failed to delete the ticket. Please delete it manually.', ephemeral: true });
                        }
                    }, 3000);
                } catch (error) {
                    console.error(`Error closing ticket: ${error.message}`);
                    await i.reply({ content: 'An error occurred while closing the ticket.', ephemeral: true });
                }
            } else if (i.customId === 'cancelClose') {
                await i.reply({ content: 'Ticket closure cancelled.', ephemeral: true });
            }
            collector.stop();
        });

        collector.on('end', async (_, reason) => {
            if (reason === 'time') {
                await interaction.followUp({ content: 'Ticket closure timed out.', ephemeral: true });
            }
        });
    } catch (error) {
        console.error(`Error closing ticket: ${error.message}`);
        await interaction.reply({ content: 'An error occurred while closing the ticket.', ephemeral: true });
    }
};
