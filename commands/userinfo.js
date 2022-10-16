const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed
} = require("discord.js")
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Get some information of a server member!")
        .addUserOption(option => option.setName("member").setDescription("The memeber whose details you want.")),
    execute: async (client, interaction, Discord) => {
        // Get Discord Guild Member
        let member;
        member = interaction.options.getMember("member") || interaction.member

        // Format Permissions
        const permissions = member.permissions.toArray().map(perm => {
            return perm
                .toLowerCase()
                .replace(/_/g, " ") // Replace all underscores with spaces
                .replace(/\w\S*/g, txt => {
                    // Capitalize the first letter of each word
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
        }).join(", ");

        //format roles
        const roles = member.roles.cache.map(role => {
            return role.toString()
        }).join(", ");
        // Format createdAt
        const createdAt = moment.utc(member.user.createdAt).format("MMMM Do YYYY, h:mm a");
        // Format joinedAt
        const joinedAt = moment.utc(member.joinedAt).format("MMMM Do YYYY, h:mm a");
        // Format status
        const status = member.presence?.status;
        // Format activity
        const activity = member.presence?.activities.map(activity => {
            return activity.name
        }).join(", ");
        // Format nickname
        const nickname = "**" + member.nickname + "**" ? member.nickname : "None";
        // Format avatar
        const avatar = member.user.displayAvatarURL({
            dynamic: true
        });
        // Format user
        const user = member.user.tag;
        // Format id
        const id = member.id;
        // Format discriminator
        const discriminator = member.user.discriminator;
        // Format username
        const username = member.user.username;

        const em = new MessageEmbed()
            .setAuthor(user, avatar)
            .setColor('#ffffff')
            .setThumbnail(member.user.avatarURL())
            .addField(
                `Information`,
                `Username - ${username},\n Registered Account at - ${createdAt} (UTC),\n Joined Server at - ${joinedAt} (UTC)`,
            )
            .addField(
                "In the server",
                `Nickname - ${nickname},\n Highest Role - ${member.roles.highest}`,
            )
            .setTimestamp()
            .setFooter({
                text: `ID: ${member.id}`
            })
        return interaction.reply({
            embeds: [em]
        });
    }
};