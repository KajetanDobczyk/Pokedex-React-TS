import React, { createContext, useEffect, useState } from "react";
import { NamedAPIResource, Pokemon, PokemonClient } from "pokenode-ts";

export type FilterParam = "name" | "type";

type FilterParams = Record<FilterParam, string>;

type PokedexContextType = {
  filterParams: FilterParams;
  updateFilterParam: (filterParam: FilterParam, value: string) => void;
  pokemonTypes: NamedAPIResource[] | undefined;
  filteredPokemon?: Pokemon[];
  singlePokemon?: Pokemon;
  updateSinglePokemonByName: (name: string) => void;
  isFetching: boolean;
  setIsFetching: (isFetching: boolean) => void;
};

const initialFilterParams: FilterParams = {
  name: "",
  type: "",
};

const pokedexContext: PokedexContextType = {
  filterParams: initialFilterParams,
  updateFilterParam: () => undefined,
  pokemonTypes: undefined,
  filteredPokemon: undefined,
  singlePokemon: undefined,
  updateSinglePokemonByName: () => undefined,
  isFetching: false,
  setIsFetching: () => undefined,
};

export const PokedexContext = createContext<PokedexContextType>(pokedexContext);

const PokedexContextProvider = ({ children }: React.PropsWithChildren) => {
  const [filterParams, setFilterParams] = useState(initialFilterParams);
  const [pokemonTypes, setPokemonTypes] = useState<NamedAPIResource[] | undefined>(undefined);
  const [pokemon, setPokemon] = useState<Pokemon[] | undefined>(undefined);
  const [singlePokemon, setSinglePokemon] = useState<Pokemon | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);

  const api = new PokemonClient();

  const fetchAllPokemon = async () => {
    setIsFetching(true);

    await api
      .listPokemons(0, 1154)
      .then(async (data) => {
        const pokemonNames = data.results.map((pokemon) => pokemon.name);
        const fetchedPokemon: Pokemon[] = [];

        for (const name of pokemonNames) {
          await api
            .getPokemonByName(name)
            .then((data) => fetchedPokemon.push(data))
            .catch((error) => console.log(error));
        }

        setPokemon(fetchedPokemon);
        setIsFetching(false);
      })
      .catch((error) => console.log(error));
  };

  const fetchAllTypes = async () => {
    await api
      .listTypes(0, 1154)
      .then((data) => {
        setPokemonTypes(data.results);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setIsFetching(true);
    fetchAllTypes();
    fetchAllPokemon(); // I couldn't find a way in documentation to query pokemon list by name / type, so I am loading them all on start...
  }, []);

  const updateFilterParam = (filterParam: FilterParam, value: string) => {
    setFilterParams({ ...filterParams, [filterParam]: value });
  };

  const updateSinglePokemonByName = async (name: string) => {
    setIsFetching(true);

    if (pokemon?.length) {
      setSinglePokemon(pokemon.find((singlePokemon) => singlePokemon.name === name));
    } else {
      await api
        .getPokemonByName(name)
        .then(async (data) => {
          setSinglePokemon(data);
          setIsFetching(false);
        })
        .catch((error) => console.log(error));
    }

    setIsFetching(false);
  };

  const filteredPokemon = pokemon?.filter(
    (singlePokemon) =>
      singlePokemon.name.includes(filterParams.name?.toLowerCase() || "") &&
      singlePokemon.types
        .map((type) => type.type.name)
        .find((typeName) => typeName.includes(filterParams.type))
  );

  return (
    <PokedexContext.Provider
      value={{
        filterParams,
        updateFilterParam,
        pokemonTypes,
        filteredPokemon,
        singlePokemon,
        updateSinglePokemonByName,
        isFetching,
        setIsFetching,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};

export { PokedexContextProvider };
