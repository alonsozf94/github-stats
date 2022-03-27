import { FavoriteStar } from "./search-page";
import { useAuth } from "../context/auth-context";
import { useState, useEffect } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { FaLessThan } from "react-icons/fa";
import * as C from "./utils-page/componentStyled";

function FavoritesPage() {
  const { myFavorites, unfavorite } = useAuth();
  const [PageRange, setPageRange] = useState({ p: 1, r: 1 });
  const [FavoritesToShow, setFavoritesToShow] = useState([]);
  const TotalFavorites = myFavorites.length;
  const TotalPages = Math.ceil((TotalFavorites * 1) / 7);
  useEffect(() => {
    setFavoritesToShow(myFavorites.slice(PageRange.p, PageRange.p + 7));
  }, [PageRange]);

  function handleRemoveFavorite(id) {
    unfavorite(id);
  }

  const AllFavorites = () => {
    if (!myFavorites) return <h1>Aún no tienes favoritos!...</h1>;

    return FavoritesToShow.map((favorite) => (
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
    let arrayPages = Array.from([0, 1, 2, 3, 4], (x) => x + PageRange.r);
    return arrayPages.map((number) =>
      TotalPages >= number ? (
        <C.Pages keys={number}>
          <C.NumberPage
            onClick={() =>
              setPageRange({
                p: number,
                r: PageRange.r,
              })
            }
            style={
              PageRange.p === number
                ? { backgroundColor: "#2D9CDB", color: "white" }
                : {}
            }
          >
            {number}
          </C.NumberPage>
        </C.Pages>
      ) : (
        ""
      )
    );
  };

  return (
    <C.Section>
      <C.Title>Favorites ({myFavorites ? myFavorites.length : 0})</C.Title>
      <div
        style={{
          display: "flex",
          gap: "4px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FaLessThan
          onClick={() =>
            PageRange.r > 1
              ? setPageRange({
                  p: Math.floor(PageRange.p / 5) * 5,
                  r: PageRange.r - 5,
                })
              : ""
          }
          style={{ cursor: "pointer" }}
        />
        <ContainerPages />
        <FaGreaterThan
          onClick={() =>
            TotalPages > PageRange.r + 5
              ? setPageRange({
                  p: Math.ceil(PageRange.p / 5) * 5 + 1,
                  r: PageRange.r + 5,
                })
              : ""
          }
          style={{ cursor: "pointer" }}
        />
      </div>
      <AllFavorites />
    </C.Section>
  );
}
export default FavoritesPage;
