module.exports.run = async (gideon, message, args) => {
    if (message.author.id !== '224617799434108928') {
        return message.channel.send('You do not have the required permissions to use this command!');
    }

    try {
        // Rejoin the parameters
        const code = args.join(' ');
        // Evaluate the JavaScript
        const returnedValue = eval(code);

        // If nothing was returned, say so.
        if (typeof returnedValue === 'undefined') {
            message.channel.send('The evaluated code returned nothing.');
            return;
        }

        // Generate a string worthy of being printed.
        let printValue;

        if (typeof returnedValue === 'string') {
            // Return the string if the result was a string
            printValue = returnedValue;
        } else if (typeof returnedValue === 'object') {
            // Return the object if the result is an object, an instance of a class, basically anything JavaScript loves.
            printValue = JSON.stringify(returnedValue, null, 2);
        } else {
            // Force turn the thing into a String.
            printValue = new String(returnedValue);
        }

        // Send the returned value.
        message.channel.send(printValue, {
            code: true
        });
    } catch (e) {
        message.channel.send(`An error occured while processing your request: \`\`\`\n${e.stack}\n\`\`\``);
    }
}

module.exports.help = {
    name: 'eval'
}
