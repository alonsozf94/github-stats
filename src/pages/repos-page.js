import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { colors } from "../styles";
import { CgGitFork } from "react-icons/cg";
import { RiStarLine } from "react-icons/ri";
import { VscCircleLargeFilled } from "react-icons/vsc";
import { Title } from "./componentStyled/componentStyled";
import { useAuth } from "../context/auth-context";
import { FaGreaterThan } from "react-icons/fa";
import { FaLessThan } from "react-icons/fa";
import * as C from "./componentStyled/componentStyled";

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
`;
const RepoName = styled.p`
  color: ${colors.blue[1]};
  font-weight: bold;
`;
const RepoSpecs = styled.div`
  display: flex;
  gap: 16px;
`;
const RepoSpecsItem = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

function ReposPage() {
  const { repos, searchedUser, getRepos } = useAuth();
  const [PageRange, setPageRange] = useState({ p: 1, r: 1 });
  const TotalFollowers = searchedUser.cantFollowers;
  const TotalPages = Math.ceil((TotalFollowers * 1) / 7);

  useEffect(() => {
    getRepos(searchedUser.urlRepos, PageRange.p);
  }, [PageRange]);

  function ListRepos() {
    if (!repos) return <h1>El usuario aún no tiene Repos!!!!</h1>;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {repos.map((repository) => (
          <RepoCard key={repository.id}>
            <RepoName> {repository.full_name} </RepoName>
            <p> {repository.description} </p>

            <RepoSpecs>
              <RepoSpecsItem>
                <VscCircleLargeFilled
                  color={repository.language ? "#F2C94C" : "#E0E0E0"}
                />
                <p> {repository.language ? repository.language : "none"} </p>
              </RepoSpecsItem>
              <RepoSpecsItem>
                <RiStarLine />
                <p> {repository.stargazers_count} </p>
              </RepoSpecsItem>

              <RepoSpecsItem>
                <CgGitFork />
                <p> {repository.forks_count} </p>
              </RepoSpecsItem>
            </RepoSpecs>
          </RepoCard>
        ))}
      </div>
    );
  }

  const ContainerPages = () => {
    let arrayPages = Array.from([0, 1, 2, 3, 4], (x) => x + PageRange.r);
    return arrayPages.map((number) =>
      TotalPages >= number ? (
        <C.Pages keys={number}>
          <C.NumberPage
            onClick={() => setPageRange({ p: number, r: PageRange.r })}
            style={
              PageRange.p === number
                ? { backgroundColor: "#2D9CDB", color: "white" }
                : {}
            }
          >
            {number}
          </C.NumberPage>
        </C.Pages>
      ) : (
        ""
      )
    );
  };

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
      <div
        style={{
          display: "flex",
          gap: "4px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FaLessThan
          onClick={() =>
            PageRange.r > 1
              ? setPageRange({
                  p: Math.floor(PageRange.p / 5) * 5,
                  r: PageRange.r - 5,
                })
              : ""
          }
          style={{ cursor: "pointer" }}
        />
        <ContainerPages />
        <FaGreaterThan
          onClick={() =>
            TotalPages > PageRange.r + 5
              ? setPageRange({
                  p: Math.ceil(PageRange.p / 5) * 5 + 1,
                  r: PageRange.r + 5,
                })
              : ""
          }
          style={{ cursor: "pointer" }}
        />
      </div>
      <ListRepos />
    </div>
  );
}
export default ReposPage;
