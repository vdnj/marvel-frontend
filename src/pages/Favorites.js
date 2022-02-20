import axios from "axios";
import CharacterCard from "../components/CharacterCard";
import ComicCard from "../components/ComicCard";
import { useState, useEffect } from "react";

const Favorites = ({ favChars, favComics, setFavChar, setFavChomic }) => {
  // const getComicCard = async (id) => {
  //   try {
  //     const response = await axios.get(`http://localhost:4000/character/${id}`);
  //     return response.data;
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };

  const [favCharsData, setFavCharsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      favChars.split("/").map(async (el) => {
        console.log("getting data for ==>", el);
        const response = await axios.get(
          `http://localhost:4000/character/${el}`
        );
        const newData = [...favCharsData];
        newData.push(response.data);
        setFavCharsData(newData);
        console.log("data ==> ", response.data);
      });
      setIsLoading(false);
      console.log(favCharsData);
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  return isLoading ? (
    <h1 className="loading">Loading Favorites ...</h1>
  ) : (
    <div className="favorites">
      <h1>Favorites Page</h1>
      <div className="fav chars">
        <h2>Favorite Characters</h2>
        {/* {favChars.split("/").map(async (el, i) => {
          console.log("el ==>", el);
          const data = await getComicCard(el);
          console.log("data ===> ", data);
          return (
            <CharacterCard
              setFavChar={setFavChar}
              isFav={favChars && favChars.includes(data._id) ? true : false}
              key={i}
              name={data.name}
              description={data.description}
              thumbnail={data.thumbnail.path + "." + data.thumbnail.extension}
              id={data._id}
            />
          );
        })} */}
        {/* {favCharsData.map((el, i) => {
          return (
            <CharacterCard
              setFavChar={setFavChar}
              isFav={favChars && favChars.includes(el._id) ? true : false}
              key={i}
              name={el.name}
              description={el.description}
              thumbnail={el.thumbnail.path + "." + el.thumbnail.extension}
              id={el._id}
            />
          );
        })} */}
      </div>
      <div className="fav comics">
        <h2>Favorite Comics</h2>
      </div>
    </div>
  );
};

export default Favorites;
