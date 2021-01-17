const {mongodb_uri} = require('../config.json');
const {MongoClient} = require('mongodb');

const client = new MongoClient(mongodb_uri, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports= {
    name: 'dbconnect',
    description: "Function that connects to DB",
    usage: "!dbconnect",
     async execute(message, args){
         try {
             await client.connect();
             console.log('Client connected to MongoDB!');
             message.channel.send('Client connected to MongoDB!');
         } catch(e) {
             console.error(e);
         } finally {
             await client.close();
         }
    }
}
