import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { CustomLink } from "./components/custom-link";
import LoginForm from "./components/login-form";
import SignupForm from "./components/signup-form";
import Text from "./components/text";

const Section = styled.div`
  margin: 96px auto;
`;

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Title = Text.withComponent("h1");

function UnauthenticatedApp() {
  const [showLogin, setShowLogin] = useState(true);

  function handleLinkClick(event) {
    event.preventDefault();
    setShowLogin(!showLogin);
  }

  return (
    <Section>
      <Container>
        <Title size="xl" bold>
          Welcome to Github Stats
        </Title>
        {showLogin ? <LoginForm /> : <SignupForm />}
        <CustomLink size="lg" onClick={handleLinkClick}>
          {showLogin ? "Create Account" : "Login"}
        </CustomLink>
      </Container>
    </Section>
  );
}

export default UnauthenticatedApp;