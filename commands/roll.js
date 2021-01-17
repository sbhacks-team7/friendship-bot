const fs = require('fs');

module.exports= {
    name: 'roll',
    description: "Receive a random gift",
    usage: "$roll\n\n",
        execute(message, args){
           if (!message.mentions.users.size) {
               return message.reply('you need to tag a user in order to hug them!');
           }
           const taggedUser = message.mentions.users.first();
           message.channel.send(`${message.author} hugged ${taggedUser.username}!`);
       }
}
