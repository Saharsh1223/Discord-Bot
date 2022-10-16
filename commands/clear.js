const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear the amount of messages you want!')
        .addIntegerOption(option =>
            option.setName('amount')
            .setDescription('Enter the amount of messages you would like to clear!')
            .setRequired(true)),
    execute: async (client, interaction, Discord) => {
        if (interaction.member.permissions.has('MANAGE_MESSAGES')) {
            const amount = interaction.options.getInteger('amount');

            if (!amount) return interaction.reply({
                content: 'Please enter the amount of messages you would like to clear!',
                ephemeral: true
            });
            if (isNaN(amount)) return interaction.reply({
                content: 'Please enter a real number!',
                ephemeral: true
            });

            if (amount > 100) return interaction.reply({
                content: 'I cannot delete messages more than 100 at once!',
                ephemeral: true
            })
            if (amount < 1) return interaction.reply({
                content: 'You must enter a value more than 0!',
                ephemeral: true
            })

            await interaction.channel.messages.fetch({
                limit: amount
            }).then(async messages => {
                const deletedMessages = await interaction.channel.bulkDelete(messages, true);

                const user = interaction.member;
                const embed = new MessageEmbed()
                    .setColor('#ffffff')
                    .setDescription('Sucessfully cleared ' + deletedMessages.size + ' message(s)!')
                    .setTimestamp()
                    .setFooter('Requested by ' + `${user.user.tag}`)

                interaction.reply({
                    embeds: [embed]
                })
            });
        } else {
            interaction.reply('You do not have enough permissions use this command!')
        }
    }
}