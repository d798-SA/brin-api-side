const express = require('express');
const bodyParser = require('body-parser');
const bcryptNodejs = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const singIn = require('./controllers/singIn');
const getProfile = require('./controllers/getProfile');
const getImage = require('./controllers/getImage');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: '12345',
        database: ''
    }
});


const app = express();

app.use(bodyParser.json());
app.use(cors())




app.get('/', (req, res) => {
    res.send(dataBase.users)
})

app.post('/singIn', singIn.handleSingIn(db, bcryptNodejs));

app.get('/profile/:id', getProfile.handleSingGetProfile(db))




app.post('/register', register.handleRegister(db, bcryptNodejs));

app.put('/image', getImage.handleGetImage(db))
app.post('/imageurl', (req , res) => getImage.handleApiCall(req , res))

// const PORT = process.env.PORT;

app.listen(process.env.PORT || 3000, () => {
    console.log(`running very well... ${process.env.PORT}`);
});





