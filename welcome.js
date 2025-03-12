const { Client, GatewayIntentBits, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = (client) => {
    // Event listener for when a new member joins the server
    client.on('guildMemberAdd', async (member) => {
        // Get the member count after the member joins
        const memberCount = member.guild.memberCount;
        
        // Replace 'YOUR_WELCOME_CHANNEL_ID' with your actual welcome channel ID
        const welcomeChannel = member.guild.channels.cache.get('1348802014347530402');
        
        // Replace 'YOUR_ROLE_ID' with your actual role ID
        const role = member.guild.roles.cache.get('1348802369642823690');

        if (welcomeChannel) {
            // Create the button with the member count
            const button = new ButtonBuilder()
                .setCustomId('welcome_button')
                .setEmoji('<:Members:1348809115878555739>')
                .setLabel(`${memberCount}`) // Label the button with the member count
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true); // Disable the button so users can't click it
            
            try {
                // Send the welcome message and include the button
                await welcomeChannel.send({
                    content: `Welcome to **.lunar!**, <@${member.id}>! We hope you enjoy the server!`,
                    components: [{ type: 1, components: [button] }] // Ensure the button is in an ActionRow
                });
            } catch (error) {
                console.error(`Error sending welcome message: ${error}`);
            }
        }

        if (role) {
            try {
                // Assign the role to the new member
                await member.roles.add(role);
            } catch (error) {
                console.error(`Error assigning role: ${error}`);
            }
        }
    });
};
