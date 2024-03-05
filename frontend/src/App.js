import React, { useEffect } from "react";
import axios from "axios";
import SearchMedia from "./components/SearchMedia";
import image from "./image2.jpg";
import "./App.css";

function App() {
  //token retrieval: the use|Effect hook is used to fetch a token from the server when the component mounts
  //this token is then stored in the local storage of the browser for later use in API request 
  useEffect(() => {
    axios
      .get("/api/token")
      .then((response) => {
        const { token } = response.data;

        localStorage.setItem("token", token);
      })
      .catch((error) => {
        console.error("Error retrieving token", error);
      });
  }, []);
  //the background size is set to cover to ensure the image covers the entire background area
  return (
    <div
      className="App"
      style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
    >
      <SearchMedia />
    </div>
  );
}

export default App;
