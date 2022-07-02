import { useContext, useEffect } from "react";

import { PokedexContext } from "../../context/PokedexContext";
import PokemonList from "./components/PokemonList";

const Pokemon = () => {
  const { searchParams, updateNameSearchParam } = useContext(PokedexContext);

  useEffect(() => {
    updateNameSearchParam(searchParams.name);
  }, [searchParams.name]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    updateNameSearchParam(event.target.value);

  return (
    <>
      <input value={searchParams.name} onChange={handleInputChange} />
      <PokemonList />
    </>
  );
};

export default Pokemon;
