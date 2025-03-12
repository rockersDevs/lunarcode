const { SelectMenuBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const handleTicketCreation = require('../functions/createTicket');
const handleCommandError = require('../functions/handleCommandError');
const handleCloseTicket = require('../functions/close');
const regulations = require('../functions/Dashboard/regulations');
const faq = require('../functions/Dashboard/faq');
const roles = require('../prefixCommands/roles');
const handleOrderTicketCreation = require('../functions/orderTicket');
const perks = require('../functions/Marketplace/perks');
const advertisement = require('../functions/Marketplace/advertisement');
const donation = require('../functions/Marketplace/donations');
const lunar = require('../functions/Marketplace/lunar');
const botCourse = require('../functions/Courses/botCourse')
const courseOverview = require('../functions/Courses/courseOverview')
const oderPrice = require('../functions/Services/orderPrices');
const orderPrices = require('../functions/Services/orderPrices');
const orderInfo = require('../functions/Services/orderInfo');
const graphicCourse = require('../functions/Courses/graphicCourse');
const handleCourseClaimCreation = require('../functions/courseClaim');
const handleModalResponse = require('../functions/createTicket'); 
const claim_package = require('../prefixCommands/nevadaClothing')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        try {
            if (interaction.isCommand()) {
                const command = client.commands.get(interaction.commandName);
                if (!command) return;

                try {
                    await command.execute(interaction, client);
                } catch (error) {
                    await handleCommandError(interaction, client, error);
                }
            } else if (interaction.isStringSelectMenu()) {
                try {
                    if (interaction.customId === 'dashboard_menu2') {
                        await handleTicketCreation(interaction);
                    } else if (interaction.customId === 'dashboard_menu') {
                        const selectedValues = interaction.values[0];

                        if (selectedValues === 'rules') {
                            await regulations(interaction);
                        } else if (selectedValues === 'faq') {
                            await faq(interaction);
                        }
                    } else if (interaction.customId === 'store') {
                        const selectedValues = interaction.values[0];
                        if (selectedValues === 'advertisements') {
                            await advertisement(interaction);
                        } else if (selectedValues === 'donate') {
                            await donation(interaction);
                        } else if (selectedValues === 'lunar+') {
                            await lunar(interaction);
                        } else if (selectedValues === 'perks') {
                            await perks(interaction);
                        }
                    } else if (interaction.customId === 'courses') {
                        const selectedValues = interaction.values[0];
                        if (selectedValues === 'discord_course') {
                            await botCourse(interaction);
                        } else if (selectedValues === 'course_overview') {
                            await courseOverview(interaction)
                        } else if (selectedValues === 'graphic_course') {
                            await graphicCourse(interaction)
                        }
                    } else if (interaction.customId === 'order_information') {
                        const selectedValues = interaction.values[0]
                        if (selectedValues == 'order_prices') {
                            await orderPrices(interaction)
                        } else if (selectedValues === 'order_info') {
                            await orderInfo(interaction)
                        }
                    }
                    else if (interaction.customId === 'services_menu') {
                        await handleOrderTicketCreation(interaction);
                    }
                } catch (error) {
                    console.error(`Error handling select menu interaction: ${error.message}`);
                }
              }  else if (interaction.isButton()) {
                    try {
                        const { customId } = interaction;                
                        if (customId === 'closeTicket' || customId === 'close_ticket' || customId === 'closeCourseTicket') {
                            await handleCloseTicket(interaction);
                        } else if (customId === 'claim_course') {
                            await handleCourseClaimCreation(interaction);
                        } else if (customId === 'claim_package') {
                            await handleCourseClaimCreation(interaction)
                        }
                    } catch (error) {
                        console.error(`Error handling button interaction: ${error.message}`);
                    }   
              }
              else if (interaction.isModalSubmit()) {  // Add this condition to check for modal submissions
                    try {
                        await handleModalResponse(interaction);  // Process the modal response
                    } catch (error) {
                        console.error(`Error handling modal submission: ${error.message}`);
                    }
              }
        } catch (error) {
            console.error(`Error in interactionCreate.js: ${error.message}`);
        }
    },
};
