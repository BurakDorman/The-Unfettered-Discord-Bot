module.exports = {
    Captcha: require("./Captcha"),
    createCaptcha: require("./createCaptcha")
}

const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent, //IMPORTANT: make sure you enable "Message Content Intent" in the dev portal!
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.DirectMessages,
    ]
});
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
	// customPromptEmbed: new MessageEmbed({
	// 	color:"GREEN",

	// }), //customise the embed that will be sent to the user when the captcha is requested
	// customSuccessEmbed: new MessageEmbed({
	// 	color: "GREEN",

	// }), //customise the embed that will be sent to the user when the captcha is solved
	// customFailureEmbed: new MessageEmbed({
	// 	color: "GREEN",

	// }), //customise the embed that will be sent to the user when they fail to solve the captcha
});
// captcha.on("success", message => {
// 	var role = message.member.roles.cache.find(role => role.name === "verified");
// 	if (!role) return;
// 	message.member.guild.roles.add(role);
// });

client.on("guildMemberAdd", async member => {
    //in your bot application in the dev portal, make sure you have intents turned on!
    captcha.present(member); //captcha is created by the package, and sent to the member
});

client.login(process.env.token)
