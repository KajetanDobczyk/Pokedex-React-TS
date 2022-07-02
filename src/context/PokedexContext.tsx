import React, { createContext, useEffect, useState } from "react";
import { PokemonClient, Stat } from "pokenode-ts";

type PokedexContextType = {
  searchParams: {
    name: string;
  };
  updateNameSearchParam: (name: string) => void;
  pokemonList: Stat[] | null;
  isFetching: boolean;
  setIsFetching: (isFetching: boolean) => void;
};

const pokedexContext: PokedexContextType = {
  searchParams: {
    name: "",
  },
  updateNameSearchParam: () => undefined,
  pokemonList: [],
  isFetching: false,
  setIsFetching: () => undefined,
};

export const PokedexContext = createContext<PokedexContextType>(pokedexContext);

const PokedexContextProvider = ({ children }: React.PropsWithChildren) => {
  const [searchParams, setSearchParams] = useState({ name: "" });
  const [pokemonList, setPokemonList] = useState<Stat[] | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const api = new PokemonClient();

  const fetchAllPokemon = async () => {
    await api
      .listPokemons(0, 1154)
      .then((data) => setPokemonList(data.results as any as Stat[])) // I also couldn't find a way to provide type for fetched results with any generic type
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchAllPokemon(); // I couldn't find a way in documentation to query pokemon list by name, so I am loading them all.
  }, []);

  const updateNameSearchParam = (name: string) => {
    setSearchParams({ ...searchParams, name });
  };

  return (
    <PokedexContext.Provider
      value={{
        searchParams,
        updateNameSearchParam,
        pokemonList,
        isFetching,
        setIsFetching,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};

export { PokedexContextProvider };
