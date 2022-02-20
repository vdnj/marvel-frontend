import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import CharacterComics from "./pages/CharacterComics";
import Cookies from "js-cookie";
import { useState } from "react";

function App() {
  //Ces 2 states sont des string comportant des id séparés par des /.
  const [favChars, setFavChars] = useState(Cookies.get("favChars") || null);
  const [favComics, setFavComics] = useState(Cookies.get("favComics") || null);

  const setFavChar = (id) => {
    if (!favChars) {
      console.log("favChars is empty");
      Cookies.set("favChars", id);
      setFavChars(id);
    } else if (!favChars.includes(id)) {
      console.log("favChars doesnt include id");
      const newFavChars = favChars + "/" + id;
      Cookies.set("favChars", newFavChars);
      setFavChars(newFavChars);
    } else {
      console.log("favChars includes id");
      let newFavChars = favChars.split("/");
      const indexOfId = newFavChars.indexOf(id);
      newFavChars.splice(indexOfId, 1);
      Cookies.set("favChars", newFavChars);
      setFavChars(
        newFavChars.length === 1 ? newFavChars[0] : newFavChars.join("/")
      );
    }
  };

  const setFavComic = (id) => {
    if (!favComics) {
      console.log("favComics is empty");
      Cookies.set("favComics", id);
      setFavComics(id);
    } else if (!favComics.includes(id)) {
      console.log("favComics doesnt include id");
      const newFavComics = favComics + "/" + id;
      Cookies.set("favComics", newFavComics);
      setFavComics(newFavComics);
    } else {
      console.log("favComics includes id");
      let newFavComics = favComics.split("/");
      const indexOfId = newFavComics.indexOf(id);
      newFavComics.splice(indexOfId, 1);
      Cookies.set("favComics", newFavComics);
      setFavComics(
        newFavComics.length === 1 ? newFavComics[0] : newFavComics.join("/")
      );
    }
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Characters setFavChar={setFavChar} favChars={favChars} />}
        />
        <Route path="/character/:id" element={<CharacterComics />} />
        <Route
          path="/comics"
          element={<Comics setFavComic={setFavComic} favComics={favComics} />}
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              setFavChar={setFavChar}
              favChars={favChars}
              setFavComic={setFavComic}
              favComics={favComics}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
