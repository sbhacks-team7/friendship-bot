const fs = require('fs');

module.exports= {
    name: 'hug',
    description: "Description: Sends a hug to the mentioned user",
    usage: "Usage: $hug [@mention]\n\n",
    execute(message, args){
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to hug them!');
        }        
        const taggedUser = message.mentions.users.first();
        message.channel.send(`${message.author} hugged ${taggedUser.username}!`);
    }
}