import { FavoriteStar } from "./search-page";
import { useAuth } from "../context/auth-context";

function FavoritesPage() {
  const { myFavorites, unfavorite } = useAuth();

  function handleRemoveFavorite(id) {
    unfavorite(id);
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
