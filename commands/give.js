const fs = require('fs');

module.exports= {
    name: 'give',
    description: "Description: Gives a gift to the mentioned user",
    usage: "Usage: $give [@mention]\n\n",
     execute(message, args){
        if (!message.mentions.users.size || message.mentions.users.size > 1) {
            return message.reply('you need to tag one user in order to give a gift them!');
        }        
        const taggedUser = message.mentions.users.first();
        //message.channel.send(`${message.author} hugged ${taggedUser.username}!`);
        //message.react('👍').catch(() => console.error('Failed to react.'));

        message.channel.send("<@"+ `${taggedUser.id}` + ">, do you accept this gift?").then((question) => {
            // Have our bot guide the user by reacting with the correct reactions
            question.react('👍');
            question.react('👎');
      
            // Set a filter to ONLY grab those reactions & discard the reactions from the bot
            const filter = (reaction, user) => {
              return ['👍', '👎'].includes(reaction.emoji.name) && !user.bot && user.username==taggedUser.username;
            };
      
            // Create the collector
            const collector = question.createReactionCollector(filter, {
              max: 1,
              time: 60000
            });
      
            collector.on('end', (collected, reason) => {
              if (reason === 'time') {
                message.reply('Too late! Ran out of time...');
              } else {
                // Grab the first reaction in the array
                let userReaction = collected.array()[0];
                // Grab the name of the reaction (which is the emoji itself)
                let emoji = userReaction._emoji.name;
      
                // Handle accordingly
                if (emoji === '👍') {
                    message.channel.send(`Rejoice ${message.author}!` +" The gift has been accepted by <@" +`${taggedUser.id}` + ">!");
                } else if (emoji === '👎') {
                    message.channel.send(`Sorry, ${message.author} your gift has been rejected by ` + "<@" + `${taggedUser.id}` + ">...");
                } else {
                  // This should be filtered out, but handle it just in case
                  message.channel.send(`I dont understand ${emoji}...`);
                }
              }
            });
          });

    }
}