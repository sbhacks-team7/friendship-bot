const fs = require('fs');

module.exports= {
    name: 'magic8ball',
    description: "Ask the magic 8 ball!",
    usage: "$magic8ball [question] \t||\t $8 [question]\n\n",
     execute(message, args){
        


        const input = message.content.slice(11);

        if(!input) {
            return message.reply('you need to ask a question!');
        }

        const answers = ["It is certain.", "It is decidely so.", "Without a doubt.", "Yes -- definitely.", "You may rely on it.", 
                         "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", 
                         "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.",
                         "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."];
        
        

        var randAns = answers => answers[Math.floor(Math.random()*answers.length)];

        message.channel.send(randAns(answers));


    }
}