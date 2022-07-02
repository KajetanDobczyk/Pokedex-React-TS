import { Pokemon } from "pokenode-ts";

import { PokemonListItem } from "./components/PokemonListItem";
import * as S from "./styles";

type Props = {
  pokemon: Pokemon[];
};

const PokemonList = ({ pokemon }: Props) => (
  <S.StyledPokemonList>
    {pokemon.map((pokemon) => (
      <PokemonListItem key={pokemon.name} {...pokemon} />
    ))}
  </S.StyledPokemonList>
);

export default PokemonList;
