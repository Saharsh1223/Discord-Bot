const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Setup the bot!'),
    execute: async (client, interaction, Discord) => {

        let muteRole = interaction.guild.roles.cache.find(role => role.name === 'muted');

        if (typeof muteRole === undefined) {
            const embed = new MessageEmbed()
                .setColor('#ffffff')
                .setTitle('Setup')
                .setDescription("Set-up the following things before you could use/mess with me!")
                .addField('Current Status', "Mute/Unmute commands - ❎\n")
                .addField('Mute and Unmute commands', "Create a role named `muted` (case sensitive) and give it the permissions to basically mute/block people from chatting/speaking in the server. Make sure the `muted` role is above the normal `member` role and my role above the `muted` role in the `Server Settings` > `Roles` and you're good to go!")
                //.addField('Logging', "Create a public/private channel named `#logging` (case sensitive) and make sure I have permissions to access and send messages in that channel. I will be sending log messages inside that channel!\n\n")
                .addField('Note:', "Just know that I'm **STILL IN DEVELOPMENT** currently and I would work *IMPROPERLY WITHOUT THINGS SETUP**. After setting this up, I should work perfectly fine though, there could be 🐛bugs🐛 anywhere in the middle :) TYSM for choosing me as your multipurpose bot!")

            interaction.reply({
                embeds: [embed]
            })
        } else {
            if (muteRole.position < interaction.guild.me.roles.highest.position) {
                const embed = new MessageEmbed()
                    .setColor('#ffffff')
                    .setTitle('Setup')
                    .setDescription("Set-up the following things before you could use/mess with me!")
                    .addField('Current Status', "Mute/Unmute commands - ✅\n")
                    .addField('Mute and Unmute commands', "Create a role named `muted` (case sensitive) and give it the permissions to basically mute/block people from chatting/speaking in the server. Make sure the `muted` role is above the normal `member` role and my role above the `muted` role in the `Server Settings` > `Roles` and you're good to go!")
                    //.addField('Logging', "Create a public/private channel named `#logging` (case sensitive) and make sure I have permissions to access and send messages in that channel. I will be sending log messages inside that channel!\n\n")
                    .addField('Note:', "Just know that I'm **STILL IN DEVELOPMENT** currently. After setting this up, I should work perfectly fine though, there could be 🐛bugs🐛 anywhere in the middle :) TYSM for choosing me as your multipurpose bot!")

                interaction.reply({
                    embeds: [embed]
                })
            }
        }
    }
};