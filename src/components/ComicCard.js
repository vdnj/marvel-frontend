const ComicCard = ({ el, isFav, setFavComic }) => {
  return (
    <div className="comic-card">
      <img
        src={`${el.thumbnail.path}.${el.thumbnail.extension}`}
        alt="comic-pic"
      />
      <h2>{el.title}</h2>
      <p class="card-description">
        {el.description && el.description.split("").length > 50
          ? el.description.split("").splice(0, 50).join("") + " ..."
          : el.description && el.description.split("").length < 50
          ? el.description
          : ""}
      </p>
      <p onClick={() => setFavComic(el._id)} className="fav-star">
        {isFav ? "✭" : "☆"}
      </p>
    </div>
  );
};

export default ComicCard;
