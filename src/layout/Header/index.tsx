import { Link } from "react-router-dom";

import * as S from "./styles";

const Header = () => (
  <S.Nav>
    <S.StyledLogo />
    <Link to="/pokemon">Pokedex</Link>
  </S.Nav>
);

export default Header;
