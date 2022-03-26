import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import ReactDOM from "react-dom";
import { RiStarFill } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { BsFileCodeFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { RiUserFollowLine } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { RiSearchFill } from "react-icons/ri";
import { GiRoundStar } from "react-icons/gi";
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
  favorite_id: null,
};

export const FavoriteStar = styled(RiStarFill)`
  color: yellow;
`;

const Star = styled(RiStarFill)``;

export function SearchPage() {
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
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
          favorite_id: null,
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

  function HandleCreateFavorite() {
    createFavorite({
      name: state.name,
      username: state.nickName,
      avatar_url: state.urlAvatar,
    }).then((data) => {
      console.log(
        "%c 🐓: HandleCreateFavorite -> data ",
        "font-size:16px;background-color:#f03f86;color:white;",
        favorites
      );
      const newFavorite = {
        id: data.id,
        username: data.username,
        name: data.name,
        avatar_url: data.avatar_url,
      };
      setFavorites([...favorites, newFavorite]);
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, newFavorite])
      );
      const dat = state;
      dat.favorite = true;
      dat.favorite_id = data.id;
      setData(dat);
      console.log(favorites);
      console.log(state);
    });
  }

  async function handleRemoveFavorite(id) {
    await destroyFavorite(id);
    const data = state;
    data.favorite = false;
    const listFavorites = favorites.filter((fav) => fav.id !== id);
    console.log("lista de favoritos", listFavorites);
    setFavorites(listFavorites);
    setData(data);
    localStorage.setItem("data", JSON.stringify(data));
  }

  const Container = styled.div`
    max-width: 480px;
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
    margin-top: 32px;
  `;

  const Form = styled.form`
    display: flex;
    gap: 0.5rem;
    margin-bottom: 20px;
  `;

  const Search = styled.input`
    padding: 0.25rem 0.5rem;
    width: fit-content;
    background: white;
    box-shadow: 2px 2px 0 0 rgb(0, 0, 0, 0.25);
    border: none;
  `;

  const Avatar = styled.img`
    width: 120px;
    border-radius: 50%;
  `;

  const Name = styled.h1`
    font-family: "Source Code Pro";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    color: #000000;
  `;

  const Card = styled(NavLink)`
    cursor: pointer;
    height: 140px;
    width: 140px;
    background: rgba(255, 255, 255, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 2px 2px 0 0 rgb(0, 0, 0, 0.25);
    text-decoration: none;
  `;

  const Number = styled.p`
    font-family: "Source Code Pro";
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 35px;
    text-align: center;
    color: black;
  `;

  const Text = styled.p`
    font-family: "Source Code Pro";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: black;
  `;

  const Footer = styled.div`
    position: absolute;
    bottom: 0px;
    display: flex;
    width: 30%;
    justify-content: space-between;
  `;

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Search
          id="search"
          placeholder="username"
          name="name"
          value={query}
          onChange={({ target }) => setQuery(target.value)}
        ></Search>
        <button type="submit">Search</button>
      </Form>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar src={state.urlAvatar} alt="avatar" />
        <div
          style={{
            display: "flex",
            gap: "4px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Name>{state.name}</Name>
          {state.favorite ? (
            <FavoriteStar />
          ) : (
            <Star onClick={HandleCreateFavorite} />
          )}
        </div>
        <p>{state.description}</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
          }}
        >
          <Card
            to={"/followers"}
            onClick={showFollowers}
            style={{ cursor: "pointer" }}
          >
            <MdGroups
              style={{ width: "50px", height: "50px", color: "#2D9CDB" }}
            />
            <Number>{state.cantFollowers}</Number>
            <Text>followers</Text>
          </Card>

          <Card
            to={"/following"}
            onClick={showFollowing}
            style={{ cursor: "pointer" }}
          >
            <RiUserFollowLine
              style={{ width: "50px", height: "50px", color: "#F2994A" }}
            />
            <Number>{state.cantFollowing}</Number>
            <Text>following</Text>
          </Card>

          <Card to={"/repos"} onClick={showRepos} style={{ cursor: "pointer" }}>
            <FaBook
              style={{ width: "50px", height: "50px", color: "#219653" }}
            />
            <Number>{state.cantFollowing}</Number>
            <Text>Public Repos</Text>
          </Card>

          <Card to={"/gists"} onClick={showGists} style={{ cursor: "pointer" }}>
            <BsFileCodeFill
              style={{ width: "50px", height: "50px", color: "#828282" }}
            />
            <Number>{state.cantGists}</Number>
            <Text>Public Gists</Text>
          </Card>
        </div>

        <Footer>
          <NavLink
            to={"/"}
            style={{ cursor: "pointer", color: "#828282", width: "45px" }}
          >
            <BsFillPersonFill />
          </NavLink>
          <NavLink
            to={"/"}
            style={{ cursor: "pointer", color: "#828282", width: "45px" }}
          >
            <RiSearchFill />
          </NavLink>
          <NavLink
            to={"/favorites"}
            style={{ cursor: "pointer", color: "#828282", width: "45px" }}
          >
            <GiRoundStar />
          </NavLink>
        </Footer>
      </div>
    </Container>
  );
}
