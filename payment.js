const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');
const noblox = require('noblox.js');

const filePath = path.join(__dirname, '../../../gamepass.json');

// Game pass data
const gamePasses = [
    { id: 1081985307, name: 'Payment Option 1' },
    { id: 1084827097, name: 'Payment Option 2' },
    { id: 1082888771, name: 'Payment Option 3' },
    { id: 1082670825, name: 'Payment Option 4' }
]; // Gamepass IDs

// Role that is allowed to run the command
const REQUIRED_ROLE_ID = '1348802121583034398'; // Role that is allowed to run commands

// Load game pass data from the JSON file
const loadGamePassData = () => {
    if (!fs.existsSync(filePath)) return {};
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Save game pass data to the JSON file
const saveGamePassData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('payment')
        .setDescription('Manage game pass payments')
        .addSubcommand(subcommand =>
            subcommand.setName('update').setDescription('Update the price of an unused game pass')
                .addIntegerOption(option => option.setName('price').setDescription('New price').setRequired(true))
                .addUserOption(option => option.setName('customer').setDescription('Customer to pay').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand.setName('complete').setDescription('Mark a game pass as unused')
                .addIntegerOption(option => option.setName('gamepass').setDescription('Select a game pass').setRequired(true)
                    .addChoices(...gamePasses.map(gp => ({ name: gp.name, value: gp.id }))))
        ),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const member = interaction.member;
        if (!member.roles.cache.has(REQUIRED_ROLE_ID)) {
            return await interaction.editReply({ content: 'You lack the required role.' });
        }

        const data = loadGamePassData();
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'update') {
            const customerId = interaction.options.getUser('customer');
            const newPrice = interaction.options.getInteger('price');

            let updated = false;

            // Iterate over game passes and update the one that is not in use
            for (const gamePass of gamePasses) {
                if (!data[gamePass.id] || data[gamePass.id] !== 'in_use') {
                    try {
                        // Attempt to configure the game pass with new price
                        await noblox.configureGamePass(gamePass.id, gamePass.name, `Payment link: ${gamePass.name}`, newPrice);
                        data[gamePass.id] = 'in_use'; // Mark as in use
                        saveGamePassData(data);

                        // Send the payment link with the button
                        const embed = new EmbedBuilder()
                            .setTitle('Payment Link')
                            .setDescription(`> Click "Pay Now!" to complete your order. Once you have paid, please provide proof of purchase, and wait for it to get confirmed. This will speed up the order process!`)
                            .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67c9ceda&is=67c87d5a&hm=9f9ff20d4a26c62175dbff669e27f92878c13bd142484c6b2e5964acd2b92aec&=&format=webp&quality=lossless&width=585&height=44')
                            .setColor('ffbd59');

                        const button = new ButtonBuilder()
                            .setStyle(ButtonStyle.Link)
                            .setLabel('Pay Now!')
                            .setURL(`https://www.roblox.com/game-pass/${gamePass.id}`);

                        await interaction.channel.send({ content: `<@${customerId.id}>`, embeds: [embed], components: [new ActionRowBuilder().addComponents(button)] });
                        updated = true;
                        return await interaction.editReply({ content: `Updated game pass ID ${gamePass.id} to ${newPrice} Robux.` });
                    } catch (error) {
                        console.error(`Error configuring game pass ${gamePass.id}:`, error);
                        return await interaction.editReply({ content: `Failed to update the game pass. Please try again later.` });
                    }
                }
            }

            if (!updated) {
                await interaction.editReply({ content: 'All game passes are in use.' });
            }

        } else if (subcommand === 'complete') {
            const gamePassId = interaction.options.getInteger('gamepass');

            if (!data[gamePassId] || data[gamePassId] !== 'in_use') {
                return await interaction.editReply({ content: `Game pass ID ${gamePassId} is not in use.` });
            }

            // Mark game pass as unused
            data[gamePassId] = 'unused';
            saveGamePassData(data);

            const embed = new EmbedBuilder()
                .setTitle('Payment Confirmed')
                .setDescription('> Your payment was processed successfully!')
                .setColor('ffbd59');

            await interaction.channel.send({ embeds: [embed] });
            await interaction.editReply({ content: `Marked game pass ID ${gamePassId} as unused.` });
        }
    }
};
