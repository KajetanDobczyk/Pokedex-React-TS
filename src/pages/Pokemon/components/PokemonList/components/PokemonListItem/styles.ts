import { GridItem, Heading } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const PokemonListItemWrapper = styled(GridItem)`
  padding: 1rem;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  text-transform: capitalize;
  color: #000;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 1rem 2rem;
  border: 1px solid #eee;
  transition: backgound-color 0.2s;

  &:hover {
    background-color: #eee;
  }
`;

export const Sprite = styled.img`
  max-width: 150px;
  height: auto;
`;

export const Name = styled(Heading)`
  margin-left: 1rem;
  text-transform: capitalize;
`;
