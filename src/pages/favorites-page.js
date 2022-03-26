import { useEffect } from "react";
import { destroyFavorite, favorites } from "../services/favorite-service";
import { useState } from "react";
import { FavoriteStar } from "./search-page";

function FavoritesPage() {
  const [myFavorites, setMyFavorites] = useState([]);

  useEffect(() => {
    favorites().then(setMyFavorites);
  }, []);

  function handleRemoveFavorite(id) {
    destroyFavorite(id);
    const listFavorites = myFavorites.filter((favorite) => favorite.id !== id);
    setMyFavorites(listFavorites);
    localStorage.setItem("favorites", JSON.stringify(listFavorites));
  }

  const Holi = () => {
    return myFavorites.map((favorite) => (
      <div key={favorite.id}>
        <img src={favorite.avatar_url} alt="avatar" />
        <p>
          {favorite.name}
          <FavoriteStar onClick={() => handleRemoveFavorite(favorite.id)} />
        </p>
        <p>{favorite.username}</p>
      </div>
    ));
  };

  return (
    <div>
      <Holi />
    </div>
  );
}
export default FavoritesPage;
