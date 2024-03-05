//handles adding items to favorites. it expects POST request with a JSON body containing itemId and itemName
async function addToFavorites(req, res) {
  try {
    const { itemId, itemName } = req.body;

    console.log(`Added ${itemName} with ID ${itemId} to favorites`);

    res.json({
      message: `Added ${itemName} to favorites`,
    });
  } catch (error) {
    console.error("Error adding to favorites");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
//handles removing items from favorites. it expects DELETE request with a JSON body containing itemId.
async function removeFromFavorites(req, res) {
  const itemId = req.params.itemId;

  console.log(`removed item with ID ${itemId} from favorites`);
  res.json({
    message: `removed item with ID ${itemId} from favorites`,
  });
  try {
  } catch (error) {
    console.error("Error removing from favorites");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = { addToFavorites, removeFromFavorites };
