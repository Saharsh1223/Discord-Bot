const ms = require('ms');
const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute a user who you think should be muted!')
        .addUserOption(option =>
            option.setName('member')
            .setDescription('The member you want to mute!')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('time')
            .setDescription('The time you want to mute the member for!')
            .setRequired(false))
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('The reason you want to give for muting the member!')
            .setRequired(false)),
    execute: async (client, interaction, Discord) => {
        const member = interaction.options.getMember('member')

        if (interaction.member.permissions.has('BAN_MEMBERS') || interaction.member.permissions.has('KICK_MEMBERS') || interaction.member.permissions.has('MANAGE_ROLES')) {
            if (interaction.member !== member) {
                if (member) {
                    if (interaction.member.user.bot !== true) {
                        let muteRole = interaction.guild.roles.cache.find(role => role.name === 'muted');
                        let memberTarget = interaction.guild.members.cache.get(member.id);

                        if (!interaction.options.getString('time')) {
                            memberTarget.roles.add(muteRole.id);

                            const embed = new MessageEmbed()
                                .setColor('#ffffff')
                                .setDescription('Sucessfully muted ' + `**${memberTarget.user.tag}** for reason: **${interaction.options.getString('reason')}**`)
                                .setTimestamp()
                                .setFooter('Requested by ' + `${interaction.member.user.tag}`)
                            interaction.reply({
                                embeds: [embed]
                            })
                            return
                        }

                        memberTarget.roles.add(muteRole.id);

                        const embed = new MessageEmbed()
                            .setColor('#ffffff')
                            .setDescription('Sucessfully muted ' + `**${memberTarget.user.tag}** for **${ms(ms(interaction.options.getString('time')))}** for reason: **${interaction.options.getString('reason')}**`)
                            .setTimestamp()
                            .setFooter('Requested by ' + `${interaction.member.user.tag}`)
                        interaction.reply({
                            embeds: [embed]
                        })

                        setTimeout(function () {
                            memberTarget.roles.remove(muteRole.id);

                            const embed = new MessageEmbed()
                                .setColor('#ffffff')
                                .setDescription('Sucessfully unmuted ' + `**${memberTarget.user.tag}**`)
                                .setTimestamp()
                                .setFooter('Requested by ' + `${interaction.member.user.tag}`)
                            interaction.editReply({
                                embeds: [embed]
                            })
                        }, ms(interaction.options.getString('time')));
                    }
                    // else {
                    //     interaction.reply('You cannot mute a bot!')
                    // }
                } else {
                    interaction.reply('Please mention the user you want to mute!')
                }
            } else {
                interaction.reply("You cannot mute yourself!")
            }
        } else {
            interaction.reply('You do not have enough permissions to use this command!')
        }
    }
}