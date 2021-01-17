const fs = require('fs');

module.exports= {
    name: 'coinflip',
    description: "Description: Heads or tails?",
    usage: "Usage: $coinflip [question] \n\n",
     execute(message, args){
        

        const answers = ["Heads.", "Tails.", "Oops, it rolled into a crack..."];
        
        

        var randAns = answers => answers[Math.floor(Math.random()*answers.length)];

        message.channel.send(randAns(answers));


    }
}