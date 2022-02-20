// import Cookies from "js-cookie";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";

const CharacterCard = ({
  description,
  name,
  thumbnail,
  id,
  setFavChar,
  isFav,
}) => {
  // const [isFav, setIsFav] = useState();

  // useEffect(() => {
  //   const favChars = Cookies.get("favChars");
  //   if (favChars && favChars.includes(id)) {
  //     setIsFav(true);
  //   } else {
  //     setIsFav(false);
  //   }
  // }, [isFav]);

  return (
    <div className="character-card">
      <Link
        to={`/character/${id}`}
        style={{ textDecoration: "none", color: "white" }}
      >
        <img src={thumbnail} alt="hero-pic" />
        <h2>{name}</h2>
        <p className="card-description">
          {description && description.split("").length > 50
            ? description.split("").splice(0, 50).join("") + " ..."
            : description && description.split("").length < 50
            ? description
            : ""}
        </p>
      </Link>
      <p onClick={() => setFavChar(id)} className="fav-star">
        {isFav ? "✭" : "☆"}
      </p>
    </div>
  );
};

export default CharacterCard;
