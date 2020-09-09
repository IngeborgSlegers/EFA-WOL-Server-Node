require('dotenv').config();

const express = require('express');
const app = express();
const sequelize = require('./db');

const user = require('./controllers/usercontroller');
const log = require('./controllers/logcontroller');

sequelize.sync();
app.use(require('./middleware/headers'));
app.use(express.json());
app.use('/user', user);
app.use(require('./middleware/validate-session'));
app.use('/log', log);

app.listen(process.env.PORT, () => console.log(`App is listening on ${process.env.PORT}`))