const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES] });
const { Captcha } = require("discord.js-captcha");

const captcha = new Captcha(client, {
	guildID: "915296741471957064",
	roleID: "1019603474394136626", //optional
	channelID: "1020993750610223124", //optional
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
	captcha.present(member);
});

client.login("MTAyMDc2Nzc3MTEzMjQ0ODg4MA.GaeEee.cJSdvc7htUd8EMKGjBIHft2X_D9MNL-LKuZu3g")