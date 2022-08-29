import { Pokemon } from "api/mockedApi/client";

import { PokemonListItem } from "./components/PokemonListItem";
import * as S from "./styles";

type Props = {
  pokemon: Pokemon[];
};

const PokemonList = ({ pokemon }: Props) => (
  <S.StyledGrid columns={{ sm: 2, md: 3, lg: 6 }}>
    {pokemon.map((pokemon) => (
      <PokemonListItem key={pokemon.id} {...pokemon} />
    ))}
  </S.StyledGrid>
);

export default PokemonList;
