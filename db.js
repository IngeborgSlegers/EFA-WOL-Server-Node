const Sequelize = require('sequelize');

const sequelize = new Sequelize('workoutlog', 'postgres', 'PostgresOwl3140_', {
  host: 'localhost',
  dialect: 'postgres'
})

sequelize.authenticate().then(
  success = () => console.log("Connected to WoL DB"),
  fail = (err) => console.log(`Error: ${err}`)
)

//model imports
const Users = sequelize.import('./models/user');
const Logs = sequelize.import('./models/log');

// Associating the Users has many logs, and logs belong to users
// give the logs model a userId column
Users.hasMany(Logs);
Logs.belongsTo(Users);

module.exports = sequelize;