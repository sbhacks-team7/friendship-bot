const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
//const TOKEN = process.env.TOKEN;

//const prefix = '$';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('friendship-bot is online now!');
    client.user.setUsername("friendship-bot");
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

    if(command === 'help'){
        client.commands.get('help').execute(message, args);
    } else if (command === 'hug') {
        // grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        client.commands.get('hug').execute(message, args);
    }else {
        message.channel.send('Unrecognized command. Enter $help for proper usage');
    }
});

client.login(token);