import { Pokemon } from "pokenode-ts";
import { Link } from "react-router-dom";

import * as S from "./styles";

export const PokemonListItem = (pokemon: Pokemon) => (
  <S.PokemonListItemWrapper>
    <Link to={`/pokemon/${pokemon.name}`}>
      {pokemon.sprites.front_default && (
        <S.Sprite src={pokemon.sprites.front_default} alt={pokemon.name} />
      )}
      <S.Name>{pokemon.name}</S.Name>
    </Link>
  </S.PokemonListItemWrapper>
);
