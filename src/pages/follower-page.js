import { useEffect } from "react";
import * as C from "./componentStyled/componentStyled";
import { FaGreaterThan } from "react-icons/fa";
import { FaLessThan } from "react-icons/fa";
import { useAuth } from "../context/auth-context";

function FollowersPage() {
  const { followers, searchedUser, getFollowers } = useAuth();

  useEffect(() => {
    getFollowers(searchedUser.urlFollowers);
  });

  const Haters = () => {
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
    // const cantFollowers = JSON.parse(
    //   localStorage.getItem("data")
    // ).cantFollowers;
    // const cantPages = Math.ceil((cantFollowers * 1) / 7.0);
    const array = Array.from(Array(1).keys());
    return array.map((number) => (
      <C.Pages keys={number}>
        <FaLessThan />
        <C.NumberPage>{number + 1}</C.NumberPage>
        <FaGreaterThan />
      </C.Pages>
    ));
  };

  return (
    <C.Section>
      <C.Title>Favorites ({searchedUser.cantFollowers})</C.Title>
      <ContainerPages />
      <Haters />
    </C.Section>
  );
}
export default FollowersPage;
