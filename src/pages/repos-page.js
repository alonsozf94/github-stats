import { useState, useEffect } from "react";

function ReposPage() {
  const [repos, setRepos] = useState([]);
  const data = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    console.log(data);
    fetch(data.urlRepos.concat(`?per_page=7&page=${1}&tab=followers`), {
      headers: {
        Authorization:
          "Basic UnViZW5TYW5kcm86Z2hwXzlJUmhaWjJWTjd6WmdMRkRqVk5jcjUxc3BUcG81MjN6Ym1XcQ==",
      },
    })
      .then((response) => response.json())
      .then(setRepos);
  }, []);

  function ListRepos() {
    return repos.map((repository) => (
      <div
        key={repository.id}
        style={{
          display: "flex",
          gap: "4px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p> {repository.full_name} </p>
        <p> {repository.description} </p>

        <div style={{ display: "flex", gap: "4px" }}>
          <p> {repository.language} </p>
          <p> {repository.stargazers_count} </p>
          <p> {repository.forks_count} </p>
        </div>
      </div>
    ));
  }

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
      <ListRepos />;
    </div>
  );
}
export default ReposPage;
