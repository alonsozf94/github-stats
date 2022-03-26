import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import ReactDOM from "react-dom";
import { RiStarFill } from "react-icons/ri";
import { createFavorite, destroyFavorite } from "../services/favorite-service";

const initialState = {
  nickName: null,
  name: null,
  urlAvatar: null,
  cantFollowers: null,
  cantFollowing: null,
  cantPublic_gists: null,
  cantPublic_repos: null,
  favorite: false,
};

const FavoriteStar = styled(RiStarFill)`
  color: yellow;
`;

export function MainPage() {
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("data")) || initialState
  );
  const [state, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || initialState
  );

  useEffect(() => {
    if (state.nickName !== null)
      localStorage.setItem("data", JSON.stringify(state));
  }, [state]);

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`https://api.github.com/users/${query}`, {
      headers: {
        Authorization:
          "Basic UnViZW5TYW5kcm86Z2hwXzlJUmhaWjJWTjd6WmdMRkRqVk5jcjUxc3BUcG81MjN6Ym1XcQ==",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData({
          nickName: data.login,
          name: data.name,
          urlAvatar: data.avatar_url,
          cantFollowers: data.followers,
          urlFollowers: data.followers_url,
          urlFollowing: data.following_url.slice(0, -13),
          urlRepos: data.repos_url,
          urlGists: data.gists_url.slice(0, -10),
          cantFollowing: data.following,
          cantGists: data.public_gists,
          cantRepos: data.public_repos,
          favorite: false,
        });
        console.log(state);
      })
      .catch((error) => console.log(error));
  }

  function showFollowers() {
    fetch(state.urlFollowers.concat(`?per_page=7&page=${2}&tab=followers`), {
      headers: {
        Authorization:
          "Basic UnViZW5TYW5kcm86Z2hwXzlJUmhaWjJWTjd6WmdMRkRqVk5jcjUxc3BUcG81MjN6Ym1XcQ==",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(
          "%c 🇹🇿: showFollowers -> data ",
          "font-size:16px;background-color:#5cf153;color:black;",
          data,
          data.length
        );
      });
  }

  function showFollowing() {
    console.log(state.urlFollowing);
    fetch(state.urlFollowing.concat(`?per_page=7&page=${1}&tab=followers`), {
      headers: {
        Authorization:
          "Basic UnViZW5TYW5kcm86Z2hwXzlJUmhaWjJWTjd6WmdMRkRqVk5jcjUxc3BUcG81MjN6Ym1XcQ==",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(
          "%💋 🇹🇿: showFollowing -> data ",
          "font-size:16px;background-color:#5cf153;color:black;",
          data,
          data.length
        );
      })
      .catch((error) => console.log(error));
  }

  function showRepos() {
    console.log(state.urlRepos);
    fetch(state.urlRepos.concat(`?per_page=7&page=${1}&tab=followers`), {
      headers: {
        Authorization:
          "Basic UnViZW5TYW5kcm86Z2hwXzlJUmhaWjJWTjd6WmdMRkRqVk5jcjUxc3BUcG81MjN6Ym1XcQ==",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(
          "%👙 🇹🇿: showRepos -> data ",
          "font-size:16px;background-color:#5cf153;color:black;",
          data,
          data.length
        );
      })
      .catch((error) => console.log(error));
  }

  function showGists() {
    console.log(state.urlGists);
    fetch(state.urlGists.concat(`?per_page=7&page=${1}&tab=followers`), {
      headers: {
        Authorization:
          "Basic UnViZW5TYW5kcm86Z2hwXzlJUmhaWjJWTjd6WmdMRkRqVk5jcjUxc3BUcG81MjN6Ym1XcQ==",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(
          "%👙 🇹🇿: showRepos -> data ",
          "font-size:16px;background-color:#5cf153;color:black;",
          data,
          data.length
        );
      })
      .catch((error) => console.log(error));
  }

  function HandleCreateFavorite(event) {
    event.preventDefault();
    createFavorite({
      name: state.name,
      username: state.nickName,
      avatar_url: state.urlAvatar,
    }).then(setFavorites);
    const data = state;
    data.favorite = true;
    setData((data) => {
      setFavorites(data);
      localStorage.setItem("data", JSON.stringify(data));
    });
  }

  async function handleRemoveFavorite(id) {
    await destroyFavorite(id);
    const data = state;
    data.favorite = false;
    setData(data);
    localStorage.setItem("data", JSON.stringify(data));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="search"
          placeholder="escribe el nombre de usuario..."
          name="name"
          value={query}
          onChange={({ target }) => setQuery(target.value)}
        ></input>
        <button type="submit">Search</button>
      </form>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <h4>{state.nickName}</h4>
        <img src={state.urlAvatar} alt="avatar" style={{ width: "250px" }} />
        <h2>{state.name}</h2>
        <div
          onClick={state.favorite || HandleCreateFavorite}
          style={{ cursor: "pointer" }}
        >
          {state.favorite ? <FavoriteStar /> : <RiStarFill />}
        </div>
        <p>{state.description}</p>
        <NavLink
          to={"/followers"}
          onClick={showFollowers}
          style={{ cursor: "pointer" }}
        >
          followers: {state.cantFollowers}
        </NavLink>
        <NavLink
          to={"/following"}
          onClick={showFollowing}
          style={{ cursor: "pointer" }}
        >
          followings: {state.cantFollowing}
        </NavLink>
        <NavLink
          to={"/repos"}
          onClick={showRepos}
          style={{ cursor: "pointer" }}
        >
          repos: {state.cantRepos}
        </NavLink>
        <NavLink
          to={"/gists"}
          onClick={showGists}
          style={{ cursor: "pointer" }}
        >
          public gists: {state.cantGists}
        </NavLink>
      </div>
    </div>
  );
}
