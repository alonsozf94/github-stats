import styled from "@emotion/styled";
import { useState } from "react";
import { useAuth } from "../context/auth-context";
import Button from "../components/button";
import Input from "../components/input";
import { CustomLink } from "../components/custom-link";
import Text from "../components/text";

const Section = styled.div`
  margin: 96px auto 0 auto;
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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;

function ProfilePage({ email, password, first_name, last_name }) {
  const { logout, user, update } = useAuth();

  const [form, setForm] = useState({
    email: user.email,
    password: "",
    first_name: user.first_name,
    last_name: user.last_name,
  });
  console.log(
    "%c 🇰🇷: ProfilePage -> form ",
    "font-size:16px;background-color:#d78ff8;color:white;",
    form
  );

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    update(form);
  }

  function handleFormChange(event) {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  return (
    <Section>
      <Container>
        <Title size="xl" bold>
          Profile
        </Title>
        <StyledForm onSubmit={handleSubmit}>
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="example@mail.com"
            value={form.email}
            onChange={handleFormChange}
            error={errors.email.toString()}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="******"
            value={form.password}
            onChange={handleFormChange}
            error={errors.password.toString()}
          />
          <Input
            id="first_name"
            label="First Name"
            placeholder="John"
            value={form.first_name}
            onChange={handleFormChange}
            error={errors.first_name.toString()}
          />
          <Input
            id="last_name"
            label="Last Name"
            placeholder="Doe"
            value={form.last_name}
            onChange={handleFormChange}
            error={errors.last_name.toString()}
          />
          <Button fullWidth type="submit">
            Update
          </Button>
        </StyledForm>
        <CustomLink size="lg" onClick={logout}>
          Logout
        </CustomLink>
      </Container>
    </Section>
  );
}

export default ProfilePage;
