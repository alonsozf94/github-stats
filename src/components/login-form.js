import styled from "@emotion/styled";
import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { login } from "../services/session-service";
import Button from "./button";
import Input from "./input";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column; 
  gap: 2rem;
  min-width: 258px;
`;

export default function LoginForm() {
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    login(form).catch((error) => {
      const newErrors = JSON.parse(error);
      setErrors({ ...errors, ...newErrors });
    });
  }

  function handleFormChange(event) {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }
  
  return (
    <StyledForm onSubmit={handleSubmit}>
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="example@mail.com"
        value={form.email}
        onChange={handleFormChange}
        error={errors.toString()}
      />
      <Input
        id="password"
        label="Paswword"
        type="password"
        placeholder="******"
        value={form.password}
        onChange={handleFormChange}
        error={errors.toString()}
      />
      <Button fullWidth type="submit">
        Login
      </Button>
    </StyledForm>
  )
}