import { useContext } from "react";

import { PokedexContext } from "context/PokedexContext";
import Message from "common/components/Message";

import PokemonList from "./components/PokemonList";
import FilterInputs from "./components/FilterInputs";

const Pokemon = () => {
  const { filteredPokemon, pokemonTypes } = useContext(PokedexContext);

  if (
    ["idle", "inProgress"].includes(filteredPokemon.status) ||
    ["idle", "inProgress"].includes(pokemonTypes.status)
  ) {
    return <Message text="Initializing Pokemon database, might take a while..." />;
  }

  if (!filteredPokemon.data || !pokemonTypes.data) {
    return <Message text="Error downloading the Pokemon database" />;
  }

  return (
    <>
      <FilterInputs />
      <PokemonList pokemon={filteredPokemon.data} />
    </>
  );
};

export default Pokemon;
