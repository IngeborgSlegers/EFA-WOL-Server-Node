const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost/workoutlog`, {
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