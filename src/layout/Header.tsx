import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const Nav = styled.nav`
  padding: 2rem;
  border-bottom: 1px solid #ccc;
`;

const Header = () => (
  <Nav>
    <Link to="/pokemon">Pokedex</Link>
  </Nav>
);

export default Header;
