const { 
  EmbedBuilder, 
  ActionRowBuilder, 
  ChannelType, 
  PermissionsBitField, 
  ButtonBuilder, 
  ButtonStyle 
} = require('discord.js');
const fs = require('fs');
const path = require('path');

const ticketsFile = path.join(__dirname, '../../tickets.json');

function loadTickets() {
    if (!fs.existsSync(ticketsFile)) {
        fs.writeFileSync(ticketsFile, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(ticketsFile, 'utf8'));
}

function saveTickets(tickets) {
    fs.writeFileSync(ticketsFile, JSON.stringify(tickets, null, 2));
}

const operationsId = '1348431045007118417';

const createIds = {
  livery: '1342680905587884152',
  clothing: '1342680906128953445',
  els: '1342680906846179339',
  graphic: '1342680907378855956',
  discord: '1342681571534045224',
  bot: '1348164148801966131'
}

const categories = {
  livery: '1342688185867698288',
  clothing: '1342688203043377289',
  els: '1342688229790453884',
  graphic: '1342688280923082772',
  discord: '1342688308169408626',
  bot: '1348164429812076604'
}

const ticketNames = {
  livery: 'Livery',
  clothing: 'Clothing',
  els: 'ELS',
  graphic: 'Graphic',
  discord: 'Discord',
  bot: 'Bot'
}

module.exports = async function handleOrderTicketCreation(interaction) {
  try {
    await interaction.deferReply({ ephemeral: true });

    const ticketType = interaction.values[0];

    if (!categories[ticketType]) {
      return await interaction.editReply({
        content: 'Invalid order selected',
        ephemeral: true
      });
    }

    let tickets = loadTickets();
    const existingTicket = tickets.find(t => t.userId === interaction.user.id && t.ticketType === ticketType && t.isOpen);

    if (existingTicket) {
      return await interaction.editReply({
        content: `You already have an open ${ticketType} order.`,
        ephemeral: true
      });
    }

    const category = await interaction.guild.channels.fetch(categories[ticketType]);

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
        // Only allow the role corresponding to the ticket type to view the channel
        {
          id: createIds[ticketType],  // Here, we select the specific role ID for the ticket type
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
        {
          id: operationsId,
          allow: [
           PermissionsBitField.Flags.ViewChannel,
           PermissionsBitField.Flags.SendMessages,
           PermissionsBitField.Flags.ReadMessageHistory,
          ],
        }
      ],
    });

    // Add the ticket to the list
    tickets.push({
      userId: interaction.user.id,
      ticketType,
      isOpen: true,
      channelId: ticketChannel.id,
    });
    saveTickets(tickets);

    const ticketEmbed = new EmbedBuilder()
      .setDescription(`
        Thank you for choosing **.lunar**! Please follow the format while waiting to receive help. Make sure not to ping staff!

        **Username:
        Product:
        Requests:
        References:
        Designer:**`)
      .setColor(0x2b2d31)
      .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67bf42da&is=67bdf15a&hm=f02bbdde64efe617eb25a4bd00f4c6114c575feae01c52a4de263f796f781d99&=&format=webp&quality=lossless&width=585&height=44');

    const closeButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('close_ticket')
        .setLabel('Close')
        .setStyle(ButtonStyle.Danger)
    );

    const sentMessage = await ticketChannel.send({
      content: `@everyone A new ${ticketNames[ticketType]} order has been placed!`,
      embeds: [ticketEmbed],
      components: [closeButton]
    });

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
}
