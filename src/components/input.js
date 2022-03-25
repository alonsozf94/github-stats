import styled from "@emotion/styled";
import { colors, typography } from "../styles";
import Text from "./text";

const Label = Text.withComponent("label");

const StyledInput = styled.input`
  padding: 0.5rem;
  ${typography.lg}
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  background-color: ${colors.white};
  color: ${colors.gray[4]};
  outline: none;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const Error = styled(Text)`
  color: red;
  padding-left: 1rem;
`

function Input({
  id,
  name,
  type = "text",
  placeholder,
  label,
  error,
  ...rest
}) {
  name ||= id;

  return (
    <InputContainer>
      {label && <Label htmlFor="id">{label}</Label>}
      <StyledInput
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        {...rest}
      />
      {error && <Error size="sm">{error}</Error>}
    </InputContainer>
  );
}

export default Input;