const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const prefix = config.prefix;
const token = config.token;

client.login(token)

client.once('ready', ()=>{
    console.log("Hello World!")
})

client.on('message', (message)=>{
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).split(/ +/)
        const command = args.shift().toLowerCase()
        // moderation cmds
        if (command === "ban") {
            if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("No perms")
            let member = message.mentions.members.first();
            if(member){
                try{
                    member.ban()
                    message.channel.send(`${member} was banned!`)
                }catch(err) {
                    console.log(err)
                }
            }else{
                message.channel.send("No member")
            }
            return;
        }else if(command === "kick"){
            if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("No perms")
            let member = message.mentions.members.first();
            if(member){
                try{
                    member.kick()
                    message.channel.send(`${member} was kicked!`)
                }catch(err) {
                    console.log(err)
                }
            }else{
                message.channel.send("No member")
            }
            return;
        }else if (command === "mute") {
            if (!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send("No perms")
            member = message.mentions.members.first();
            const role = message.guild.roles.cache.get('id');
            if (member) {
                if (role) {
                    try {
                        member.roles.add(role)
                        message.channel.send(`${member} was banned!`)
                    } catch (err) {
                        console.log(err)
                    }
                }else{
                    message.channel.send("No role")
                }
            }else{
                message.channel.send("No member")
            }
            return;
        }

        // fun cmds
        else if(command === "meme"){
            const randomNumber = Math.floor(Math.random() * 50);
            message.channel.send({files: [`./images/${randomNumber}`]})
            return;
        }
    }
})