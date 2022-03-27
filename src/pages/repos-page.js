import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { colors } from "../styles";
import { CgGitFork } from "react-icons/cg";
import { RiStarLine } from "react-icons/ri";
import { VscCircleLargeFilled } from "react-icons/vsc";
import {Title} from "./componentStyled/componentStyled";


const RepoCard = styled.div`
  padding: 8px 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: flex-start;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  background-color: white;
`
const RepoName = styled.p`
  color: ${colors.blue[1]};
  font-weight: bold;
`
const RepoSpecs = styled.div`
 display: flex;
 gap: 16px;
`
const RepoSpecsItem = styled.div`
 display: flex;
 gap: 4px;
 align-items: center;
`

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
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}
      >
        {repos.map((repository) => (
        <RepoCard key={repository.id}>
          <RepoName> {repository.full_name} </RepoName>
          <p> {repository.description} </p>

          <RepoSpecs>
            <RepoSpecsItem>
              <VscCircleLargeFilled color={repository.language ? "#F2C94C" : "#E0E0E0"} />
              <p> {repository.language ? repository.language : "none"} </p>
            </RepoSpecsItem>
            <RepoSpecsItem><RiStarLine/><p> {repository.stargazers_count} </p></RepoSpecsItem>
            
            <RepoSpecsItem><CgGitFork/><p> {repository.forks_count} </p></RepoSpecsItem>
          </RepoSpecs>
        </RepoCard>
          ))}
      </div>
    )
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
      <Title>Repos</Title>
      <ListRepos/>
    </div>
  );
}
export default ReposPage;
