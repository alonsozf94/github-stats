import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { RiStarFill } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { BsFileCodeFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { RiUserFollowLine } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { RiSearchFill } from "react-icons/ri";
import { GiRoundStar } from "react-icons/gi";
import * as C from "./componentStyled/componentStyled";
import { useAuth } from "../context/auth-context";

export const FavoriteStar = styled(RiStarFill)`
  color: yellow;
`;

const Star = styled(RiStarFill)``;

export function SearchPage() {
  const { search, searchedUser, favorite, unfavorite } = useAuth();
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    search(query);
    console.log(searchedUser);
  }

  function HandleCreateFavorite() {
    searchedUser.favorite = true;
    favorite();
  }

  function handleRemoveFavorite(id) {
    unfavorite(searchedUser.favorite_id);
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

      {searchedUser ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <C.Avatar src={searchedUser.urlAvatar} alt="avatar" />
          <div
            style={{
              display: "flex",
              gap: "4px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <C.Name>{searchedUser.name}</C.Name>
            {searchedUser.favorite ? (
              <FavoriteStar onClick={handleRemoveFavorite} />
            ) : (
              <Star onClick={HandleCreateFavorite} />
            )}
          </div>
          <p>{searchedUser.description}</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1rem",
            }}
          >
            <C.Card to={"/followers"} style={{ cursor: "pointer" }}>
              <MdGroups
                style={{ width: "50px", height: "50px", color: "#2D9CDB" }}
              />
              <C.Number>{searchedUser.cantFollowers}</C.Number>
              <C.Text>followers</C.Text>
            </C.Card>

            <C.Card to={"/following"} style={{ cursor: "pointer" }}>
              <RiUserFollowLine
                style={{ width: "50px", height: "50px", color: "#F2994A" }}
              />
              <C.Number>{searchedUser.cantFollowing}</C.Number>
              <C.Text>following</C.Text>
            </C.Card>

            <C.Card to={"/repos"} style={{ cursor: "pointer" }}>
              <FaBook
                style={{ width: "50px", height: "50px", color: "#219653" }}
              />
              <C.Number>{searchedUser.cantFollowing}</C.Number>
              <C.Text>Public Repos</C.Text>
            </C.Card>

            <C.Card to={"/gists"} style={{ cursor: "pointer" }}>
              <BsFileCodeFill
                style={{ width: "50px", height: "50px", color: "#828282" }}
              />
              <C.Number>{searchedUser.cantGists}</C.Number>
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
      ) : (
        ""
      )}
    </C.Container>
  );
}
