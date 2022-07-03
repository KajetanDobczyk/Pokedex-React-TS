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
    if (name && singlePokemon.status === "idle") {
      singlePokemon.updateSinglePokemonByName(name);
    }
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
        <S.Name size="lg">{pokemonData.name}</S.Name>
        {pokemonData.sprites.front_default && (
          <S.Sprite src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        )}
        <PokemonInfoPiece label="Order" text={pokemonData.order.toString()} />
        <PokemonInfoPiece label="Base experience" text={pokemonData.base_experience.toString()} />
        <PokemonInfoPiece
          label="Types"
          text={pokemonData.types.map((type) => type.type.name).join(", ")}
        />
      </S.PokemonInfo>
    </S.PokemonDetailsWrapper>
  );
};

export default PokemonDetails;
