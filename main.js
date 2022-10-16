const fs = require('node:fs');
const {
    Client,
    Collection,
    Discord,
    Intents
} = require('discord.js');
const {
    MessageEmbed
} = require("discord.js")
const {
    token
} = require('./config.json');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('/help', {
        type: 'LISTENING'
    });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(client, interaction, Discord);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true
        });
    }
});

client.on('guildCreate', guild => {
    const embed = new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Hello there!')
        .setDescription(`Mylo here! Thanks a lot for inviting me!\n
        I'm a small, yet fully functional discord bot who uses ` + '(`/`)' + ` commands.\n
        To get started, use the command ` + '`/setup`' + ` to first setup your server to me!`)
        .setFooter(`Mylo's welcome message`)
        .setTimestamp()
    
    guild.systemChannel.send({ embeds: [embed] })
});

client.login(token);