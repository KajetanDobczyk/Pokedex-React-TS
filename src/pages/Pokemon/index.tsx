import { useContext } from "react";
import styled from "@emotion/styled";

import { FilterParam, PokedexContext } from "../../context/PokedexContext";
import PokemonList from "./components/PokemonList";

const FetchingInfo = styled.h2`
  display: block;
`;

const Pokemon = () => {
  const { filterParams, pokemonTypes, updateFilterParam, isFetching } = useContext(PokedexContext);

  const handleInputChange =
    (filterParam: FilterParam) =>
    (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
      updateFilterParam(filterParam, event.target.value);

  if (isFetching) {
    return <FetchingInfo>Initializing Pokemon database, might take a while...</FetchingInfo>;
  }

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
