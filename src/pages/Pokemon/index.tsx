import { useContext, useEffect } from "react";
import { CircularProgress } from "@chakra-ui/react";

import { PokedexContext } from "context/PokedexContext";
import Message from "common/components/Message";

import PokemonList from "./components/PokemonList";
import FilterInputs from "./components/FilterInputs";

const Pokemon = () => {
  const { filteredPokemon, pokemonTypes } = useContext(PokedexContext);

  useEffect(() => {
    if (pokemonTypes.status === "idle") {
      pokemonTypes.fetchAll();
    }

    if (filteredPokemon.status === "idle") {
      filteredPokemon.fetchAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    ["idle", "inProgress"].includes(filteredPokemon.status) ||
    ["idle", "inProgress"].includes(pokemonTypes.status)
  ) {
    return (
      <Message text="Initializing Pokemon database, might take a while...">
        <CircularProgress isIndeterminate />
      </Message>
    );
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
