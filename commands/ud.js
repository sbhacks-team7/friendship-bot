const { listenerCount } = require('events');
const fs = require('fs');
const fetch = require('node-fetch');
const querystring = require('querystring');
const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
const Discord = require('discord.js');



module.exports= {
    name: 'urbandictionary',
    description: "Looks up a term on Urban Dictionary!",
    usage: "$urbandictionary [wordOrPhraseToLookUp] \t||\t $ud [wordOrPhraseToLookUp]\n\n",
    async execute(message, args){

        if(!args.length) {
            return message.channel.send('Please enter a term to search!');
        }
        
        const query = querystring.stringify({term: args.join(' ')});
        
        const {list} = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response=>response.json());
        if(!list.length) {
            return message.channel.send('No results found!');

        }

        const [answer] = list;

        const embed = new Discord.MessageEmbed()
	        .setColor('#79D3EA')
	        .setTitle(answer.word)
    	    .setURL(answer.permalink)
	        .addFields(
		        { name: 'Definition', value: trim(answer.definition, 1024) },
		        { name: 'Example', value: trim(answer.example, 1024) },
		        { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` }
	    );

        message.channel.send(embed);

    }


}
