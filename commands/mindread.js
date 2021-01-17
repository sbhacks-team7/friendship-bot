const Discord = require('discord.js');
const fs = require('fs');

module.exports= {
    name: 'mindread',
    description: "Sees if two users can read each others' minds!",
    usage: "$mindread [@mention]\n\n",
    execute(message, args){
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to read their mind!');
        }        
        const taggedUser = message.mentions.users.first();
        if(taggedUser===null || taggedUser === undefined){
            console.log("tagged user was null");
        }

        const challenge = new Discord.MessageEmbed().setDescription(`${message.author} has issued as mindreading challenge to <@` + `${taggedUser.id}` +">!");
        message.channel.send(challenge);

        const embed = new Discord.MessageEmbed()
            .setDescription("Do you accept this gift? 😊");
        
        var taggedAnswer;
        var userAnswer;

        taggedUser.send(embed).then((question) => {
            question.react('👍');
            question.react('👎');
        
            const filter1 = (reaction, user) => {
                return ['👍', '👎'].includes(reaction.emoji.name) && !user.bot && user.username==taggedUser.username;
            };

        
            const collector1 = question.createReactionCollector(filter1, 
                {max: 1, time: 60000
            });

            collector1.on('end', (collected, reason) => {
                if (reason === 'time') {
                    message.reply('Too late! Ran out of time...');
                    taggedAnswer = undefined;
                } else {
                    console.log(reason);
                    taggedAnswer = collected.array()[0];
                    taggedAnswer = taggedAnswer._emoji.name;
                }
            });
        });
        

        message.author.send(embed).then((question) => {
            question.react('👍');
            question.react('👎');
        
            const filter2 = (reaction, user) => {
                return ['👍', '👎'].includes(reaction.emoji.name) && !user.bot && user.username==message.author.username;
            };
    
    
            const collector2 = question.createReactionCollector(filter2, 
                {max: 1, time: 60000
            });

            collector2.on('end', (collected, reason) => {
                if (reason === 'time') {
                    message.reply('Too late! Ran out of time...');
                    userAnswer = undefined;
                } else {
                    console.log(reason);
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
            console.log("Tagged asnwer: " + taggedAnswer);
            console.log("\nUser answer: " + userAnswer + "\n");
            if(taggedAnswer === undefined || userAnswer === undefined || taggedAnswer !== userAnswer) {
                message.channel.send("Your mental connection is weak...");
            } else {
                message.channel.send("Your mental connection is strong!");
            }
        }
    
    }

}
