import axios from "axios";
import { useState, useEffect } from "react";
import CharacterCard from "../components/CharacterCard";

const Characters = ({ setFavChar, favChars }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const limit = 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetching data");
        const response = await axios.get(
          `https://marvel-vdnj-backend.herokuapp.com/characters/all?limit=${
            limit ? limit : 100
          }&skip=${page > 1 ? (page - 1) * limit : 0}&name=${encodeURI(search)}`
        );
        setData(response.data.results);
        setIsLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [page, search]);

  return data ? (
    <div className="characters">
      {/* <div className="characters-pres">
        <img
          src="https://sm.ign.com/ign_fr/news/m/marvel-com/marvel-comics-relaunches-black-panther-with-12-years-a-slave_8ka4.jpg"
          alt=""
        />
        <div className="text">
          <h3>MARVEL CHARACTERS</h3>
          <p>
            Get hooked on a hearty helping of heroes and villains from the
            humble House of Ideas!
          </p>
        </div>
      </div>
       */}
      <div className="search-bar">
        <h2>ALL MARVEL CHARACTERS</h2>
        <input
          type="text"
          placeholder="Search a character"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="characters-list">
        {data.map((el, i) => {
          return (
            <CharacterCard
              key={i}
              comics={el.comics}
              name={el.name}
              description={el.description}
              thumbnail={el.thumbnail.path + "." + el.thumbnail.extension}
              id={el._id}
              setFavChar={setFavChar}
              isFav={favChars && favChars.includes(el._id) ? true : false}
            />
          );
        })}
      </div>
      <div className="pages">
        {page > 1 && (
          <button onClick={() => setPage(page - 1)}>← Previous</button>
        )}

        <button onClick={() => setPage(page + 1)}>Next →</button>
      </div>
    </div>
  ) : (
    <h1 className="loading">Loading Characters...</h1>
  );
};

export default Characters;
