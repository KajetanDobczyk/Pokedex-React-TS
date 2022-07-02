import React, { createContext, useState } from "react";
import { Pokemon } from "pokenode-ts";

type PokedexContextType = {
  searchParams: {
    name: string;
  };
  setSearchName: (name: string) => void;
  pokemonList: Pokemon[] | null;
  setPokemonList: (pokemonList: Pokemon[]) => void;
  isFetching: boolean;
  setIsFetching: (isFetching: boolean) => void;
};

const pokedexContext: PokedexContextType = {
  searchParams: {
    name: "",
  },
  setSearchName: () => undefined,
  pokemonList: null,
  setPokemonList: () => undefined,
  isFetching: false,
  setIsFetching: () => undefined,
};

export const PokedexContext = createContext<PokedexContextType>(pokedexContext);

const PokedexContextProvider = ({ children }: React.PropsWithChildren) => {
  const [searchParams, setSearchParams] = useState({ name: "" });
  const [pokemonList, setPokemonList] = useState<Pokemon[] | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const setSearchName = (name: string) => setSearchParams({ ...searchParams, name });

  return (
    <PokedexContext.Provider
      value={{
        searchParams,
        setSearchName,
        pokemonList,
        setPokemonList,
        isFetching,
        setIsFetching,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};

export { PokedexContextProvider };
