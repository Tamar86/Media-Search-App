//importing necessary modules
import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AddToFavorites from "./AddToFavorites";

//functional component SearchMedia, using useState hook to manage state of searchTerm,
// searchResult, mediaType, selectedItems and favoritesItem
export default function SearchMedia() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [mediaType, setMediaType] = useState("all");
  const [selectedItems, setSelectedItems] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  //state variable for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  //function to handle pagination
  const handleSeeMore = () => {
    setCurrentPage(currentPage + 1);
    setSelectedItems([]);
  };
  //calculating the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResult.slice(indexOfFirstItem, indexOfLastItem);

  //responsible for making a request to the backend API to search media
  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `/api/search?searchTerm=${searchTerm}&mediaType=${mediaType}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchResult(response.data);
      setSearchTerm("");
      setMediaType("all");
    } catch (error) {
      console.error("Error searching media", error);
    }
  };
  //checkbox handling
  const handleCheckboxChange = (e, item) => {
    if (e.target.checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    }
  };
  //is invoked when the user clicks ADD button
  //clears the selected item
  const handleAddToFavorites = () => {
    setSelectedItems([]);
  };
  //component renders bootstrap navbar with a search form and search result displayed as a checkboxes

  return (
    <div>
      <Navbar expand="md" className="bg-body-tertiary">
        <Container fluid style={{ paddingTop: "20px", marginBottom: "0" }}>
          <Navbar.Brand
            style={{
              color: "green",
              fontWeight: "bolder",
              fontSize: "larger",
              marginLeft: "100px",
              width: "400px",
            }}
          >
            Media Search
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "400px", height: "200px", padding: "10px" }}
              navbarScroll
            ></Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginRight: "20px" }}
              />
              <Form.Select
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value)}
                style={{ marginRight: "50px" }}
              >
                <option value="all">All</option>
                <option value="music">Music</option>
                <option value="movie">Movie</option>
                <option value="podcast">Podcast</option>
                <option value="audio-book">Audio Book</option>
                <option value="short-film">Short Film</option>
                <option value="tv-show">TV show</option>
                <option value="ebook">Ebook</option>
              </Form.Select>
              <Button
                variant="outline-success"
                onClick={handleSearch}
                style={{ marginRight: "200px", width: "600px" }}
              >
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Form
        style={{
          width: "80%",
          justifyContent: "space-between",
          marginBottom: "20px",
          textAlign: "left",
          marginLeft: "25%",
        }}
      >
        {searchResult.length > 0 &&
          // rendering only current page items
          currentItems.map((result, index) => {
            const releaseDate = new Date(result.releaseDate);
            const day = releaseDate.getDate();
            const month = releaseDate.getMonth() + 1;
            const year = releaseDate.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            return (
              <Form.Check
                style={{ marginTop: "25px", border: "black" }}
                key={index}
                type="checkbox"
                id={`checkbox-${index}`}
                label={
                  <div>
                    <img
                      src={result.albumCoverImage}
                      alt={result.albumName}
                      style={{
                        marginRight: "10px",
                        width: "50px",
                        height: "50px",
                      }}
                    />
                    {`${result.albumName} - ${result.artistName} (${formattedDate})`}
                  </div>
                }
                onChange={(e) => handleCheckboxChange(e, result)}
                disabled={favoritesList.includes(result)}
                checked={selectedItems.includes(result)}
              />
            );
          })}
        {currentItems.length > 0 && (
          //see more button
          <Button
            variant="link"
            onClick={handleSeeMore}
            style={{ color: "white", fontWeight: "bolder" }}
          >
            See more
          </Button>
        )}
      </Form>

      {/* AddToFavorites component is rendered allowing users to add selected items to their favorites lis */}
      <AddToFavorites
        selectedItems={selectedItems}
        onAddToFavorites={handleAddToFavorites}
        favoritesList={favoritesList}
        setFavoritesList={setFavoritesList}
      />
    </div>
  );
}
