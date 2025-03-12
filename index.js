const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const express = require('express');
require('dotenv').config();
const noblox = require('noblox.js'); 
const cookie = process.env.ROBLOX_COOKIE;
const welcome = require('./events/welcome')
const roles = require('../role')
const { joinVoiceChannel } = require('@discordjs/voice');


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

client.commands = new Collection();
client.prefixCommands = new Collection();
const prefix = '!';

try {
    const functionFiles = fs.readdirSync('./src/functions').filter((file) => file.endsWith('.js'));
    for (const file of functionFiles) {
        const functionName = file.split('.')[0];
        client[functionName] = require(`./functions/${file}`);
    }
} catch (error) {
    console.error('Error loading functions:', error);
}

try {
    const commandFolders = fs.readdirSync('./src/commands');
    const handleCommands = require('./functions/handelCommands');
    handleCommands(client, commandFolders, path.join(__dirname, 'commands'));
} catch (error) {
    console.error('Error loading commands:', error);
}

try {
    const prefixCommandFiles = fs.readdirSync('./src/prefixCommands').filter((file) => file.endsWith('.js'));
    for (const file of prefixCommandFiles) {
        const command = require(`./prefixCommands/${file}`);
        client.prefixCommands.set(command.name, command);
    }
} catch (error) {
    console.error('Error loading prefix commands:', error);
}

try {
    const eventFiles = fs.readdirSync('./src/events').filter((file) => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
} catch (error) {
    console.error('Error loading events:', error);
}

client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.prefixCommands.get(commandName);

    if (!command) return;

    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error('Error executing command:', error);
        message.reply('There was an error trying to execute that command!');
    }
});

try {
    noblox.setCookie(cookie).then(() => {
        console.log('Logged into Roblox successfully.');
    }).catch(console.error);
} catch (error) {
    console.error('Error logging into Roblox:', error);
}

client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase() === '!join' && message.member.voice.channel) {
      const channel = message.member.voice.channel;
  
      // Join the voice channel
      joinVoiceChannel({
        channelId: channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });
  
      message.reply(`Joined the voice channel: ${channel.name}`);
    } else if (message.content.toLowerCase() === '!join') {
      message.reply('You need to join a voice channel first!');
    }
  });

(async () => {
    try {
        await client.login(process.env.token);
        welcome(client)
        roles(client)
        
    } catch (error) {
        console.error('Error logging in the bot:', error);
    }
})();