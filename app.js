const express = require('express');
const app = express();
const sequelize = require('./db');
const bodyparser = require('body-parser');
const user = require('./controllers/usercontroller');
const log = require('./controllers/logcontroller');

sequelize.sync();
app.use(require('./middleware/headers'));
app.use(bodyparser.json());
app.use('/user', user);
app.use(require('./middleware/validate-session'));
app.use('/log', log);

app.listen(3000, () => console.log("App is listening on 3000"))