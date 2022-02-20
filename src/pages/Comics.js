import axios from "axios";
import { useState, useEffect } from "react";
import ComicCard from "../components/ComicCard";

const Comics = ({ setFavComic, favComics }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const limit = 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-vdnj-backend.herokuapp.com/comics?limit=${
            limit ? limit : 100
          }&skip=${page > 1 ? (page - 1) * limit : 0}&title=${encodeURI(
            search
          )}`
        );
        setData(response.data.results);
        setIsLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
    console.log("page changed");
  }, [page, search]);

  return isLoading ? (
    <h1 className="loading">Loading Comics ...</h1>
  ) : (
    <div className="comics-page">
      <div className="search-bar">
        <h2>ALL MARVEL COMICS</h2>
        <input
          type="text"
          placeholder="Search a comic"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="comics-list">
        {data.map((el, i) => {
          return (
            <ComicCard
              el={el}
              key={i}
              setFavComic={setFavComic}
              isFav={favComics && favComics.includes(el._id) ? true : false}
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
  );
};

export default Comics;
