//importing required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const searchRoutes = require("./routes/searchRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");
const { generateToken } = require("./tokenUtils");

//create express app
const app = express();
//applying middleware
app.use(bodyParser.json());
app.use(cors());
//defining routes
app.get("/api/token", (req, res) => {
  const token = generateToken();

  res.json({ token });
});

app.use("/api", searchRoutes);

app.use("/api/favorites", favoritesRoutes);

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
