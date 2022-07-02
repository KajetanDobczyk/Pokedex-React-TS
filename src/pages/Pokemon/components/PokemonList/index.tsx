import { useContext } from "react";

import { PokedexContext } from "context/PokedexContext";

import { PokemonListItem } from "./components/PokemonListItem";
import * as S from "./styles";

const PokemonList = () => {
  const { filteredPokemon } = useContext(PokedexContext);

  return (
    <S.StyledPokemonList>
      {filteredPokemon?.map((pokemon) => (
        <PokemonListItem key={pokemon.name} {...pokemon} />
      ))}
    </S.StyledPokemonList>
  );
};

export default PokemonList;
