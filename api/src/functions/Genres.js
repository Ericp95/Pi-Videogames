const { Genre} = require('../db.js');
const axios = require ('axios');
const { API_KEY } = process.env;

const getGenres = async (req, res) => {
    try {
        const apiGenres = await axios.get(` https://api.rawg.io/api/genres?key=${API_KEY}`)
        let apiGenresRes = await apiGenres.data.results; 
        apiGenresRes.map((genre) => {
            Genre.findOrCreate({
                where: { 
                    name: genre.name
                }
            })
        })
        const genres = await Genre.findAll();

        return res.status(200).json(genres);
    } catch (error) {
        return res.status(404).json({ error: 'FATAL ERROR...' });
    }
}

module.exports={ getGenres }