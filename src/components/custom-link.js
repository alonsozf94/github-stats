import styled from "@emotion/styled";
import { colors } from "../styles";
import Text from "./text";


export const CustomLink = styled(Text.withComponent("a"))`
  cursor: pointer;
  color: ${colors.blue[2]};
  font-weight: 700;
  &:hover {
    color: ${colors.blue[1]};
  }
`