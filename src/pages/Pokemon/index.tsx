import { useContext } from "react";

import { FilterParam, PokedexContext } from "../../context/PokedexContext";
import PokemonList from "./components/PokemonList";

const Pokemon = () => {
  const { filterParams, pokemonTypes, updateFilterParam } = useContext(PokedexContext);

  const handleInputChange =
    (filterParam: FilterParam) =>
    (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
      updateFilterParam(filterParam, event.target.value);

  return (
    <>
      <input value={filterParams.name} onChange={handleInputChange("name")} />
      <select onChange={handleInputChange("type")}>
        {pokemonTypes?.map((type) => (
          <option key={type.name}>{type.name}</option>
        ))}
      </select>
      <PokemonList />
    </>
  );
};

export default Pokemon;
