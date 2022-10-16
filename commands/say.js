const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription(`I'll repeat what you say!`)
        .addStringOption(option =>
            option.setName('message')
            .setDescription('The message you want me to repeat!')),
    execute: async (client, interaction, Discord) => {
        const mesg = await interaction.reply({
            content: interaction.options.getString('message') + '** - ' + interaction.member.user.tag + '**',
            fetchReply: true
        });
    }
};