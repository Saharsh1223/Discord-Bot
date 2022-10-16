const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user who you feel should be banned!')
        .addUserOption(option =>
            option.setName('member')
            .setDescription('The member who you want me to ban.')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('A specific reason you want the member to be banned.')),

    execute: async (client, interaction, Discord) => {
        //const Discord = require('discord.js');
        const user = interaction.options.getMember('member')

        if (interaction.member.permissions.has('BAN_MEMBERS')) {
            if (user) {
                const memberTarget = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

                const reason = interaction.options.getString('reason')

                const banList = await client.guilds.cache.get("968510472531877948").bans.fetch();
                const bannedUser = banList.get(memberTarget.id)

                if (!bannedUser) {
                    if (!interaction.member.roles.highest.position <= memberTarget.roles.highest.position) {
                        if (reason) {
                            await memberTarget.send({
                                content: 'You have been banned from the server **' + interaction.guild.name.toString() + '** for the reason: **' + reason.toString() + '**'
                            })

                            try {
                                await memberTarget.ban({
                                    reason
                                });
                            } catch (error) {
                                await interaction.reply({
                                    content: error.toString(),
                                    ephemeral: true
                                })
                            }

                            const emb = new MessageEmbed()
                                .setColor('#ffffff')
                                .setTitle(`Banned ${memberTarget.user.tag}`)
                                .setAuthor(interaction.member.user.tag, interaction.member.user.displayAvatarURL())
                                .setDescription('Sucessfully banned ' + `**${memberTarget.user.tag}** for the reason: ${reason}.\nTo unban the user, use ` + '`' + `/unban ${memberTarget.user.id}` + '`!')
                                .setTimestamp()
                                .setFooter('Banned by ' + `${interaction.member.user.tag}`)
                            await interaction.reply({
                                embeds: [emb]
                            })
                        } else {
                            try {
                                await memberTarget.ban();
                            } catch (error) {
                                await interaction.reply({
                                    content: error.toString(),
                                    ephemeral: true
                                })
                            }

                            const embed = new MessageEmbed()
                                .setColor('#ffffff')
                                .setTitle(`Banned ${memberTarget.user.tag}`)
                                .setAuthor(interaction.member.user.tag, interaction.member.user.displayAvatarURL())
                                .setDescription('Sucessfully banned ' + `${memberTarget.user.tag} for no reason specified.\nTo unban the user, use ` + '`' + `/unban ${memberTarget.user.id}` + '`!')
                                .setTimestamp()
                                .setFooter('Banned by ' + `${interaction.member.user.tag}, ID: ${memberTarget.user.id}`)
                            await interaction.reply({
                                embeds: [embed]
                            })
                        }
                    } else {
                        await interaction.reply({
                            content: 'Given member have higher or equal rank as you so i can not ban them.',
                            ephemeral: true
                        })
                    }
                } else {
                    await interaction.reply({
                        content: `The user ${memberTarget.user.tag} is already banned!`,
                        ephemeral: true
                    })
                }

            } else {
                await interaction.reply({
                    content: 'Please mention the user you want to ban!',
                    ephemeral: true
                })
            }
        } else {
            await interaction.reply({
                content: 'You do not have enough permissions to use this command!',
                ephemeral: true
            })
        }
    }
}