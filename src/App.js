import { useState } from "react";

const initialState = {
  nickName: null,
  name: null,
  urlAvatar: null,
  cantFollowers: null,
  cantFollowing: null,
  cantPublic_gists: null,
  cantPublic_repos: null,
};

function App() {
  const [query, setQuery] = useState("");
  const [state, setData] = useState(initialState);

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
        console.log(data);
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
        });
      })
      .catch((error) => console.log(error));
  }

  function showFollowers() {
    console.log(state.urlFollowers);
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
      <h4>{state.nickName}</h4>
      <img src={state.urlAvatar} alt="avatar" />
      <p>{state.description}</p>
      <p onClick={showFollowers} style={{ cursor: "pointer" }}>
        followers: {state.cantFollowers}
      </p>
      <p onClick={showFollowing} style={{ cursor: "pointer" }}>
        followings: {state.cantFollowing}
      </p>
      <p onClick={showRepos} style={{ cursor: "pointer" }}>
        repos: {state.cantRepos}
      </p>
      <p onClick={showGists} style={{ cursor: "pointer" }}>
        public gists: {state.cantGists}
      </p>
    </div>
  );
}

export default App;
