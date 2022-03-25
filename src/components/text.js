import styled from "@emotion/styled";
import { fonts, typography } from "../styles";

const Text = styled.p`
  font-family: ${fonts.primary};
  ${(props) => typography[props.size] || typography.md}
  font-weight: ${(props) => (props.bold ? "600" : "400")};
`;

export default Text;
