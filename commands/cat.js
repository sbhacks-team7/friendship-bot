const fs = require('fs');
const fetch = require('node-fetch');

module.exports= {
    name: 'cat',
    description: "Sends a cat!",
    usage: "$cat \n\n",
    async execute(message, args){
        
        const {file} = await fetch('https://aws.random.cat/meow').then(response=>response.json());
         message.channel.send(file);

    }
}
