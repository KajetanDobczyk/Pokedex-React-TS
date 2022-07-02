import { useContext } from "react";
import styled from "@emotion/styled";

import { PokedexContext } from "context/PokedexContext";
import { Link } from "react-router-dom";

const StyledPokemonList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
`;

const PokemonInfo = styled.li`
  padding: 1rem;
`;

const PokemonList = () => {
  const { filteredPokemon } = useContext(PokedexContext);

  return (
    <StyledPokemonList>
      {filteredPokemon?.map((pokemon) => (
        <PokemonInfo key={pokemon.name}>
          <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
        </PokemonInfo>
      ))}
    </StyledPokemonList>
  );
};

export default PokemonList;
