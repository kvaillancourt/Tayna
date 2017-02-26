var Clapp = require('../modules/clapp-discord');

module.exports = new Clapp.Command({
  name: "ttt",
  desc: "tic tac toe",
  fn: (argv, context) => {
    // This output will be redirected to your app's onReply function
    if (argv.args.xcord != 'notdefined' && argv.args.ycord != 'notdefined'){
      return 'you asked me to play  (' + argv.args.xcord + ", " + argv.args.ycord + ")."; 
    } else {
      return 'lets play!'; 
    }
  },
  args: [
    {
      name: 'xcord',
      desc: 'A test argument',
      type: 'string',
      required: false,
      default: 'notdefined'
    },
    {
      name: 'ycord',
      desc: 'A test argument',
      type: 'string',
      required: false,
      default: 'notdefined'
    }
  ]
});