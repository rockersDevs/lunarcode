const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const mongoose = require("mongoose");

module.exports = {
  name: 'ping',
  description: 'Replies with Pong! and additional information',
  async execute(message, args) { 
    if (
      !message.guild.members.me.permissionsIn(message.channel).has(PermissionsBitField.Flags.SendMessages)
    ) {
      console.error('Bot does not have permission to send messages in this channel.');
      return;
    }

    const botStart = Date.now();
    const websocketPing = message.client.ws.ping;
    const botPing = Date.now() - botStart;
    const uptime = process.uptime();
    const uptimeTimestamp = `<t:${Math.floor(Date.now() / 1000 - uptime)}:R>`;


    const embed = new EmbedBuilder()
      .setTimestamp()
      .setColor("302c34")
      .setTitle("Pong!")
      .setDescription(
        `**WebSocket Ping:** ${websocketPing}ms\n` +
        `**Bot Latency:** ${botPing}ms\n` +
        `**Uptime:** ${uptimeTimestamp}`
      )

    await message.reply({ embeds: [embed] });
  },
};
