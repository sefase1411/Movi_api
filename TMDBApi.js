import express from 'express';
import api from './ruta/api.js';
import dotenv from 'dotenv';
import movie from './controller/movies.js';
import tv from './controller/tv.js';
import people from './controller/people.js';

dotenv.config();

const app = express();
const port = 3000;
const KEY = process.env.KEY;

app.use('/api/movies', movie)

app.use('/api/tv', tv)

app.use('/api/people', people)

app.get('/api/trending/:type', async (req, res) => {
    const media_type = req.params.type
    const time_window = req.query.time_window

    res.send(await api.getTrending(time_window, media_type));

})

app.get('/api/health', async (req, res) => {
    res.send(await api.health() ? 'Api funcional' : 'Api caida');

} )

app.listen(port, () => {
    console.log("Escuchando en el puerto", port)
})