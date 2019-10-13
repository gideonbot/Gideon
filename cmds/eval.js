const Discord = module.require("discord.js");

module.exports.run = async (gideon, message, args) => {   
    if(message.author.id !== '224617799434108928') return message.channel.send('You don\'t have the required permissions to use this command!');

    function clean(text) {
        if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
        return text;
    }

    try {
        const code = args.join(" ");
        let evaled = eval(code);
   
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
   
        message.channel.send(clean(evaled), {code:"xl"});
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
}

module.exports.help = {
    name: "eval"
}