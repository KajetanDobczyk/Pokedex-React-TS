import { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { PokedexContext } from "context/PokedexContext";

import PokemonInfoPiece from "./components/PokemonInfoPiece";
import * as S from "./styles";

const PokemonDetails = () => {
  let { name } = useParams();

  const { singlePokemon, updateSinglePokemonByName, isFetching } = useContext(PokedexContext);

  useEffect(() => {
    if (!name) {
      return;
    }

    updateSinglePokemonByName(name);
  }, []);

  if (isFetching) {
    return <S.Message>Getting pokemon info, please wait...</S.Message>;
  }

  if (!name || !singlePokemon) {
    return <S.Message>Couldn't find Pokemon with this name...</S.Message>;
  }

  return (
    <S.PokemonDetailsWrapper>
      <Link to="/pokemon">Go back to pokemon list</Link>
      <S.PokemonInfo>
        <S.Name>{singlePokemon.name}</S.Name>
        {singlePokemon.sprites.front_default && (
          <S.Sprite src={singlePokemon.sprites.front_default} alt={singlePokemon.name} />
        )}
        <PokemonInfoPiece header="Order" text={singlePokemon.order.toString()} />
        <PokemonInfoPiece
          header="Base experience"
          text={singlePokemon.base_experience.toString()}
        />
        <PokemonInfoPiece
          header="Types"
          text={singlePokemon.types.map((type) => type.type.name).join(", ")}
        />
      </S.PokemonInfo>
    </S.PokemonDetailsWrapper>
  );
};

export default PokemonDetails;
