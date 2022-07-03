import { Heading } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const PokemonDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export const PokemonInfo = styled.div`
  margin-top: 2rem;
`;

export const Name = styled(Heading)`
  text-transform: capitalize;
`;

export const Sprite = styled.img`
  display: block;
`;
