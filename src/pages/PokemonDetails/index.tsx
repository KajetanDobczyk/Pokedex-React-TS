import { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { PokedexContext } from "context/PokedexContext";
import Message from "common/components/Message";

import PokemonInfoPiece from "./components/PokemonInfoPiece";
import * as S from "./styles";

const PokemonDetails = () => {
  let { name } = useParams();

  const { singlePokemon } = useContext(PokedexContext);

  useEffect(() => {
    if (name) {
      singlePokemon.updateSinglePokemonByName(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (["idle", "inProgress"].includes(singlePokemon.status)) {
    return <Message text="Getting pokemon info, please wait..." />;
  }

  if (!singlePokemon.data) {
    return <Message text="Couldn't find a pokemon with this name!" />;
  }

  const pokemonData = singlePokemon.data;

  return (
    <S.PokemonDetailsWrapper>
      <Link to="/pokemon">Go back to pokemon list</Link>
      <S.PokemonInfo>
        <S.Name size="lg">{pokemonData.name.english}</S.Name>
        {pokemonData.image.sprite && (
          <S.Sprite src={pokemonData.image.sprite} alt={pokemonData.name.english} />
        )}
        <PokemonInfoPiece label="Order" text={pokemonData.id.toString()} />
        <PokemonInfoPiece label="Species" text={pokemonData.species} />
        <PokemonInfoPiece label="Types" text={pokemonData.type.join(", ")} />
      </S.PokemonInfo>
    </S.PokemonDetailsWrapper>
  );
};

export default PokemonDetails;
