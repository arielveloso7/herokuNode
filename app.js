import express from 'express';
import cors from 'cors';
import data from './data/seeds.js';

let isLogin = false;

const app = express();

/* GET ... traer información
PUT ... actualizar información
POST ... inserta información
DELETE ... elimina información
 */

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    if (req.body.user !== undefined && req.body.password !== undefined)
        isLogin = true;

    return next();
})

app.use((req, res, next) => {
    if (isLogin) {
        return next();
    } else {
        res.status(401).json({ 'error': 'you are not logged in' })
    }
})

app.post('/login', (req, res) => {
    res.json({ 'message': 'you are logged in' });
})

app.get('/api/persons', (req, res) => {
    res.json(data);
})

app.post('/api/persons', (req, res) => {
    console.log(req.body);
    if (req.body.name === '' || req.body.number === '') {
        res.status(400).json({ 'error': 'some data is missing' })
    } else if (data.some(person => person.name === req.body.name)) {
        res.status(409).json({ 'error': 'name must be unique' })
    } else {

        const id = Math.floor(Math.random() * 1000000);
        const person = req.body;
        person.id = id;

        data.push(person);
        console.log(data);
        res.json(person);
    }
})

//A node le puedo definir una serie de variables, en este caso le defino PORT
const PORT = process.env.PORT || 9000; //PORT es igual a lo que node tiene guardado en memoria o sino 9000

app.listen(PORT, () => console.log('Server stars on port 9000'));

//INSTALAR HEROKU
