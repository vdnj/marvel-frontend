import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ComicCard from "../components/ComicCard";
import axios from "axios";

const CharacterComics = () => {
  const { id } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:4000/comics/${id}`);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <h1 className="loading">Loading comics...</h1>
  ) : (
    <div className="character-comics">
      <div className="presentation">
        <h1>Comics for {data.name}</h1>
        <img
          src={data.thumbnail.path + "." + data.thumbnail.extension}
          alt=""
        />
        {data.description && <h3>{data.description}</h3>}
      </div>
      <div className="all-comics">
        {data.comics.map((el, i) => {
          return <ComicCard el={el} key={i} />;
        })}
      </div>
    </div>
  );
};

export default CharacterComics;
