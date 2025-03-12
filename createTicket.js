const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    PermissionsBitField,
    ChannelType
} = require('discord.js');
const fs = require('fs');
const path = require('path');

const ticketsFile = path.join(__dirname, '../../tickets.json');

// Load and save tickets
function loadTickets() {
    if (!fs.existsSync(ticketsFile)) {
        fs.writeFileSync(ticketsFile, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(ticketsFile, 'utf8'));
}

function saveTickets(tickets) {
    fs.writeFileSync(ticketsFile, JSON.stringify(tickets, null, 2));
}

// Role and category configuration
const supportRoles = {
    general: '1348801048776671232',
    management: '1348802127413379223',
};

const categoryIds = {
    general: '1348839721773830275',
    management: '1348839857849634887',
};

const ticketNames = {
    general: 'General',
    management: 'Management'
};

module.exports = async function handleTicketCreation(interaction) {
    try {
        // Handle select menu interaction
        if (interaction.isStringSelectMenu()) {
            const ticketType = interaction.values[0];

            if (!ticketType || !supportRoles[ticketType] || !categoryIds[ticketType]) {
                return await interaction.reply({
                    content: 'Invalid ticket type selected.',
                    ephemeral: true, // Message is ephemeral
                });
            }

            let tickets = loadTickets();
            const existingTicket = tickets.find(t => t.userId === interaction.user.id && t.ticketType === ticketType && t.isOpen);

            if (existingTicket) {
                return await interaction.reply({
                    content: `You already have an open ${ticketType} ticket.`,
                    ephemeral: true, // Message is ephemeral
                });
            }

            // Create the modal to collect user input (Discord username and question)
            const modal = new ModalBuilder()
                .setCustomId(`ticketModal-${ticketType}`) // Append ticketType to customId
                .setTitle('Fill out provided information!')
                .addComponents(
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId('discordUsername')
                            .setLabel('Your Discord Username')
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                            .setPlaceholder('Enter your Discord username (e.g. user#1234)')
                    ),
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId('question')
                            .setLabel('Your Question')
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true)
                            .setPlaceholder('Enter your question here...')
                    )
                );

            await interaction.showModal(modal);

            return; // Early return, modal has been shown
        }

        // Handle modal submission (from 'ticketModal')
        if (interaction.isModalSubmit() && interaction.customId.startsWith('ticketModal-')) {
            const ticketType = interaction.customId.split('-')[1]; // Extract ticketType from customId
            const discordUsername = interaction.fields.getTextInputValue('discordUsername');
            const question = interaction.fields.getTextInputValue('question');
            const category = await interaction.guild.channels.fetch(categoryIds[ticketType]);
            const supportRoleId = supportRoles[ticketType];

            // Create the ticket channel
            const ticketChannel = await interaction.guild.channels.create({
                name: `${ticketType}-${discordUsername}`,
                type: ChannelType.GuildText,
                parent: category.id,
                permissionOverwrites: [
                    { id: interaction.guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
                    {
                        id: interaction.user.id,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory,
                        ],
                    },
                    {
                        id: supportRoleId,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory,
                        ],
                    },
                    {
                        id: interaction.client.user.id,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory,
                            PermissionsBitField.Flags.ManageChannels,
                        ],
                    },
                ],
            });

            let tickets = loadTickets();
            tickets.push({
                userId: interaction.user.id,
                ticketType,
                isOpen: true,
                channelId: ticketChannel.id,
            });
            saveTickets(tickets);

            const ticketEmbed = new EmbedBuilder()
                .setDescription(
                    `Thank you for contacting us! Below is the information provided:\n\n` +
                    `**Username**: ${discordUsername}\n` +
                    `**Question**: ${question}`
                )
                .setColor(2829617)
                .setFooter({ text: "Please do not ping staff!" })
                .setImage("https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67bdf15a&is=67bc9fda&hm=89205109b36bb4e544a49906c1c10fc7493efd546717b56f128d9772ff792e4f&format=webp&quality=lossless&width=585&height=44&");

            const closeButton = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('closeTicket')
                    .setLabel('Close Ticket')
                    .setStyle(ButtonStyle.Danger)
            );

            const sentMessage = await ticketChannel.send({
                content: `@everyone A new ${ticketNames[ticketType]} ticket has been created!`,
                embeds: [ticketEmbed],
                components: [closeButton]
            });

            await sentMessage.pin();

            await interaction.reply({
                content: `Your ${ticketType} ticket has been created! Please go to <#${ticketChannel.id}>.`,
                flags: 64, // Ephemeral message for feedback
            });
        }
    } catch (error) {
        console.error(`Error in handleTicketCreation: ${error.message}`);
        await interaction.reply({
            content: 'An error occurred while creating your ticket. Please try again later.',
            flags: 64, // Ephemeral error message
        });
    }
};
