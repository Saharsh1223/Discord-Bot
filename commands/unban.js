const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban a user who was previously banned!')
        .addStringOption(option =>
            option.setName('user_id')
            .setDescription(`Enter the banned user's ID so i could unban them!`)
            .setRequired(true)),
    execute: async (client, interaction, Discord) => {

        if (interaction.member.permissions.has('BAN_MEMBERS')) {
            const id = interaction.options.getString('user_id');

            if (id) {
                if (isNaN(id)) return interaction.reply({
                    content: 'Please enter a valid ID instead of a string!',
                    ephemeral: true
                });

                let userID = id
                interaction.guild.bans.fetch().then(bans => {
                    if (bans.size == 0) return interaction.reply({
                        content: `The ban list is empty so the user must not be banned!`,
                        ephemeral: true
                    })

                    let bUser = bans.find(b => b.user.id == userID)

                    if (!bUser) return interaction.reply({
                        content: `That user with the id ` + '`' + `${userID}` + '`' + ` does not exist or is already unbanned!`,
                        ephemeral: true
                    })

                    interaction.guild.members.unban(bUser.user).then(() => {
                        const embed = new MessageEmbed()
                            .setColor('#ffffff')
                            .setTitle(`Unbanned ${bUser.user.tag}`)
                            .setAuthor(interaction.member.user.tag, interaction.member.user.displayAvatarURL())
                            .setDescription('Sucessfully unbanned ' + `${bUser.user.tag}`)
                            .setTimestamp()
                            .setFooter('Unbanned by ' + `${interaction.member.user.tag}`)
                        interaction.reply({
                            embeds: [embed]
                        })
                    })
                })
            } else {
                interaction.reply({
                    content: 'Please mention the user you want to unban!',
                    ephemeral: true
                })
            }
        } else {
            interaction.reply({
                content: 'You do not have enough permissions to use this command!',
                ephemeral: true
            })
        }
    }
}