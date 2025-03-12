const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
  name: 'dashboard',
  description: 'Sends dashboard',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return message.reply({ content: 'You need Administrator permissions to use this command.' });
    }

    const embeds = [
        new EmbedBuilder()
        .setColor(2829617)
        .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342533463391080581/lunar_Dashboard_Banner.png?ex=67bdefb8&is=67bc9e38&hm=f9548be405551a7e594e02f158e7c04e80c76cf30c397fbf15955a63d505b007&format=webp&quality=lossless&width=1399&height=420&'),

        new EmbedBuilder()
        .setDescription('**Liberty Designs!** - An all-purpose ER:LC related design server. Here we offer many different services ranging from Liveries to Graphics. Check out what we offer below!')
        .setColor(2829617)
        .setImage('https://media.discordapp.net/attachments/1342507182624735296/1342535217474441247/image.png?ex=67bdf15a&is=67bc9fda&hm=89205109b36bb4e544a49906c1c10fc7493efd546717b56f128d9772ff792e4f&format=webp&quality=lossless&width=585&height=44&')
        .addFields(
            { name: '<:Roblox:1342662732561911838> Roblox Group', value: '[Roblox Group](https://www.roblox.com/communities/35657999/lunar-I-ER-LC#!/store)', inline: true },
            { name: '<:Moderation:1342663180865765480> Apply Today', value: '[Click Me](https://discord.com/channels/1342507182624735293/1342574864317546497)', inline: true },
            { name: '<:Palatte:1342662723821109258> Order Here', value: '[Click Me](https://discord.com/channels/1342507182624735293/1342575075898953798)', inline: true }
        )
    ];

    const selectMenu = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
        .setCustomId('dashboard_menu')
        .setPlaceholder('Choose an option')
        .addOptions([
            { label: 'Server Regulations', description: 'View the server regulations', emoji: '<:Rules:1346299820146425936> ', value: 'rules' },
            { label: 'Server FAQ', description: 'View the frequently asked questions', emoji: '<:Info:1346299947070259231> ', value: 'faq' },
        ])
    );

    const selectMenu2 = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
        .setCustomId('dashboard_menu2')
        .setPlaceholder('Choose an option')
        .addOptions([
            { label: 'General Support',  emoji: '<:Staff2:1346299800093458443>', value: 'general' },
            { label: 'Management Support',  emoji: '<:Moderation:1346299809715453962> ', value: 'management' },
        ])
    );

    await message.channel.send({ embeds, components: [selectMenu, selectMenu2] });

    const sentReply = await message.reply({ content: 'Dashboard sent!' });
    setTimeout(() => sentReply.delete(), 5000);
  },
};
