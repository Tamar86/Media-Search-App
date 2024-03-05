import React from "react";
import Button from "react-bootstrap/esm/Button";
//receiving props from SearchMedia
export default function AddToFavorites({
  selectedItems,
  onAddToFavorites,
  favoritesList,
  setFavoritesList,
}) {
  //adds the selected items to the favorites list when Add button is clicked
  const handleAddToFavorites = () => {
    setFavoritesList([...favoritesList, ...selectedItems]);
    onAddToFavorites([]);
  };
  //removes selected item when remove button is clicked
  const handleRemoveFromFavorites = (itemToRemove) => {
    const updatedFavorites = favoritesList.filter(
      (item) => item !== itemToRemove
    );
    setFavoritesList(updatedFavorites);
  };
  return (
    <div>
      {selectedItems.length > 0 && (
        <div>
          <Button
            onClick={handleAddToFavorites}
            style={{ position: "fixed", bottom: "20px", right: "20px" }}
            variant="warning"
          >
            Add To Favorites
          </Button>
        </div>
      )}

      <ul
        style={{
          width: "40%",
          listStyle: "none",
          padding: "20px",
          boxSizing: "border-box",
          marginLeft: "25%",
        }}
      >
        {favoritesList.length > 0 && (
          <h5 style={{ marginRight: "500px" }}>Favorites</h5>
        )}
        {favoritesList.map((item, index) => (
          <li key={index} style={{ marginTop: "5px", textAlign: "left" }}>
            <Button
              variant="danger"
              onClick={() => handleRemoveFromFavorites(item)}
              style={{ padding: "2px", marginRight: "5px" }}
            >
              Remove
            </Button>
            {item.albumName}
          </li>
        ))}
      </ul>
    </div>
  );
}
