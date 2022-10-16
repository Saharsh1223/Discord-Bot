const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unmute")
        .setDescription("Unmute a user who has previously been muted!")
        .addUserOption(option =>
            option.setName("member")
            .setDescription("Mention the member you want to unmute!")  
            .setRequired(true)),
    execute: async (client, interaction, Discord) => {
        const member = interaction.options.getMember("member")

        if (interaction.member.permissions.has('BAN_MEMBERS') || interaction.member.permissions.has('KICK_MEMBERS') || interaction.member.permissions.has('MANAGE_ROLES')) {
            if (member) {
                let muteRole = interaction.guild.roles.cache.find(role => role.name === 'muted');                
                let memberTarget = interaction.guild.members.cache.get(member.id);

                if (memberTarget.roles.cache.has(muteRole.id)) { 
                    memberTarget.roles.remove(muteRole.id);

                    const embed = new MessageEmbed()
                        .setColor('#ffffff')
                        .setDescription('Sucessfully unmuted ' + `**${memberTarget.user.tag}**`)
                        .setTimestamp()
                        .setFooter('Requested by ' + `${interaction.member.user.tag}`)
                    interaction.reply({
                        embeds: [embed]
                    })
                }
                else {
                    interaction.reply("The user is already unmuted!")
                }
            } else {
                interaction.reply('Please mention the user you want to unmute!')
            }
        } else {
            interaction.reply('You do not have enough permissions to use this command!')
        }
    }
}