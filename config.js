module.exports = {

  // Your bot name. Typically, this is your bot's username without the discriminator.
  // i.e: if your bot's username is MemeBot#0420, then this option would be MemeBot.
  name: "Tanya",

  // The bot's command prefix. The bot will recognize as command any message that begins with it.
  // i.e: "-tanya foo" will trigger the command "foo",
  //      whereas "Tanya foo" will do nothing at all.
  prefix:  "-tanya",

  // Your bot's user token. If you don't know what that is, go here:
  // https://discordapp.com/developers/applications/me
  // Then create a new application and grab your token.
  token: "Mjg1NDY1ODk3ODgyMjIyNTkz.C5SkYQ.mQwh4EAuEm4mhmWY6g3dbIY5ZS8",

  // If this option is enabled, the bot will delete the message that triggered it, and its own
  // response, after the specified amount of time has passed.
  // Enable this if you don't want your channel to be flooded with bot messages.
  // ATTENTION! In order for this to work, you need to give your bot the following permission:
  // MANAGE_MESSAGES - 	0x00002000
  // More info: https://discordapp.com/developers/docs/topics/permissions
  deleteAfterReply: {
    enabled: true,
    time: 10000, // In milliseconds
  }
};
