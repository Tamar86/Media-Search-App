const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController")
const authMiddleware = require("../middleware/authMiddleware")

//route for searching media
router.get("/search", authMiddleware, searchController)

module.exports = router