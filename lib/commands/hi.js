var Clapp = require('../modules/clapp-discord');

module.exports = new Clapp.Command({
  name: "hi",
  desc: "greeting",
  fn: (argv, context) => {
    // This output will be redirected to your app's onReply function
    return 'hey there!';
  }
});
