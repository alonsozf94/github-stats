import { useState } from "react";
import styled from "@emotion/styled";
import { RiStarFill } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { BsFileCodeFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { RiUserFollowLine } from "react-icons/ri";
import { BsGithub } from "react-icons/bs";
import * as C from "./componentStyled/componentStyled";
import { useAuth } from "../context/auth-context";

export const FavoriteStar = styled(RiStarFill)`
  color: yellow;
`;

const Star = styled(RiStarFill)``;

export function SearchPage() {
  const { search, searchedUser, favorite, unfavorite, status } = useAuth();
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

      {status === "" && (
        <div>
          <BsGithub style={{ height: "7.5em", width: "7.5em" }} />
          <p
            style={{
              fontWeight: "700",
              fontSize: "20px",
              lineHeight: "25px",
              textAlign: "center",
            }}
          >
            No users...
          </p>{" "}
        </div>
      )}
      {status === "loading" && (
        <div>
          <BsGithub style={{ height: "7.5em", width: "7.5em" }} />
          <p
            style={{
              fontWeight: "700",
              fontSize: "20px",
              lineHeight: "25px",
              textAlign: "center",
            }}
          >
            Retrieven user...
          </p>
        </div>
      )}
      {status === "error" && <h1>El username que ingresaste no existe!...</h1>}
      {console.log("STATUS: ", status)}
      {status === "success" && (
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
        </div>
      )}
    </C.Container>
  );
}
