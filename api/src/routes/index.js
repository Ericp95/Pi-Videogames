const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const{ getGenres }=require('../functions/Genres')
const{ getVIdeogamesId , getVideogames}=require('../functions/Videogames')
const{ PostVideogame }=require('../functions/Postvideogame')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/genres', getGenres);
router.get('/videogames/:id', getVIdeogamesId);
router.post('/videogame', PostVideogame);
router.get('/videogames', getVideogames);

module.exports = router;
