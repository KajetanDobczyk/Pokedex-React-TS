import { Pokemon } from "pokenode-ts";

import * as S from "./styles";

export const PokemonListItem = (pokemon: Pokemon) => (
  <S.PokemonListItemWrapper w="100%">
    <S.StyledLink to={`/pokemon/${pokemon.name}`}>
      {pokemon.sprites.front_default && (
        <S.Sprite src={pokemon.sprites.front_default} alt={pokemon.name} />
      )}
      <S.Name as="h3" size="md">
        {pokemon.name}
      </S.Name>
    </S.StyledLink>
  </S.PokemonListItemWrapper>
);
