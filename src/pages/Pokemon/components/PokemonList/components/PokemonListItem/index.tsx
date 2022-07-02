import { Pokemon } from "pokenode-ts";
import { Link } from "react-router-dom";

import * as S from "./styles";

export const PokemonListItem = (pokemon: Pokemon) => (
  <S.PokemonListItemWrapper>
    <Link to={`/pokemon/${pokemon.name}`}>
      {pokemon.sprites.front_default && (
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      )}
      <S.PokemonName>{pokemon.name}</S.PokemonName>
    </Link>
  </S.PokemonListItemWrapper>
);
