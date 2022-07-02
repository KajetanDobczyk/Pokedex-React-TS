import { useContext } from "react";

import { PokedexContext } from "../../context/PokedexContext";
import PokemonList from "./components/PokemonList";

const Pokemon = () => {
  const { searchParams, setSearchName } = useContext(PokedexContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchName(event.target.value);

  return (
    <>
      <input value={searchParams.name} onChange={handleInputChange} />
      <PokemonList />
    </>
  );
};

export default Pokemon;
