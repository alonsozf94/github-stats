import { useReducer, useState } from "react";

const initialState = {
  nickName: null,
  name: null,
  urlAvatar: null,
  cantFollowers: null,
  cantFollowing: null,
  Followers: null,
  Following: null,
  cantPublic_gists: null,
  cantPublic_repos: null,
  Gists: null,
  Repos: null,
};

function reducer(state, data) {
  console.log(data);
  if (data) {
    let arrayFollowers = [];
    let arrayFollowing = [];
    let repos = [];
    let gists = [];

    // fetch(
    //   data.followers_url + `?per_page=${data.followers}&page=1&tab=followers`,
    //   {
    //     headers: {
    //       Authorization:
    //         "Basic UnViZW5TYW5kcm86Z2hwXzlJUmhaWjJWTjd6WmdMRkRqVk5jcjUxc3BUcG81MjN6Ym1XcQ==",
    //     },
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(
    //       "%c 🔵: reducer -> data ",
    //       "font-size:16px;background-color:#ffe497;color:black;",
    //       data
    //     );

    //     data.map((followers) => arrayFollowers.push(followers.login));
    //   });

    // fetch(
    //   data.following_url.slice(0, -13) +
    //     `per_page=${data.following}&page=1&tab=following`,
    //   {
    //     headers: {
    //       Authorization:
    //         "Basic UnViZW5TYW5kcm86Z2hwXzlJUmhaWjJWTjd6WmdMRkRqVk5jcjUxc3BUcG81MjN6Ym1XcQ==",
    //     },
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     data.map((user) => arrayFollowing.push(user.login));
    //   });

    // fetch(
    //   data.gists_url.slice(0, -10) +
    //     `?per_page=${data.public_gists}&page=1&tab=gists`,
    //   {
    //     headers: {
    //       Authorization:
    //         "Basic UnViZW5TYW5kcm86Z2hwXzlJUmhaWjJWTjd6WmdMRkRqVk5jcjUxc3BUcG81MjN6Ym1XcQ==",
    //     },
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     data.map((gist) =>
    //       gists.push({
    //         description: gist.description,
    //         comments: gist.comment,
    //         url: gist.url,
    //       })
    //     );
    //   });

    // fetch(data.repos_urls + `per_page=${data.public_repos}&page=1&tab=repos`, {
    //   headers: {
    //     Authorization:
    //       "Basic UnViZW5TYW5kcm86Z2hwXzlJUmhaWjJWTjd6WmdMRkRqVk5jcjUxc3BUcG81MjN6Ym1XcQ==",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     data.map((repo) =>
    //       repos.push({
    //         fullname: repo.fullname,
    //         description: repo.description,
    //         language: repo.language,
    //         stars: repo.stargazers_count,
    //         forks: repo.forks,
    //         url: repo.html_url,
    //       })
    //     );
    //   });

    return {
      nickName: data.login,
      name: data.name,
      urlAvatar: data.avatar_url,
      cantFollowers: data.followers,
      cantFollowing: data.following,
      Followers: arrayFollowers,
      Following: arrayFollowing,
      cantGists: data.public_gists,
      cantRepos: data.public_repos,
      Gists: gists,
      Repos: repos,
    };
  } else {
    return state;
  }
}

function Browsing(name) {
  const [stateData, dataDispatch] = useReducer(reducer, initialState);

  fetch(`https://api.github.com/users/${name}`, {
    headers: {
      Authorization:
        "Basic UnViZW5TYW5kcm86Z2hwXzlJUmhaWjJWTjd6WmdMRkRqVk5jcjUxc3BUcG81MjN6Ym1XcQ==",
    },
  })
    .then((response) => response.json())
    .then(dataDispatch);

  return stateData;
}

export default Browsing;
