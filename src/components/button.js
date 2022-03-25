import styled from "@emotion/styled";
import { colors, fonts, typography } from "../styles";

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${colors.blue[2]};
  ${typography.lg}
  font-weight: 700;
  color: ${colors.white};
  border: none;
  cursor: pointer;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`

function Button(props) {
  return (
    <StyledButton {...props}>
      {props.children}
    </StyledButton>
  )
}

export default Button