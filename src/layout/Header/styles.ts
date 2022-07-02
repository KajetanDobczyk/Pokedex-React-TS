import styled from "@emotion/styled";

import { ReactComponent as Logo } from "assets/pokeball.svg";
import theme from "theme";

export const Nav = styled.nav`
  padding: 0 2rem;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  position: fixed;
  background-color: #fff;
  width: 100%;
  height: ${theme.headerHeight};
`;

export const StyledLogo = styled(Logo)`
  width: 1.5rem;
  margin-right: 1rem;
`;
