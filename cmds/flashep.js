const Discord = module.require("discord.js");
const tvmaze = require('tvmaze-api-ts')

module.exports.run = async (gideon, message, args) => {  
    tvmaze.shows.episodebynumber('13', '5', '14').then(result => {
       // result.name
        
      })  
}

module.exports.help = {
    name: "flashep"
}