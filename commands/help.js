const fs = require('fs');

module.exports= {
    name: 'help',
    description: "Description: Sends a proper usage log to the chat",
    usage: "Usage: $help\n\n",
     execute(message, args){
        var namelist = "";
        var desclist = "";
        var usage = "";

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        let result = commandFiles.forEach((file, i) => {
            let props = require(`./${file}`);
            namelist = props.name;
            desclist = props.description;
            usage = props.usage;

            // send help text
            message.channel.send(`**${namelist}** \n${desclist} \n${usage}`);
        });
        
    }
}