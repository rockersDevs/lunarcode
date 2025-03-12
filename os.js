const { SlashCommandBuilder } = require('discord.js');

const requiredId = '1348800254245470329';  // Replace with the actual role ID

module.exports = {
  data: new SlashCommandBuilder()
    .setName('orderstatus')
    .setDescription('Shows the current status for orders.'),

  async execute(interaction) {
    try {
      // Get the member object from the interaction
      const member = interaction.guild.members.cache.get(interaction.user.id);

      // Check if the user has the required role
      if (member && member.roles.cache.has(requiredId)) {
        // Get the specific channel where the status will be sent
        const targetChannel = interaction.guild.channels.cache.get('1348801266645471304');  // Replace with the actual channel ID
        
        if (targetChannel) {
          // Send the status message to the target channel
          await targetChannel.send({
            content:`<:Car:1342692602583191684> Livery: <:X_:1342707382047740026> 
<:Clothing:1342692047475314749> Clothing: <:X_:1342707382047740026>
<:ELS:1342692788717748295> ELS: <:X_:1342707382047740026>
<:Palatte:1342662723821109258> Graphics: <:X_:1342707382047740026>
<:Discord:1342692973837811792> Discord:<:X_:1342707382047740026>
<:Bot:1346686609004695635> Bots: <:X_:1342707382047740026> 

  
  **Key:**

  <:Check:1342707397218537472> Open
  <:Minus:1342707388813283418> Delayed
  <:X_:1342707382047740026> Closed
  <:lunar:1342707486083518474> .lunar + Only
  
  <@&1342667464097529856>`
          });
          
          // Acknowledge the slash command interaction
          await interaction.reply({
            content: 'The status message has been sent to the target channel.',
            ephemeral: true,  // This will send a private reply to the user
          });
        } else {
          await interaction.reply({
            content: 'The target channel does not exist.',
            ephemeral: true,
          });
        }
      } else {
        await interaction.reply({
          content: 'You do not have the required role to use this command.',
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error('Error handling /status command:', error);
      await interaction.reply({
        content: 'There was an error processing your request.',
        ephemeral: true,
      });
    }
  },
};
