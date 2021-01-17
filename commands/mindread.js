const Discord = require('discord.js');
const fs = require('fs');

module.exports= {
    name: 'mindread',
    description: "Sees if two users can read each others' minds!",
    usage: "$mindread [@mention] \t||\t $mr [@mention]\n\n",
    execute(message, args){
        if (!message.mentions.users.size) {
            return message.reply('You need to tag a user in order to read their mind!');
        }
        const taggedUser = message.mentions.users.first();
        if(taggedUser.bot) {
            return message.channel.send('Sorry, you can\'t play with bots!');
        }

        if(message.author == taggedUser){
            return message.channel.send('You\'re already reading your own mind, silly!');
        }

        const challenge = new Discord.MessageEmbed().setDescription(`${message.author} has issued as mindreading challenge to <@` + `${taggedUser.id}` +">!");
        message.channel.send(challenge);

        const embed = new Discord.MessageEmbed()
            .setDescription("Which emoji are you feeling?");

        var taggedAnswer;
        var userAnswer;

        var emotes = [
            '👍',
            '👎',
            '💤',
            '😍',
            '😣',
            '😤',
            '🤕',
            '😒',
            '🤓',
            '💝',
            '💥',
            '💜',
            '😫',
            '💩',
            '🤡',
            '👹',
            '🐔',
            '🦍',
            '🐼',
            '🐻',
            '🐖',
            '🐤',
            '🧠',
            '👅',
            '👀',
            '🤖',
            '😻',
            '🥚',
            '🌮',
            '🥕',
            '🌻',
            '🌸',
            '🍔',
            '🍋',
            '🍎',
            '🐞',
            '🏈',
            '⚽',
            '🏀',
            '🏸',
            '🚁',
            '✈',
            '🌑',
            '🔥',
            '⚡',
            '🌝',
            '🌙',
            '🌜',
            '🚦',
            '🚨',
            '🎠',
            '🌁',
            '🏰',
            '🗽',
            '🌏',
            '🗻',
            '🕹',
            '🔮',
            '🎃',
            '🔔',
            '💎',
            '📖',
            '✂',
            '🔫',
            '⚰',
            '🗿',
            '🚫',
            '🏁',
            '💸',
            '🧤',
            '👔',
            '👞',
            '⛑',
            '🎩',
            '👢',
            '👑',
            '🤠'];
        var randOf = list => list[Math.floor(Math.random() * list.length)];

        var emote1 = randOf(emotes);
        var emote2 = randOf(emotes);
        var emote3 = randOf(emotes);
        var emote4 = randOf(emotes);
        var emote5 = randOf(emotes);

        while(emote2==emote1){
            emote2 = randOf(emotes);
        }

        while(emote3==emote1 || emote3==emote2){
            emote3 = randOf(emotes);
        }

        while(emote4==emote1 || emote4==emote2 || emote4==emote3){
            emote4 = randOf(emotes);
        }

        while(emote5==emote1 || emote5==emote2 || emote3==emote5 || emote5==emote4){
            emote5 = randOf(emotes);
        }

        taggedUser.send(embed).then((question) => {
            question.react(emote1);
            question.react(emote2);
            question.react(emote3);
            question.react(emote4);
            question.react(emote5);


            const filter1 = (reaction, user) => {
                return emotes.includes(reaction.emoji.name) && !user.bot && user.username==taggedUser.username;
            };


            const collector1 = question.createReactionCollector(filter1,
                {max: 1, time: 60000
            });

            collector1.on('end', (collected, reason) => {
                if (reason === 'time') {
                    message.channel.send(`<@${taggedUser.id}> didn't respond..`);
                    taggedAnswer = undefined;
                } else {
                    taggedAnswer = collected.array()[0];
                    taggedAnswer = taggedAnswer._emoji.name;
                }
            });
        });


        message.author.send(embed).then((question) => {
            question.react(emote1);
            question.react(emote2);
            question.react(emote3);
            question.react(emote4);
            question.react(emote5);

            const filter2 = (reaction, user) => {
                return emotes.includes(reaction.emoji.name) && !user.bot && user.username==message.author.username;
            };


            const collector2 = question.createReactionCollector(filter2,
                {max: 1, time: 60000
            });

            collector2.on('end', (collected, reason) => {
                if (reason === 'time') {
                    message.channel.send(`${message.author} didn't respond. How irresponsible!`);
                    userAnswer = undefined;
                } else {
                    userAnswer = collected.array()[0];
                    userAnswer = userAnswer._emoji.name;
                }
            });
        });


        myVar = setTimeout(cont, 60000);
        mySecondVar = setInterval(check, 3000);

        function check(){
            if(taggedAnswer !== undefined && userAnswer !== undefined){
                clearTimeout(myVar);
                clearInterval(mySecondVar);
                cont();
            }
        }

        function cont() {
            if(taggedAnswer === undefined || userAnswer === undefined){

            } else if(taggedAnswer !== userAnswer) {
                message.channel.send("Your mental connection is weak...");
            } else {
                message.channel.send("Your mental connection is strong!");
            }
        }

    }

}
