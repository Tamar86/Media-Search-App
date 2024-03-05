const express = require("express")
const router = express.Router()
const favoritesController = require("../controllers/favoritesController")
const authMiddleware = require("../middleware/authMiddleware")
//routes for adding and removing media 

router.post('/favorites/add', authMiddleware, favoritesController.addToFavorites)
router.delete("/favorites/remove/:itemId", authMiddleware, favoritesController.removeFromFavorites)

module.exports = router