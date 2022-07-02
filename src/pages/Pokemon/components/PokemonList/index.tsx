import { Pokemon } from "pokenode-ts";

import Message from "common/components/Message";

import { PokemonListItem } from "./components/PokemonListItem";
import * as S from "./styles";

type Props = {
  pokemon: Pokemon[];
};

const PokemonList = ({ pokemon }: Props) =>
  pokemon.length ? (
    <S.StyledPokemonList>
      {pokemon.map((pokemon) => (
        <PokemonListItem key={pokemon.id} {...pokemon} />
      ))}
    </S.StyledPokemonList>
  ) : (
    <Message text="No pokemons exist with these parameters" />
  );

export default PokemonList;
