import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import { getUser } from "../services/users-service";
import { updateUser } from "../services/users-service";
import Button from "../components/button";
import Input from "../components/input";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;

function ProfilePage({email, password, first_name, last_name}) {
  
  const [form, setForm] = useState({
    email: (email ? email : ""),
    password: (password ? password : ""),
    first_name: (first_name ? first_name : ""),
    last_name: (last_name ? last_name : ""),
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  /*useEffect(() => {
    setForm({email: email, password: passwordi, first_name: first_name, last_name: last_name})
  }, [])*/

  function handleSubmit(event) {
    event.preventDefault();

    updateUser(form).catch((error) => {
      const newErrors = JSON.parse(error.message);
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
        value={form.email.toString()}
        onChange={handleFormChange}
        error={errors.email.toString()}
      />
       <Input
        id="password"
        label="Password"
        type="password"
        placeholder="******"
        value={form.password.toString()}
        onChange={handleFormChange}
        error={errors.password.toString()}
      />
      <Input
        id="first_name"
        label="First Name"
        placeholder="John"
        value={form.first_name.toString()}
        onChange={handleFormChange}
        error={errors.first_name.toString()}
      />
      <Input
        id="last_name"
        label="Last Name"
        placeholder="Doe"
        value={form.last_name.toString()}
        onChange={handleFormChange}
        error={errors.last_name.toString()}
      />
      <Button fullWidth type="submit">
        Update
      </Button>
    </StyledForm>
  )

}

export default ProfilePage;