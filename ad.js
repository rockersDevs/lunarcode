const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('ad')
      .setDescription('Send our ad'),

  async execute(interaction) {

      await interaction.reply(`**🌙 | .lunar **

Welcome to **.lunar**! We are a new and upcoming ER:LC related design server. Here we offer many different products, at low prices. We guarentee the highest quality ofproducts, that will be available to your server. Check us out below!

**Services:**

> • Livery Services
> • Clothing Services
> • ELS Services
> • Graphic Services
> • Discord Services

**What we offer:**

> • 90 % pay rate
> • Fast amazing designers
> • Welcoming community

**Check us out below!**
🔗: https://discord.gg/hZ3zXmntPA`);
  }
};
