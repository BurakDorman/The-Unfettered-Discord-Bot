module.exports = {
    Captcha: require("./Captcha"),
    createCaptcha: require("./createCaptcha")
}

const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES] });
const { Captcha } = require("discord.js-captcha");

const captcha = new Captcha(client, {
	guildID: "804098728952594432",
	roleID: "830880581540904970", //optional
	channelID: "804098950420103219", //optional
	sendToTextChannel: true, //optional, defaults to false
	addRoleOnSuccess: true, //optional, defaults to true. whether you want the bot to add the role to the user if the captcha is solved
	kickOnFailure: true, //optional, defaults to true. whether you want the bot to kick the user if the captcha is failed
	caseSensitive: true, //optional, defaults to true. whether you want the captcha responses to be case-sensitive
	attempts: 3, //optional, defaults to 1. number of attempts before captcha is considered to be failed
	timeout: 120000, //optional, defaults to 60000. time the user has to solve the captcha on each attempt in milliseconds
	showAttemptCount: true, //optional, defaults to true. whether to show the number of attempts left in embed footer
});

client.on("guildMemberAdd", async member => {
    //in your bot application in the dev portal, make sure you have intents turned on!
    captcha.present(member); //captcha is created by the package, and sent to the member
});

client.once('ready', () => {
    console.log('Ready!');
  client.user.setPresence({ activities: [{ name: 'Discord' }], status: 'idle' });
});

client.login(process.env.token)
