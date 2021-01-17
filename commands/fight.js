const fs = require('fs');

module.exports= {
    name: 'fight',
    description: "Fights a mentioned user and generates a random winner",
    usage: "$fight [@mention]\n\n",
     execute(message, args){
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to fight them!');
        }
        const taggedUser = message.mentions.users.first();

        if(Math.floor(Math.random() * 2)+1 === 1) {
            message.channel.send(`${message.author} has won the fight!`);
        } else {
            message.channel.send("<@"+ `${taggedUser.id}` + "> has won the fight!");
        }


    }
}
