const { EmbedBuilder, ActionRowBuilder, ChannelType, PermissionsBitField, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Define file location for ticket storage
const ticketsFile = path.join(__dirname, '../../tickets.json');

// Function to load tickets from the JSON file
function loadTickets() {
    if (!fs.existsSync(ticketsFile)) {
        fs.writeFileSync(ticketsFile, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(ticketsFile, 'utf8'));
}

// Function to save tickets to the JSON file
function saveTickets(tickets) {
    fs.writeFileSync(ticketsFile, JSON.stringify(tickets, null, 2));
}

// Define support role and category ID
const supportRole = '1348800254245470329';
const categoryId = '1348810095986868295';

module.exports = async function handleCourseClaimCreation(interaction) {
  try {
    await interaction.deferReply({ ephemeral: true });

    // Get the selected ticket type (check if the split works as expected)
    const ticketType = interaction.customId.split('-')[0]; // We take the first part of the ID (before the '-')

    // Check if ticketType is valid
    if (!ticketType || !supportRole || !categoryId) {
      return await interaction.editReply({
        content: 'Invalid ticket type or missing data.',
        ephemeral: true
      });
    }

    let tickets = loadTickets();
    const existingTicket = tickets.find(t => t.userId === interaction.user.id && t.ticketType === ticketType && t.isOpen);

    if (existingTicket) {
      return await interaction.editReply({
        content: 'You already have an open course ticket!',
        ephemeral: true
      });
    }

    const category = await interaction.guild.channels.fetch(categoryId);
    if (!category || category.type !== ChannelType.GuildCategory) {
      throw new Error(`Invalid category ID for ticket type: ${ticketType}.`);
    }

    // Create the ticket channel
    const ticketChannel = await interaction.guild.channels.create({
      name: `${ticketType}-${interaction.user.username}`,
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
          id: supportRole,
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

    // Save the ticket details
    tickets.push({
      userId: interaction.user.id,
      ticketType,
      isOpen: true,
      channelId: ticketChannel.id,
    });
    saveTickets(tickets);

    // Create an embed for the ticket
    const ticketEmbed = new EmbedBuilder()
      .setColor('ffbd59')
      .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png')
      .setDescription('Thank you for purchasing a course! Please provide proof of the purchase and wait to be roled. Please do not ping staff! If you have any questions, don\'t hesitate to ask!');

    // Create a button to close the ticket
    const closeButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('closeCourseTicket')
        .setLabel('Close')
        .setStyle(ButtonStyle.Danger)
    );

    // Send the ticket message
    const sentMessage = await ticketChannel.send({
      content: `@everyone, a new purchase has been made!`,
      embeds: [ticketEmbed],
      components: [closeButton],
    });

    // Pin the message and notify the user
    await sentMessage.pin();
    await interaction.editReply({
      content: `Your ${ticketType} ticket has been created! Please go to <#${ticketChannel.id}>.`,
    });
  } catch (error) {
    console.error(`Error in handleTicketCreation: ${error.message}`);
    await interaction.editReply({
      content: 'An error occurred while creating your ticket. Please try again later.',
      ephemeral: true,
    });
  }
};
