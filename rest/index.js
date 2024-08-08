const express = require('express');
const db = require('./core/dbLib/db.connect');
const middleware = require('./core/middleware/verifyUser');

const app = express.Router();
db.connect(true);

app.use('/login', require('./core/login/login').apiLogin);
app.use('/signup', require('./core/login/login').apiSignUp);
app.use('/resetpass', require('./core/login/login').apiResetPass);

app.use('/menu', require('./modules/Menu/menu.routes'));
app.use('/products', require('./modules/Instructor/instructor.routes'));
app.all('*', middleware.verifyToken);

module.exports = app;
