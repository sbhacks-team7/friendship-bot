const Discord = require('discord.js');
const fs = require('fs');

module.exports= {
    name: 'help',
    description: "Sends a proper usage log to the chat",
    usage: "$help \t||\t $\n\n",
    execute(message, args){
        var list = [];

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
        let result = commandFiles.forEach((file, i) => {
            let props = require(`./${file}`);
            var command = {
                name: props.usage,
                value: props.description,
            };

            list.push(command);
        });

        const embed = new Discord.MessageEmbed()
            .setColor('#ff6666')
            .setAuthor('Dachi Help')
            .setDescription('**Full Command List**')
            .addFields(
                list
            )
            .setFooter('Thanks for using Dachi 💖')
        message.channel.send(embed)
   }
}
