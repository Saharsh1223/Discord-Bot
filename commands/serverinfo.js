const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Get some information about this server!'),
    execute: async (client, interaction, Discord) => {
        const mesg = await interaction.reply({
            content: "Serverinfo here, still being worked on!",
            fetchReply: true
        });
    }
};