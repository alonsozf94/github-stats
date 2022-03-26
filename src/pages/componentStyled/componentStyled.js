import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

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
