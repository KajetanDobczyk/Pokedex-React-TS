import { Pokemon } from "api/mockedApi/client";

import * as S from "./styles";

export const PokemonListItem = (pokemon: Pokemon) => (
  <S.PokemonListItemWrapper w="100%">
    <S.StyledLink to={`/pokemon/${pokemon.name}`}>
      {pokemon.image.sprite && <S.Sprite src={pokemon.image.sprite} alt={pokemon.name.english} />}
      <S.Name as="h3" size="md">
        {pokemon.name.english}
      </S.Name>
    </S.StyledLink>
  </S.PokemonListItemWrapper>
);
