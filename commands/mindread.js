const Discord = require('discord.js');
const fs = require('fs');

module.exports= {
    name: 'mindread',
    description: "Description: Sees if two users can read each others' minds!",
    usage: "Usage: $mindread [@mention]\n\n",
     execute(message, args){
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to read their mind!');
        }        
        const taggedUser = message.mentions.users.first();
        let userReaction1, userReaction2;
        const embed = new Discord.MessageEmbed()
            
            .setDescription("Do you accept this gift? 😊");
        
        message.taggedUser.send(embed).then((question) => {
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
                } else {
                  userReaction1 = collected.array()[0];
                 
                }
            });
        });

        message.author.send(embed).then((question) => {
            question.react('👍');
            question.react('👎');
        
            const filter2 = (reaction, user) => {
                return ['👍', '👎'].includes(reaction.emoji.name) && !user.bot && user.username==message.author.username;
            };
    
    
            const collector2 = question.dmChannel.createReactionCollector(filter2, 
                {max: 1, time: 60000
            });

            collector2.on('end', (collected, reason) => {
                if (reason === 'time') {
                  message.reply('Too late! Ran out of time...');
                } else {
                  userReaction2 = collected.array()[0];
                 
                  if(userReaction1 === userReaction2) {
                    message.channel.send("Your mental connection is strong!");
                  } else {
                    message.channel.send("Mindread failed...");
                }
                }
            });
        });

       
    
    }

}
