require('dotenv').config()
// require the discord.js module
const Discord = require('discord.js')
// create a new Discord client. Lets bot connect to server and communicate with discord.js library
const client = new Discord.Client()
const fetch = require("node-fetch")
let db
const sadTimes = ["sad", "shitty", "depressed"]
// when the client is ready, run this code
// this event will only trigger one time after logging in (when it is ready, tho it will execute only once)
client.once('ready', () => {
	console.log(`Hello! I am ${client.user.tag}!`)
});


//Similar to once, but can trigger multiple times.
client.on('message', async(msg) =>{

    if(msg.author.bot) return

    if(sadTimes.some(term => msg.content.includes(term)) && Math.floor(Math.random()*10) === 1)
        msg.reply('EMERGENCY HUG!')

    if(msg.content === '!ping')
        msg.reply('pong!');
        
    else if(msg.content.startsWith('!remind')){
        //message content, will turn into time information
        let command = msg.content.substring(7).trim()
        //determines if there is another arguments
        let spaceIndex = command.indexOf(' ');
        //The reminder's content
        let description = (spaceIndex ==-1) ?  "" : command.substring(spaceIndex+1)
        command = (spaceIndex == -1) ? command : command.substring(0,spaceIndex)


        const regex = /^((\d+y{1})?(\d+mo{1})?(\d+w{1})?(\d+d{1})?(\d+h{1})?(\d+m{1})?(\d+s{1})?)$/g
        //command = regex.exec(command)
        command = command.match(regex)[0]
        console.log(command)
        if(command){
            try{
                let tstamp = splitTime(command)
                console.log(tstamp);
                /*await db.query(
                    `INSERT INTO Reminders(description, time) VALUES ('${description}', date_add(CURRENT_TIMESTAMP,interval '1:45' hour_minute))`
                )*/
            } catch(err){
                console.log(err)
            }
            msg.reply(command);
        }
        else
            msg.reply("The format of the inputted arguments are invalid, please format your reminder as follows: \n"
                    + "If you want a reminder in 1 hour and 20 minutes : !remind 1h20m <description> \n")
    }
});
// login to Discord with your app's token
/*
function toMinutes(inString){
    let minutes = 0
    minutes += command.match(/(\d+m)+/g).slice(0,-1);
}
*/

const splitTime = (string) => {
    console.log(string);
    const arr = [];
    const regexVar = ["y", "mo", "w", "d", "h", "m", "s"]
    regexVar.forEach(variable =>{
        let regex = new RegExp("\\d+" + variable + "{1}","g")
        let tStampComponent = string.match(regex)
        //console.log(tStampComponent)
        if(tStampComponent)
            arr.push(tStampComponent[0].slice(0,-variable.length))
        else
            arr.push(0)
    })
    console.log(arr)
    return arr.join(":")
};


(async() => {
    db = await require("../database/db")
    await client.login(process.env.TOKEN)
})();