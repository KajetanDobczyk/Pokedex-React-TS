import { useContext } from "react";
import styled from "@emotion/styled";

import { PokedexContext } from "../../context/PokedexContext";
import PokemonList from "./components/PokemonList";
import FilterInputs from "./components/FilterInputs";

const FetchingInfo = styled.div`
  display: block;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 2rem;
`;

const Pokemon = () => {
  const { isFetching } = useContext(PokedexContext);

  if (isFetching) {
    return (
      <FetchingInfo>
        <h2>Initializing Pokemon database, might take a while...</h2>
      </FetchingInfo>
    );
  }

  return (
    <>
      <FilterInputs />
      <PokemonList />
    </>
  );
};

export default Pokemon;
