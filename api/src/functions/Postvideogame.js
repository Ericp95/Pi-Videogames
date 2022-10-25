const { Videogame, Genre } = require("../db.js");
const axios = require('axios');


const PostVideogame = async (req, res) => {
    let { name, description, released, rating, platforms, genres, img } = req.body;
    platforms = platforms.toString()

    if (!name) {
        return res.status(404).json({ error: "Invalid name" });
    }
   
    if (!genres || typeof genres !== "object") {
        return res.json({ error: "Invalid genres" });
    }
    if (!platforms || typeof platforms !== "string") {
        return res.status(404).json({ error: "Invalid platforms" });
    }
   

    try {
        let NewVideogame = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
            img
        })
        let GenresNewVideogame = await Genre.findAll({
            where: {
                name: genres
            }
        });
        NewVideogame.addGenre(GenresNewVideogame);
        res.status(200).send("Videogame created succesfully :) ");
    } catch (error) {
        console.error(error)
        return res.status(404).json({ error: "Critical ERROR created new Videogame..." })
    }
}
   

   


module.exports={PostVideogame};