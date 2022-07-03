import { Pokemon } from "pokenode-ts";

import Message from "common/components/Message";

import { PokemonListItem } from "./components/PokemonListItem";
import * as S from "./styles";

type Props = {
  pokemon: Pokemon[];
};

const PokemonList = ({ pokemon }: Props) =>
  pokemon.length ? (
    <S.StyledGrid columns={{ sm: 2, md: 3, lg: 6 }}>
      {pokemon.map((pokemon) => (
        <PokemonListItem key={pokemon.id} {...pokemon} />
      ))}
    </S.StyledGrid>
  ) : (
    <Message text="No pokemons exist with these parameters" />
  );

export default PokemonList;
