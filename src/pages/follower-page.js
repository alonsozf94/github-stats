import { useEffect, useState } from "react";
import * as C from "./componentStyled/componentStyled";
import { FaGreaterThan } from "react-icons/fa";
import { FaLessThan } from "react-icons/fa";
import { useAuth } from "../context/auth-context";

function FollowersPage() {
  const { followers, searchedUser, getFollowers } = useAuth();
  const [PageRange, setPageRange] = useState({ p: 1, r: 1 });
  const TotalFollowers = searchedUser.cantFollowers;
  const TotalPages = Math.ceil((TotalFollowers * 1) / 7);

  useEffect(() => {
    getFollowers(searchedUser.urlFollowers, PageRange.p);
  }, [PageRange]);

  const ListFollowers = () => {
    if (!followers) return <h1>Aún no tiene Followers!!!!</h1>;
    return followers.map((follower) => (
      <C.CardContainer
        key={follower.login}
        style={{ justifyContent: "flex-start", padding: "8px 12px" }}
      >
        <C.Image src={follower.avatar_url} alt="logo" />
        <p>{follower.login}</p>
      </C.CardContainer>
    ));
  };

  const ContainerPages = () => {
    let arrayPages = Array.from([0, 1, 2, 3, 4], (x) => x + PageRange.r);
    return arrayPages.map((number) =>
      TotalPages >= number ? (
        <C.Pages keys={number}>
          <C.NumberPage
            onClick={() => setPageRange({ p: number, r: PageRange.r })}
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
      <C.Title>Favorites ({TotalFollowers})</C.Title>
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
      <ListFollowers />
    </C.Section>
  );
}
export default FollowersPage;
