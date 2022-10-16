const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user who you feel should be kicked!')
        .addUserOption(option =>
            option.setName('member')
            .setDescription('The member who you want me to kick!')
            .setRequired(true)),

    execute: async (client, interaction, Discord) => {
        const member = interaction.options.getMember('member')

        if (interaction.member.permissions.has('KICK_MEMBERS')) {
            if (member) {
                const memberTarget = interaction.guild.members.cache.get(member.id) || await interaction.guild.members.fetch(member.id).catch(err => {})
                memberTarget.kick();

                const embed = new MessageEmbed()
                    .setColor('#ffffff')
                    .setTitle(`Kicked ${memberTarget.user.tag}`)
                    .setAuthor(interaction.member.user.tag, interaction.member.user.displayAvatarURL())
                    .setDescription('Sucessfully kicked ' + `**${memberTarget.user.tag}**.`)
                    .setTimestamp()
                    .setFooter('Kicked by ' + `${interaction.member.user.tag}`)
                interaction.reply({
                    embeds: [embed]
                })
            } else {
                message.reply('Please mention the user you want to kick!')
            }
        } else {
            message.reply('You do not have enough permissions use this command!')
        }
    }
}