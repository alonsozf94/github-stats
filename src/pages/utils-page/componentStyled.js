import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  max-width: 480px;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  margin-top: 32px;
`;

export const Form = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 20px;
`;

export const Search = styled.input`
  padding: 0.25rem 0.5rem;
  width: fit-content;
  background: white;
  box-shadow: 2px 2px 0 0 rgb(0, 0, 0, 0.25);
  border: none;
`;

export const Avatar = styled.img`
  width: 120px;
  border-radius: 50%;
`;

export const Name = styled.h1`
  font-family: "Source Code Pro";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  text-align: center;
  color: #000000;
`;

export const Card = styled(NavLink)`
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

export const Number = styled.p`
  font-family: "Source Code Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 35px;
  text-align: center;
  color: black;
`;

export const Text = styled.p`
  font-family: "Source Code Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: black;
`;

//----------------------

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 480px;
  margin: auto;
`;

export const Pages = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`;

export const NumberPage = styled.div`
  width: 26px;
  height: 22px;
  border-radius: 50%;
  color: black;
  font-family: "Source Code Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
export const Title = styled.h1`
  margin-bottom: 30px;
  font-family: "Source Code Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 35px;
  color: #000000;
`;

export const CardContainer = styled.div`
  height: 56px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin: 8px 0px;
`;

export const Image = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

export const Body = styled.div`
  height: 40px;
  width: 200px;
  border-radius: 50%;
`;

export const NameCard = styled.div`
  font-family: "Source Code Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
  display: flex;
  justify-content: space-between;
`;

export const Username = styled.div`
  font-family: "Source Code Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #000000;
`;

export const RepoCard = styled.div`
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
export const RepoName = styled.p`
  color: ${colors.blue[1]};
  font-weight: bold;
`;
export const RepoSpecs = styled.div`
  display: flex;
  gap: 16px;
`;
export const RepoSpecsItem = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
