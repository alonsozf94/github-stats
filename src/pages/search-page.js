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
import {BsGithub} from 'react-icons/bs'
import { createFavorite, destroyFavorite } from "../services/favorite-service";
import * as C from "./componentStyled/componentStyled";

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
    JSON.parse(localStorage.getItem("data")) || null
  );
  const [states, setStates] = useState(JSON.parse(localStorage.getItem("status")) || {status: "idle", data:null, error:null})
  const status = states.status

  useEffect(() => {
    if (state.nickName !== null)
      localStorage.setItem("data", JSON.stringify(state));
  }, [state]);

  function handleSubmit(event) {
    event.preventDefault();
    const loading = {status:"loading", data:null, error: null} 
    setStates(loading)
    localStorage.setItem("status",JSON.stringify(loading))
    fetch(`https://api.github.com/users/${query}`, {
      headers: {
        Authorization:
          "Basic UnViZW5TYW5kcm86Z2hwXzlJUmhaWjJWTjd6WmdMRkRqVk5jcjUxc3BUcG81MjN6Ym1XcQ==",
      },
    })
      .then((response) => {
        if(!response.ok) throw new Error(response.status)
        return response.json()
      })
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
        const success = {
          status: "success",
          data:state,
          error: null
        }
        setStates(success)
        localStorage.setItem("status",JSON.stringify(success))
        console.log(state);
      })
      //.catch((error) => console.log(error));
      .catch(()=>{
        const data = {
          status: "Error",
          data: null,
          error: "There is no users with that name, try again"
        }
        setStates(data)
        localStorage.setItem("status",JSON.stringify(data))
      })
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

  const Footer = styled.div`
    position: absolute;
    bottom: 0px;
    display: flex;
    width: 30%;
    justify-content: space-between;
  `;

  return (
    <C.Container>
      <C.Form onSubmit={handleSubmit}>
        <C.Search
          id="search"
          placeholder="username"
          name="name"
          value={query}
          onChange={({ target }) => setQuery(target.value)}
        ></C.Search>
        <button type="submit">Search</button>
      </C.Form>

    {status === "idle" && <div><BsGithub style={{height:"7.5em", width:"7.5em"}}/><p style={{fontWeight: "700", fontSize: "20px", lineHeight: "25px", textAlign: "center"}}>No users...</p> </div>}
    {status === "loading" && <div><BsGithub style={{height:"7.5em", width:"7.5em"}}/><p style={{fontWeight: "700", fontSize: "20px", lineHeight: "25px", textAlign: "center"}}>Retrieven user...</p></div>}
    {status === "Error" && <p>{states.error}</p>}
    {console.log('STATUS: ',status)}
    { status=== "success" && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <C.Avatar src={state.urlAvatar} alt="avatar" />
        <div
          style={{
            display: "flex",
            gap: "4px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <C.Name>{state.name}</C.Name>
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
          <C.Card
            to={"/followers"}
            onClick={showFollowers}
            style={{ cursor: "pointer" }}
          >
            <MdGroups
              style={{ width: "50px", height: "50px", color: "#2D9CDB" }}
            />
            <C.Number>{state.cantFollowers}</C.Number>
            <C.Text>followers</C.Text>
          </C.Card>

          <C.Card
            to={"/following"}
            onClick={showFollowing}
            style={{ cursor: "pointer" }}
          >
            <RiUserFollowLine
              style={{ width: "50px", height: "50px", color: "#F2994A" }}
            />
            <C.Number>{state.cantFollowing}</C.Number>
            <C.Text>following</C.Text>
          </C.Card>

          <C.Card
            to={"/repos"}
            onClick={showRepos}
            style={{ cursor: "pointer" }}
          >
            <FaBook
              style={{ width: "50px", height: "50px", color: "#219653" }}
            />
            <C.Number>{state.cantFollowing}</C.Number>
            <C.Text>Public Repos</C.Text>
          </C.Card>

          <C.Card
            to={"/gists"}
            onClick={showGists}
            style={{ cursor: "pointer" }}
          >
            <BsFileCodeFill
              style={{ width: "50px", height: "50px", color: "#828282" }}
            />
            <C.Number>{state.cantGists}</C.Number>
            <C.Text>Public Gists</C.Text>
          </C.Card>
        </div>

        <Footer>
          <NavLink
            to={"/profile"}
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
      )}
    </C.Container>
  );
}