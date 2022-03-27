import { FavoriteStar } from "./search-page";
import { useAuth } from "../context/auth-context";
import { FaGreaterThan } from "react-icons/fa";
import { FaLessThan } from "react-icons/fa";
import * as C from "./componentStyled/componentStyled";

function FavoritesPage() {
  const { myFavorites, unfavorite } = useAuth();

  function handleRemoveFavorite(id) {
    unfavorite(id);
  }

  const AllFavorites = () => {
    if (!myFavorites) return <h1>Aún no tienes favoritos!...</h1>;
    return myFavorites.map((favorite) => (
      <C.CardContainer key={favorite.id}>
        <C.Image src={favorite.avatar_url} alt="avatar" />
        <C.Body>
          <C.NameCard>
            {favorite.name}
            <FavoriteStar onClick={() => handleRemoveFavorite(favorite.id)} />
          </C.NameCard>
          <C.Username>{favorite.username}</C.Username>
        </C.Body>
      </C.CardContainer>
    ));
  };

  const ContainerPages = () => {
    // const cantPages = Math.ceil((myFavorites.length * 1) / 7.0);
    const array = Array.from(Array(1).keys());
    return array.map((number) => (
      <C.Pages>
        <FaLessThan />
        <C.NumberPage>{number + 1}</C.NumberPage>
        <FaGreaterThan />
      </C.Pages>
    ));
  };

  return (
    <C.Section>
      <C.Title>Favorites ({myFavorites ? myFavorites.length : 0})</C.Title>
      <ContainerPages />
      <AllFavorites />
    </C.Section>
  );
}
export default FavoritesPage;
