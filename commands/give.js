const Discord = require('discord.js');
const fs = require('fs');

module.exports= {
    name: 'give',
    description: "Gives a gift to the mentioned user",
    usage: "$give [@mention]\n\n",
    execute(message, args){
        if (!message.mentions.users.size || message.mentions.users.size > 1) {
            return message.reply('you need to tag one user in order to give a gift them!');
        }
        const taggedUser = message.mentions.users.first();
        var self = message.member.user.id;

        if (taggedUser == self) {
            return message.reply('you need to tag a user other than yourself!');
        }

        var gifts = [
            'hotdog',
            'flower',
            'ring',
            'flashlight',
            'headpat',
            'pair of glasses',
            'wish for good fortune',
            'dress',
            'pair of shoes',
            'bunny',
            'teddy bear',
            'laptop',
            'headset',
            'shoulder rub',
            'bonk',
            'massage',
            'boop on the nose',
            'hydroflask',
            'diamond sword',
            'TV',
            'virtual hug',
            'highlighter',
            'microphone',
            'small pack of weed',
            'book',
            'fist bump',
            'pat on the back',
            'sticker of cats',
            'stick',
            'pair of chopsticks',
            'partridge in a pear tree',
            'phone',
            'bowl',
            'stapler',
            'hot dog',
            'big eggplant',
            'banana',
            'Nintendo Switch',
            'Discord Bot... how meta',
            'diamond ring',
            'cup of water',
            'puppy',
            'hamburger',
            'french fry'
        ];

        var randOf = list => list[Math.floor(Math.random() * list.length)];

        message.channel.send("<@"+ `${self}` + "> has given <@" + `${taggedUser.id}`+"> a " + randOf(gifts) + "!");

        // const embed = new Discord.MessageEmbed()
        //     .attachFiles(["https://i.pinimg.com/originals/0c/cd/91/0ccd912ac62159482be3fa6c1024c9a8.gif"])
        //     .setDescription("Do you accept this gift? 😊");
        // message.channel.send(embed).then((question) => {
        //     // Have our bot guide the user by reacting with the correct reactions
        //     question.react('👍');
        //     question.react('👎');

        //     // Set a filter to ONLY grab those reactions & discard the reactions from the bot
        //     const filter = (reaction, user) => {
        //       return ['👍', '👎'].includes(reaction.emoji.name) && !user.bot && user.username==taggedUser.username;
        //     };

        //     // Create the collector
        //     const collector = question.createReactionCollector(filter, {
        //       max: 1,
        //       time: 60000
        //     });

        //     collector.on('end', (collected, reason) => {
        //       if (reason === 'time') {
        //         message.reply('Too late! Ran out of time...');
        //       } else {
        //         // Grab the first reaction in the array
        //         let userReaction = collected.array()[0];
        //         // Grab the name of the reaction (which is the emoji itself)
        //         let emoji = userReaction._emoji.name;

        //         // Handle accordingly
        //         if (emoji === '👍') {
        //             message.channel.send(`Rejoice ${message.author}!` +" The gift has been accepted by <@" +`${taggedUser.id}` + ">!");
        //         } else if (emoji === '👎') {
        //             message.channel.send(`Sorry, ${message.author} your gift has been rejected by ` + "<@" + `${taggedUser.id}` + ">...");
        //         } else {
        //           // This should be filtered out, but handle it just in case
        //           message.channel.send(`I dont understand ${emoji}...`);
        //         }
        //       }
        //     });
        //   });

    }
}
