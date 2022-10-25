const { Genre, Videogame} = require('../db.js');
const axios = require ('axios');
const { API_KEY } = process.env;
const { Sequelize } = require('sequelize');

const getVideogames = async (req, res) => {
    const { name } = req.query;
    if (name) {
        try {
            let gameName = [];
            const ApiVideogames = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
            let ApiVideogamesRes = ApiVideogames.data.results;
            ApiVideogamesRes.map((game) => {
                if(gameName.length < 15) {
                gameName.push({
                   id: game.id,
                    name: game.name,
                    genres: game.genres ? game.genres.map((genre) => genre.name).join(', ') : null,
                    img: game.background_image,
                    rating: game.rating,
                    platforms: game.platforms ? game.platforms.map((p) => p.platform.name).join(', ') : null
                })}
            })
            const DatbVideogames = await Videogame.findAll({
                where: {
                    name: { [Sequelize.Op.iLike]: `%${name}%` }
                },
                include: {
                    model: Genre
                }
            })
            DatbVideogames.map(game => {
                gameName.unshift({
                    id: game.id,
                    idGame:game.idGame,
                    img: game.img ? game.img : null,
                    name: game.name,
                    genres: game.genres.map((genre) => genre.name).join(', '),
                    description: game.description,
                    released: game.released,
                    rating: game.rating,
                    platforms:  game.platforms,
                })
            });
           if (gameName) {
                return res.status(200).json(gameName)
            }
        } catch (error) {
            console.log(error)
            return res.status(404).json({ error: 'Fatal error.' })
        }
    } else {
        try {
            let games = [];
            let pages = 8;
            for (let i = 1; i < pages; i++) {
                const ApiVideogames = await axios.get(`https://api.rawg.io/api/games?page=${i}&key=${API_KEY}`)
                let ApiVideogamesRes = ApiVideogames.data.results;

                ApiVideogamesRes.map(game => {
                    if(games.length < 100){
                    games.push({
                        id: game.id,
                        name: game.name,
                        genres: game.genres.map((genre) => genre.name).join(', '),
                        img: game.background_image,
                        rating: game.rating,
                        platforms: game.platforms.map((p) => p.platform.name).join(', ')
                    })}
                })
            }
            const DatBVideogames = await Videogame.findAll({
                include: {
                    model: Genre
                }
            });
            DatBVideogames.map(game => {
                games.unshift({
                    id: game.id,
                   // idGame:game.idGame,
                    img: game.img ? game.img : null,
                    name: game.name,
                    genres: game.genres.map((genre) => genre.name).join(', '),
                    description: game.description,
                    released: game.released,
                    rating: game.rating,
                    platforms: game.platforms,
                })
            });
            if (games) {
                return res.status(200).json(games)
            }
        } catch (error) {
            console.log(error)
            return res.status(404).json({ error: 'Fatal error.' })
        }
    }
}


const getVIdeogamesId= async(req,res)=>{

    const { id } = req.params;

    if (id.length < 36) {
        try {
            const ApiVideogame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            let ApiVideogameRes = ApiVideogame.data;

            ApiVideogameRes = {
                id: ApiVideogameRes.id,
                name: ApiVideogameRes.name,
                description: ApiVideogameRes.description_raw,
                released: ApiVideogameRes.released,
                genres: ApiVideogameRes.genres.map((genre) => genre.name).join(', '),
                img: ApiVideogameRes.background_image,
                rating: ApiVideogameRes.rating,
                platforms: ApiVideogameRes.platforms.map((e) => e.platform.name).join(', ')
            };
            return res.status(200).json(ApiVideogameRes);
        } catch (error) {
            console.log(error)
            return res.status(404).json({ error: "Videogame not found. Invalid ID." });
        }
    } else {
        try {
            let DatBVideogame = await Videogame.findOne({
                where: {
                    id: id,
                },
                include: {
                    model: Genre,
                    attributes: [ "id","name"],
                    through: { attributes: [] },
                },
            });
            let DatBVideogameRes = {
                id: DatBVideogame.id,
                //idGame:game.idGame,
                img: DatBVideogame.img ? DatBVideogame.img : null,
                name: DatBVideogame.name,
                genres: DatBVideogame.genres.map((genre) => genre.name).join(', '),//g
                description: DatBVideogame.description,
                released: DatBVideogame.released,
                rating: DatBVideogame.rating,
                platforms: DatBVideogame.platforms,
            };
            return res.status(200).json(DatBVideogameRes);//datbvideogame
        } catch (error) {
            console.log(error)
            return res.status(404).json({ error: "Videogame not found. Invalid ID." });
        }
    }

        
};



module.exports={getVIdeogamesId, getVideogames };