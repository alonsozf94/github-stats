import { useEffect } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { FaLessThan } from "react-icons/fa";
import * as C from "./componentStyled/componentStyled";
import { useAuth } from "../context/auth-context";

function FollowersPage() {
  const { following, searchedUser, getFollowing } = useAuth();

  useEffect(() => {
    getFollowing(searchedUser.urlFollowing);
  });

  const Haters = () => {
    if (!following) return <h1>Aún no sigue a nadie!!!!</h1>;
    return following.map((follower) => (
      <C.CardContainer
        key={follower.login}
        style={{ justifyContent: "flex-start", padding: "8px 12px" }}
      >
        <C.Image
          src={follower.avatar_url}
          alt="logo"
          style={{ width: "50px" }}
        />
        <C.NameCard>{follower.login}</C.NameCard>
      </C.CardContainer>
    ));
  };

  const ContainerPages = () => {
    // const cantPages = Math.ceil((myFavorites.length * 1) / 7.0);
    const array = Array.from(Array(1).keys());
    return array.map((number) => (
      <C.Pages key={number}>
        <FaLessThan />
        <C.NumberPage>{number + 1}</C.NumberPage>
        <FaGreaterThan />
      </C.Pages>
    ));
  };

  return (
    <C.Section>
      <C.Title>Favorites ({searchedUser.cantFollowing})</C.Title>
      <ContainerPages />
      <Haters />
    </C.Section>
  );
}
export default FollowersPage;
