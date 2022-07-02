import React, { createContext, useEffect, useState } from "react";
import { PokemonClient, Stat, Type as PokemonType } from "pokenode-ts";

export type FilterParam = "name" | "type";

type FilterParams = Record<FilterParam, string | undefined>;

type PokedexContextType = {
  filterParams: FilterParams;
  updateFilterParam: (filterParam: FilterParam, value: string) => void;
  pokemonTypes: PokemonType[] | undefined;
  filteredPokemon?: Stat[];
  isFetching: boolean;
  setIsFetching: (isFetching: boolean) => void;
};

const initialFilterParams: FilterParams = {
  name: "",
  type: undefined,
};

const pokedexContext: PokedexContextType = {
  filterParams: initialFilterParams,
  updateFilterParam: () => undefined,
  pokemonTypes: undefined,
  filteredPokemon: undefined,
  isFetching: false,
  setIsFetching: () => undefined,
};

export const PokedexContext = createContext<PokedexContextType>(pokedexContext);

const PokedexContextProvider = ({ children }: React.PropsWithChildren) => {
  const [filterParams, setFilterParams] = useState(initialFilterParams);
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[] | undefined>(undefined);
  const [pokemon, setPokemon] = useState<Stat[] | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);

  const api = new PokemonClient();

  const fetchAllPokemon = async () => {
    await api
      .listPokemons(0, 1154)
      .then((data) => {
        setPokemon(data.results as any as Stat[]);
        setIsFetching(false);
      }) // I also couldn't find a way to provide type for fetched results with any generic type
      .catch((error) => console.log(error));
  };

  const fetchAllTypes = async () => {
    await api
      .listTypes(0, 1154)
      .then((data) => {
        setPokemonTypes(data.results as any as PokemonType[]);
        setIsFetching(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setIsFetching(true);
    fetchAllTypes();
    fetchAllPokemon(); // I couldn't find a way in documentation to query pokemon list by name, so I am loading them all.
  }, []);

  const updateFilterParam = (filterParam: FilterParam, value: string) => {
    setFilterParams({ ...filterParams, [filterParam]: value });
  };

  const filteredPokemon = pokemon?.filter((pokemon) =>
    pokemon.name.includes(filterParams.name?.toLowerCase() || "")
  );

  console.log(filteredPokemon);

  return (
    <PokedexContext.Provider
      value={{
        filterParams,
        updateFilterParam,
        pokemonTypes,
        filteredPokemon,
        isFetching,
        setIsFetching,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};

export { PokedexContextProvider };
