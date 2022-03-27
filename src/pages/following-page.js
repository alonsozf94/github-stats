import { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { FaLessThan } from "react-icons/fa";
import * as C from "./utils-page/componentStyled";
import { useAuth } from "../context/auth-context";

function FollowersPage() {
  const { following, searchedUser, getFollowing } = useAuth();
  const [PageRange, setPageRange] = useState({ p: 1, r: 1 });
  const TotalFollowing = searchedUser.cantFollowing;
  const TotalPages = Math.ceil((TotalFollowing * 1) / 7);

  useEffect(() => {
    getFollowing(searchedUser.urlFollowing, PageRange.p);
  }, [PageRange]);

  const ListFollowing = () => {
    if (!following) return <h1>Aún no sigue a nadie!!!!</h1>;
    return following.map((follow) => (
      <C.CardContainer
        key={follow.login}
        style={{ justifyContent: "flex-start", padding: "8px 12px" }}
      >
        <C.Image src={follow.avatar_url} alt="logo" style={{ width: "50px" }} />
        <C.NameCard>{follow.login}</C.NameCard>
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
      <C.Title>Favorites ({TotalFollowing})</C.Title>
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
      <ListFollowing />
    </C.Section>
  );
}
export default FollowersPage;
