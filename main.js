const Discord = require('discord.js');
require('dotenv').config();
const {Client, MessageEmbed} = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
client.commands = new Discord.Collection();
const prefix = "$";

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('friendship-bot is online now!');
    client.user.setUsername("Dachi");
    client.user.setActivity("$help");
});

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'help' || command === ''){
        client.commands.get('help').execute(message, args);
    } else if (command === 'hug') {
        client.commands.get('hug').execute(message, args);
    } else if(command === 'fight') {
        client.commands.get('fight').execute(message, args);
    } else if (command === 'mindread' || command === 'mr') {
        client.commands.get('mindread').execute(message, args);
    } else if (command === 'magic8ball' || command === '8') {
        client.commands.get('magic8ball').execute(message, args);
    } else if (command === 'coinflip' || command === 'cf') {
        client.commands.get('coinflip').execute(message, args);
    } else if (command === 'cat') {
        client.commands.get('cat').execute(message, args);
    } else if (command === 'ud' || command === 'urbandictionary') {
        client.commands.get('urbandictionary').execute(message, args);
    } else if (command === 'play') {
        client.commands.get('play').execute(message, args);
    } else if (command === 'give') {
        client.commands.get('give').execute(message, args);
    }else if (command === 'leave') {
        client.commands.get('leave').execute(message, args);
    } else if (command === 'dbconnect') {
        client.commands.get('dbconnect').execute(message, args);
    } else {
        message.channel.send('Unrecognized command. Enter $help for proper usage');
    }
});

client.login(process.env.CLIENT_TOKEN);
