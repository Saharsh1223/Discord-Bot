const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed
} = require("discord.js")
const {
    promises: fs
} = require('fs');
const dir = './commands/';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Run this command for help!'),
    execute: async (client, interaction, Discord) => {
        const user = interaction.member;
        const embed = new MessageEmbed()
            .setColor('#ffffff')
            .setTitle('Help')
            .setDescription('My prefix is the default slash command (`/`). See what all I could do!')
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL({
                dynamic: true
            }))
            .addFields({
                name: 'Info',
                value: '`/userinfo` - Get some information of a server member!\n `/serverinfo` - Get some information about this server!'
            }, {
                name: 'Moderation',
                value: '`/kick` - Kick a user who you feel should be kicked!\n `/ban` - Ban a user who you feel should be banned!\n `/unban` - Unban a user who was previously banned!\n `/clear` - Clear the amount of messages you want!\n `/mute` - Mute a user temporarily or permanently!\n `/unmute` - Unmute a user who was previously muted!'
            }, {
                name: 'Fun stuff',
                value: '`/ping` - Replies with Pong! \n `/beep` - Replies with Boop!\n `/say` - ' + `Repeat what you say!`
            })

            .setFooter('Requested by ' + `${user.user.tag} • ${client.commands.size} working commands ready to use`)
        
        await interaction.reply({
            embeds: [embed]
        })
    }
}