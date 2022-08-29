import React, { createContext, useEffect, useState } from "react";

import api from "api";
import { Pokemon } from "api/mockedApi/client";

export type FilterParam = "name" | "type";
type FetchingStatus = "idle" | "inProgress" | "success" | "error";

type FilterParams = Record<FilterParam, string>;

type FetchedResource<R> = {
  data: R | null;
  status: FetchingStatus;
};

type PokedexContextType = {
  filters: {
    params: FilterParams;
    updateFilterParam: (filterParam: FilterParam, value: string) => void;
  };
  pokemonTypes: FetchedResource<string[]> & {
    fetchAll: () => void;
  };
  filteredPokemon: FetchedResource<Pokemon[]> & {
    fetchAll: () => void;
  };
  singlePokemon: FetchedResource<Pokemon> & {
    updateSinglePokemonByName: (name: string) => void;
  };
};

const initialFilterParams: FilterParams = {
  name: "",
  type: "",
};

const pokedexContext: PokedexContextType = {
  filters: {
    params: initialFilterParams,
    updateFilterParam: () => undefined,
  },
  pokemonTypes: {
    data: null,
    status: "idle",
    fetchAll: () => undefined,
  },
  filteredPokemon: {
    data: null,
    status: "idle",
    fetchAll: () => undefined,
  },
  singlePokemon: {
    data: null,
    status: "idle",
    updateSinglePokemonByName: () => undefined,
  },
};

export const PokedexContext = createContext<PokedexContextType>(pokedexContext);

const PokedexContextProvider = ({ children }: React.PropsWithChildren) => {
  const [filtersParams, setFiltersParams] = useState(initialFilterParams);

  const [pokemonTypes, setPokemonTypes] = useState<string[] | null>(null);
  const [pokemonTypesStatus, setPokemonTypesStatus] = useState<FetchingStatus>("idle");

  const [pokemon, setPokemon] = useState<Pokemon[] | null>(null);
  const [pokemonStatus, setPokemonStatus] = useState<FetchingStatus>("idle");

  const [singlePokemon, setSinglePokemon] = useState<Pokemon | null>(null);
  const [singlePokemonStatus, setSinglePokemonStatus] = useState<FetchingStatus>("idle");

  useEffect(() => {
    fetchAllPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersParams]);

  useEffect(() => {
    fetchAllTypes();
  }, []);

  const fetchAllTypes = async () => {
    setPokemonTypesStatus("inProgress");

    setPokemonTypes(api.pokemon.listTypes());
    setPokemonTypesStatus("success");
  };

  const fetchAllPokemon = async () => {
    setPokemonStatus("inProgress");

    const fetchedPokemon = api.pokemon.listPokemon({
      name: filtersParams.name,
      type: filtersParams.type,
    });

    setPokemon(fetchedPokemon);
    setPokemonStatus("success");
  };

  const updateFilterParam = (filterParam: FilterParam, value: string) => {
    setFiltersParams({ ...filtersParams, [filterParam]: value });
  };

  const updateSinglePokemonByName = async (name: string) => {
    setSinglePokemonStatus("inProgress");
    const singlePokemon = api.pokemon.getPokemonByName(name) || null;

    setSinglePokemon(singlePokemon);
    setSinglePokemonStatus(singlePokemon ? "success" : "error");
  };

  return (
    <PokedexContext.Provider
      value={{
        filters: {
          params: filtersParams,
          updateFilterParam,
        },
        pokemonTypes: {
          data: pokemonTypes,
          status: pokemonTypesStatus,
          fetchAll: fetchAllTypes,
        },
        filteredPokemon: {
          data: pokemon,
          status: pokemonStatus,
          fetchAll: fetchAllPokemon,
        },
        singlePokemon: {
          data: singlePokemon,
          status: singlePokemonStatus,
          updateSinglePokemonByName,
        },
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};

export { PokedexContextProvider };
