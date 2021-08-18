require('dotenv').config()
// require the discord.js module
const Discord = require('discord.js')
// create a new Discord client. Lets bot connect to server and communicate with discord.js library
const client = new Discord.Client()
const fetch = require("node-fetch")
const db = require("../database/db")
const sadTimes = ["sad", "shitty", "depressed"]
// when the client is ready, run this code
// this event will only trigger one time after logging in (when it is ready, tho it will execute only once)
client.once('ready', () => {
	console.log(`Hello! I am ${client.user.tag}!`)
});


//Similar to once, but can trigger multiple times.
client.on('message', msg =>{

    if(msg.author.bot) return

    if(sadTimes.some(term => msg.content.includes(term)) && Math.floor(Math.random()*10) === 1)
        msg.reply('EMERGENCY HUG!')

    if(msg.content === '!ping')
        msg.reply('pong');
        
    else if(msg.content.startsWith('!remind')){
        let command = msg.content.substring(7).trim()
        msg.reply(command);
    }
});
// login to Discord with your app's token
client.login(process.env.TOKEN)