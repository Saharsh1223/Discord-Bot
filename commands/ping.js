const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!'),
    execute: async (client, interaction, Discord) => {
        const mesg = await interaction.reply({
            content: "Pong!",
            fetchReply: true
        });

        await interaction.editReply({
            content: `Pong! ` + '`' + `${client.ws.ping}ms` + '`'
        });
    }
};