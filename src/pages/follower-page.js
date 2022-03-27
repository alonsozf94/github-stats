import { useState, useEffect } from "react";
import * as C from "./componentStyled/componentStyled";
import { FaGreaterThan } from "react-icons/fa";
import { FaLessThan } from "react-icons/fa";

function FollowersPage() {
  const [followers, setFollowers] = useState([]);
  const data = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    fetch(data.urlFollowers.concat(`?per_page=7&page=${1}&tab=followers`), {
      headers: {
        Authorization:
          "Basic UnViZW5TYW5kcm86Z2hwXzlJUmhaWjJWTjd6WmdMRkRqVk5jcjUxc3BUcG81MjN6Ym1XcQ==",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFollowers(data);
      });
  }, []);

  const Haters = () => {
    return followers.map((follower) => (
      <C.CardContainer key={follower.login}>
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
    const array = Array.from(Array(5).keys());
    return array.map((number) => (
      <C.Pages keys={number}>
        <FaLessThan />
        <C.NumberPage>{number}</C.NumberPage>
        <FaGreaterThan />
      </C.Pages>
    ));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        gap: "4px",
      }}
    >
      <ContainerPages />
      <Haters />;
    </div>
  );
}
export default FollowersPage;
