import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFavorite, destroyFavorite } from "../services/favorite-service";
import { login, logout } from "../services/session-service";
import { createUser, getUser, updateUser } from "../services/users-service";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [searchedUser, setSearchedUser] = useState(
    JSON.parse(localStorage.getItem("data")) || null
  );
  const [myFavorites, setMyFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || null
  );
  const navigate = useNavigate();

  useEffect(() => {
    getUser()
      .then(setUser)
      .catch((error) => console.log(error));
  }, []);

  function handleLogin(credentials) {
    return login(credentials).then((user) => {
      setUser(user);
      navigate("/search");
    });
  }

  function handleSignup(userData) {
    return createUser(userData).then((user) => {
      setUser(user);
      navigate("/search");
    });
  }

  function handleUpdate(userData) {
    return updateUser(userData).then((user) => {
      setUser(user);
      navigate("/home");
    });
  }

  function handleLogout() {
    return logout().finally(() => {
      setUser(null);
      navigate("/");
    });
  }

  function handleSearchUser(username) {
    return fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization:
          "Basic UnViZW5TYW5kcm86Z2hwXzlJUmhaWjJWTjd6WmdMRkRqVk5jcjUxc3BUcG81MjN6Ym1XcQ==",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const newData = {
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
        };
        setSearchedUser(newData);
      });
  }

  function HandleCreateFavorite() {
    console.log(searchedUser);
    return createFavorite({
      name: searchedUser.name,
      username: searchedUser.nickName,
      avatar_url: searchedUser.urlAvatar,
    }).then((data) => {
      const newFavorite = {
        id: data.id,
        username: data.username,
        name: data.name,
        avatar_url: data.avatar_url,
      };
      console.log(myFavorites);
      setMyFavorites(
        myFavorites ? [...myFavorites, newFavorite] : [newFavorite]
      );
      localStorage.setItem(
        "favorites",
        JSON.stringify(
          myFavorites ? [...myFavorites, newFavorite] : [newFavorite]
        )
      );
      const modify = searchedUser;
      modify.favorite_id = data.id;
      setSearchedUser(modify);

      localStorage.setItem("data", JSON.stringify(modify));
    });
  }

  function HandleDestroyFavorite(id) {
    const listFavorites = myFavorites.filter(
      (favorite) => favorite.id * 1 !== id * 1
    );
    console.log(
      "%c 🇩🇪: HandleDestroyFavorite -> id ",
      "font-size:16px;background-color:#f90574;color:white;",
      id
    );
    setMyFavorites(listFavorites);
    localStorage.setItem("favorites", JSON.stringify(listFavorites));
    const userModify = searchedUser;
    userModify.favorite = false;
    userModify.favorite_id = null;
    setSearchedUser(userModify);
    localStorage.setItem("data", JSON.stringify(searchedUser));
    console.log(
      "%c 🇸🇽: HandleDestroyFavorite -> id ",
      "font-size:16px;background-color:#538d8e;color:white;",
      id
    );
    destroyFavorite(id);
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        searchedUser,
        myFavorites,
        login: handleLogin,
        signup: handleSignup,
        logout: handleLogout,
        update: handleUpdate,
        search: handleSearchUser,
        favorite: HandleCreateFavorite,
        unfavorite: HandleDestroyFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
