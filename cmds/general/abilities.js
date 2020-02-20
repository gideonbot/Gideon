const Discord = require("discord.js");
const Pagination = require('discord-paginationembed');
const Util = require("../../Util");

/**
 * @param {Discord.Client} gideon
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (gideon, message, args) => {
    const ia = new Discord.MessageEmbed()
    .setColor('#2791D3')
    .setTitle(`${args[0]} is not a valid argument!`)
    
    .setFooter(Util.config.footer, gideon.user.avatarURL());

    if (!args[0]) {
        const cmdinfo = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__You can check the list of available commands below:__')
        .addField('!abilities speedster', 'Displays Speedster abilities')  
        .addField('!abilities viber', 'Displays Viber abilities')  
        .addField('!abilities kryptonian', 'Displays Kryptonian abilities')  
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        message.channel.send(cmdinfo);
    } else if (args[0].match(/(?:speedster)/i)) {
        const sp1 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField('Speed Force connection/Meta-human physiology', 'Speedsters powers come from a connection to the Speed Force, this alteres and supercharges their DNA, cells, and neurotransmitters, augmenting their physiology.', true)  
        .addField('Accelerated healing factor', 'Without treatment, most damage heals in hours if not minutes with no lingering signs. Even normally permanent damage, like paraplegia, is completely repaired in days.', true)  
        .addField('Bodily vibration', 'Speedsters can vibrate their body for various effects.', true)  
        .addField('Seismokinesis', 'By vibrating at varying frequencies and with different levels of force, speedsters can create small tremors to induce extreme amounts of jolt on any target they touch.', true)  
        .addField('Intangibility', ' By vibrating their molecules at the frequency of air, speedsters can physically pass through solid matter.', true) 
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const sp2 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField('Invisibility', 'Speedsters can vibrate their body so fast that they can no longer be perceived by the human eye.', true)
        .addField('Electrokinesis', 'Speedsters can produce electricity in various colors, their Speed Force energy, from their body. It is commonly seen when running to boost their already immense speed to far higher levels.', true)
        .addField('Speed Force sharing (Unique to Barry Allen)', 'Barry can expand his Speed Force aura to protect others he carries while moving at super speed.', true)
        .addField('Superhuman strength', 'Speedsters physical strength has been heightened beyond that of normal human capacities.', true)
        .addField('Superhuman durability', 'Speedsters possess inhuman resilience, most commonly seen from being unaffected by momentum build-up. They can take attacks and exertion, even survive impacts that would easily kill normal humans.', true)   
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const sp3 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField('Superhuman mental process', 'A Speedsters powers also make their system and thought processing able to take in and retain information just as fast and efficiently. Even while using their raw speed, they can clearly think, react to events, and perform actions long before normal humans can perceive them.', true)  
        .addField('Superhuman perceptions', 'A Speedsters senses are also enhanced. This allows them to perceive the world as if it is nearly frozen. They can see and hear normally, even while moving at speeds faster than sound, where this would normally be impossible.', true)  
        .addField('Superhuman speed', 'Speedsters can move at such vast speeds, indeterminable to the naked eye. ')  
        .addField('Superhuman agility', 'Speedsters possess flawless coordination, equilibrium and dexterity, they can change direction with immediate sharp turns without sliding or losing balance and instantly stop running on the spot.', true)
        .addField('Superhuman reflexes', 'A Speedsters reaction time is augmented to superhuman levels, allowing them to react to danger and events far faster than normal humans.', true)
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const sp4 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField('Superhuman momentum', 'Speedsters can generate great amounts of physical force through kinetic energy, simulating superhuman strength, even in a stationary position.', true)
        .addField('Aerokinesis', 'Speedsters can use their speed to generate air flows on various levels and for various effects.', true)
        .addField('Time travel', 'The kinetic energy buildup from a speedsters speed can allow them to breach the space-time continuum, allowing them to physically enter the Speed Force and travel through time.', true)
        .addField('Time reversal (Unique to Nora West-Allen)', 'Nora is able to reverse time around her while running, remaining completely unaffected.', true)
        .addField('Interdimensional travel', 'Speedsters can move fast enough to break open portals between dimensions, allowing them to travel to different universes.', true)
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const sp5 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField('Speed mirages', 'Speedsters can generate illusions of themselves to make it appear as if they were in many places at once, when in reality they are simply bouncing back and forth too fast for the human mind to perceive the difference.', true)
        .addField('Temporal regression (Unique to Barry Allen)', 'With his ability to shift through time, Barry can also reverse the flow effects while running at a certain speed, while he remains completely unaffected.', true)
        .addField('Temporal dilution (Unique to Barry Allen & Nora West-Allen)', 'By generating enough energy, Barry and Nora can move so fast that time essentially slows down relative to them, to a complete standstill.', true)
        .addField('Time remnant construct', 'Speedsters are able to "create" a time remnant by traveling back to moments before their current-self time travels, hailing from a future that no longer exists. This allows them to be two places at once.', true)
        .addField('Temporal awareness', 'Speedsters are able to subconsciously detect when other speedsters enter the Speed Force to time travel.')
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const sp6 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Speedsters possess the following abilities:__')
        .addField('Speed Force awareness', 'With concentration, speedsters can sense the Speed Force in another speedster\'s system.', true)
        .addField('Superhuman stamina', 'Speedsters can handle the stresses of extreme racing without noticeable distress, letting them function much longer than normal humans unhindered. Their enhanced stamina is due to their augmented physiology, which builds up little to no lactic acid or fatigue toxins.', true)
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const spembeds = [sp1, sp2, sp3, sp4, sp5, sp6];
        
        new Pagination.Embeds()
        .setArray(spembeds)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setPageIndicator(true)
        .setPage(1)
        .build();
    } else if (args[0].match(/(?:viber)/i)) {
        const viber = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Vibers possess the following abilities:__') 
        .addField('Meta-human physiology', 'Vibers possess altered DNA and physiology to access dimensional energy.', true)  
        .addField('Dimensional energy manipulation', 'Vibers have a psychic link to the natural energies of reality, allowing them to connect with various vibrations of the multiverse and manipulate them for various effects.', true)  
        .addField('Dimensional awareness', 'Known as "vibing", vibers can perceive various events throughout time and space, letting them see into the past and future as well as parallel dimensions, even into the very Speed Force itself.', true)  
        .addField('Interdimensional travel', 'With their natural connection to the multiverse, vibers can open portals to other dimensions. Being a noticeably more advanced ability, they are shown to need focus and a proper awareness of their intended target.', true)
        .addField('Vibrational blasts', 'Vibers are able to generate powerful blue or red concussive blasts of vibrations from their hands capable of propelling full-grown humans through the air.', true)
        .addField('Mental connection', 'Vibers are connected by their powers and are able to observe each other if they\'re skilled enough.', true)
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        message.channel.send(viber);
    } else if (args[0].match(/(?:kryptonian)/i)) {
        const kr1 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField('Kryptonian physiology', 'A kryptonians capabilities are no greater than those of a human. However, once charged by the energy spectrum of a yellow sun, they become able to perform various inhuman feats.', true)  
        .addField('Solar energy absorption', 'Kryptonian powers are dependent on the energy spectrum from a yellow sun, their body is able to constantly and passively absorb such energy while exposed to it, essentially keeping their reserves fully charged near-constantly.', true)  
        .addField('Accelerated healing factor', 'Kryptonian metabolism is tremendously enhanced by solar energy, allowing accelerated healing abilities and burning calories at a superhuman rate, making them practically immune to becoming fat or obese.', true)        
        .addField('Contaminant immunity', 'Kryptonians have an immunity to all forms of disease and contaminants on Earth.', true)        
        .addField('Resurrection', ' After they die, kryptonians are able to self-resurrect by absorbing solar energy from flora in their vicinity.', true)               
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const kr2 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField('Flight', 'Kryptonians are able to manipulate their own gravitational field to generate thrust and propel themselves through the air, often at hyper-sonic speeds, much faster than they can travel by foot.', true)  
        .addField('Sleep flight', 'Kryptonians have the ability to float in the air while they sleep.', true)  
        .addField('Levitation', 'Kryptonians can levitate using their flight abilities.', true)        
        .addField('Heat vision', 'By concentrating every solar energy reserve they have in their body, kryptonians can emit blue or red energy beams of variable intensity and temperature from their eyes.', true)        
        .addField('Invulnerability', 'Kryptonians are essentially invulnerable to all Earthly weapons, with bullets simply ricocheting whenever they come into contact with their skin.', true)               
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const kr3 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField('Extreme heat resistance', 'Kryptonians feel no pain when exposed to extreme heat.', true)  
        .addField('Self-sustenance', 'Due to the effects of a yellow sun, a kryptonians physical needs are greatly reduced.', true)  
        .addField('Atmospheric adaption', 'While kryptonians do require oxygen, their physicality and exposure to a yellow sun allows them to survive while inhaling more harsh forms of it such as the thin, highly CO2-concentrated, atmosphere of Mars.', true)        
        .addField('Reverse photosynthesis', 'Kryptonians are capable of draining solar energy from plants even without a direct source of light.', true)        
        .addField('Super vision', 'Kryptonians are able to see very far distances, presumably at peak human or low superhuman levels. They are even able to see clearly in the dark.', true)               
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const kr4 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField('X-ray vision', 'Kryptonians possess the ability to see through objects, except for lead.', true)  
        .addField('Super breath', 'Kryptonians are able to exhale powerful gusts of air from their mouth which are similar to force winds. They can also cause the temperature of their breath to drop, therefore able to freeze nearly anything.', true)  
        .addField('Super hearing', 'Kryptonians have super-sensitive ears that can perfectly pick up sounds from miles away and even through structures.', true)        
        .addField('Super speed', 'Kryptonians possess the ability to move at hyper-sonic speeds, both through flight and on foot.', true)        
        .addField('Accelerated perception', 'While using their super speed, Kryptonians see everything much slower, allowing them to move with precision and accuracy within very fast moments.', true)               
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const kr5 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField('Super reflexes', 'A kryptonians reflexes are so fast, that they can respond to attacks within seconds.', true)  
        .addField('Time deceleration', 'When a kryptonian and a speedster (or another kryptonian) run/fly around the Earth in opposite directions, they are able to slow the Earth\'s rotation, along with time itself.', true)  
        .addField('Super strength', 'A kryptonians strength is enhanced under a yellow sun, enough to easily kill a normal human if they were to attack them directly.', true)        
        .addField('Thunderclap', 'When kryptonians use their super strength to clap their hands together, it creates a powerful shock-wave that throws enemies back.', true)        
        .addField('Super jumping/leaping', 'Kryptonians are able to jump several feet off the ground and leap several stories in a single bound without having to fly.', true)                     
        .setFooter(Util.config.footer, gideon.user.avatarURL());

        const kr6 = new Discord.MessageEmbed()
        .setColor('#2791D3')
        .setTitle('__Kryptonians possess the following abilities:\n(Only when exposed to a yellow sun\'s energy)__')
        .addField('Super stamina', 'Kryptonians can run, fight or fly for long periods of time, without getting tired.', true)  
        .addField('Extended longevity', 'A Kryptonians life span is considerably longer than a humans and they likewise age much slower.', true)  
        .addField('Telepathy immunity', 'Kryptonians are immune to most forms of telepathic powers.', true)  
        .addField('Power bestowal via electricity', 'If a kryptonian is holding a person while electrocuted by lightning, their kryptonian physiology allows them to affect the person, giving the person strange abilites.', true)                  
        .setFooter(Util.config.footer, gideon.user.avatarURL());
        
        const krembeds = [kr1, kr2, kr3, kr4, kr5, kr6];
        
        new Pagination.Embeds()
        .setArray(krembeds)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setPageIndicator(true)
        .setPage(1)
        .build();
    }
    else return message.channel.send(ia);
}   

module.exports.help = {
    name: ["abilities", "powers"],
    type: "general",
    help_text: "abilities <term>",
    help_desc: "Shows abilities of a following: <speedster | viber | kryptonian>"
}