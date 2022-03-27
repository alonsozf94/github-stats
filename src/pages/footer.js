import styled from "@emotion/styled";
import { NavLink, useLocation } from "react-router-dom";
import { RiSearchFill } from "react-icons/ri";
import { GiRoundStar } from "react-icons/gi";
import { BsFillPersonFill } from "react-icons/bs";
import { colors } from "../styles";

const Container = styled.div`
  max-width: 480px;
  margin: 42px auto 0 auto;
  padding: 10px 85px 12px 85px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 63px;
  border-top: 2px solid #b5b5b5;
`;

export default function Footer({ active }) {
  const temp = useLocation().pathname.substring(1);

  return (
    <Container>
      <NavLink to={"/profile"} style={{ cursor: "pointer", color: "#828282" }}>
        <BsFillPersonFill
          size={56}
          color={temp === "profile" ? colors.gray[3] : colors.gray[4]}
        />
      </NavLink>
      <NavLink to={"/"} style={{ cursor: "pointer", color: "#828282" }}>
        <RiSearchFill
          size={56}
          color={temp === "home" ? colors.gray[3] : colors.gray[4]}
        />
      </NavLink>
      <NavLink
        to={"/favorites"}
        style={{ cursor: "pointer", color: "#828282" }}
      >
        <GiRoundStar
          size={56}
          color={temp === "favorites" ? colors.gray[3] : colors.gray[4]}
        />
      </NavLink>
    </Container>
  );
}
