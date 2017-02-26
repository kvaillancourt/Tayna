// var Clapp = require('../modules/clapp-discord');
// const sql = require('sqlite');
// sql.open('./score.sqlite');


// module.exports = new Clapp.Command({
//   name: "level",
//   desc: "displays your level",
//   fn: (argv, context) => {
//     // This output will be redirected to your app's onReply function
    
//   // console.log(context["msg"]["author"]["bot"]);
//   // return; 
//   if (context["msg"]["author"]["bot"]) return;
//   console.log("0"); 
//   var author_id = context["msg"]["author"]["id"]; 

//   // if (context["msg"]["Message"]["channel"]["TextChannel"]["type"] !== 'text') return;
//   //check to see if the user is in the points database. 
//   sql.get(`SELECT * FROM scores WHERE userId ='${author_id}'`).then(row => {
//     if (!row) {
//       // add in the user
//       console.log("1"); 
//       sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [author_id, 1, 0]);
//     } else {
//       console.log("2"); 

//       //caluclate points of already existing user 
//       let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
//       if (curLevel > row.level) {
//         console.log("3"); 
//         row.level = curLevel;
//         sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${argv.author.id}`);
//         return "You've leveled up to level **"+`${curLevel}`+"**! Ain't that dandy?";
//       }
//       console.log("4"); 
//       sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${author_id}`);
//     }
//   }).catch(() => {
//     console.log("5"); 
//     //create a table if one does not exist
//     console.error;
//     sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)').then(() => {
//       sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [author_id, 1, 0]);
//     });
//   });

//   sql.get(`SELECT * FROM scores WHERE userId ='${author_id}'`).then(row => {
//     if (!row) {
//     console.log("6"); 

//       return  "Your current level is 0";
//     } 
//     else {
//           console.log("7"); 
//           var answer = 'Your current level is ' +`${row.level}`; 
//           console.log(answer)
//       return 'Your current level is ' +`${row.level}`;
//     }
//   });

//   }
// });

