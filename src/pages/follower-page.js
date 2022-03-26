import { useState, useEffect } from "react";

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
  }, [data]);

  const Haters = () => {
    return followers.map((follower) => (
      <div
        style={{
          display: "flex",
          gap: "4px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={follower.avatar_url} alt="logo" style={{ width: "50px" }} />
        <p>{follower.login}</p>
      </div>
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
      <div style={{ display: "flex", gap: "4px" }}>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
      </div>
      <Haters />;
    </div>
  );
}
export default FollowersPage;
