const fs = require('fs');

module.exports= {
    name: 'coinflip',
    description: "Heads or tails?",
    usage: "$coinflip \t||\t $cf \n\n",
     execute(message, args){
        

        const answers = ["Heads.", "Heads.", "Heads.", "Heads.", "Heads.", "Heads.", "Tails.", "Tails.", "Tails.", "Tails.", "Tails.", "Tails.", "Oops, it rolled into a crack..."];
        
        

        var randAns = answers => answers[Math.floor(Math.random()*answers.length)];

        message.channel.send(randAns(answers));


    }
}
