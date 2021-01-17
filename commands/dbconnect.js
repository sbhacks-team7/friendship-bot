const {mongodb_uri} = process.env.mongodb_uri;
const {MongoClient} = require('mongodb');

const client = new MongoClient(mongodb_uri, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports= {
    name: 'dbconnect',
    description: "Function that tests connection to mongoDB",
    usage: "$dbconnect",
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
