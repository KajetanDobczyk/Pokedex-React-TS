import React, { createContext, useState } from "react";
import { Pokemon } from "pokenode-ts";

import api from "api";

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

  const fetchAllTypes = async () => {
    setPokemonTypesStatus("inProgress");

    await api.pokemon
      .listTypes(0, 1154)
      .then((data) => {
        setPokemonTypes(data.results.map((pokemonType) => pokemonType.name));
        setPokemonTypesStatus("success");
      })
      .catch((error) => {
        setPokemonTypes(null);
        setPokemonTypesStatus("error");
      });
  };

  const fetchAllPokemon = async () => {
    setPokemonStatus("inProgress");

    await api.pokemon
      .listPokemons(0, 1154)
      .then(async (data) => {
        const pokemonNames = data.results.map((pokemon) => pokemon.name);
        const fetchedPokemon: Pokemon[] = [];

        for (const name of pokemonNames) {
          await api.pokemon
            .getPokemonByName(name)
            .then((data) => fetchedPokemon.push(data))
            .catch((error) => {
              setPokemon(null);
              setPokemonStatus("error");
            });
        }

        setPokemon(fetchedPokemon);
        setPokemonStatus("success");
      })
      .catch((error) => {
        setPokemon(null);
        setPokemonStatus("error");
      });
  };

  const updateFilterParam = (filterParam: FilterParam, value: string) => {
    setFiltersParams({ ...filtersParams, [filterParam]: value });
  };

  const updateSinglePokemonByName = async (name: string) => {
    if (pokemon?.length) {
      const singlePokemon = pokemon.find((singlePokemon) => singlePokemon.name === name) || null;

      setSinglePokemon(singlePokemon);
      setSinglePokemonStatus(singlePokemon ? "success" : "error");
    } else {
      setSinglePokemonStatus("inProgress");

      await api.pokemon
        .getPokemonByName(name)
        .then(async (data) => {
          setSinglePokemon(data);
          setSinglePokemonStatus("success");
        })
        .catch((error) => {
          setSinglePokemon(null);
          setSinglePokemonStatus("error");
        });
    }
  };

  const filteredPokemon =
    pokemon?.filter(
      (singlePokemon) =>
        singlePokemon.name.includes(filtersParams.name.toLowerCase() || "") &&
        singlePokemon.types
          .map((type) => type.type.name)
          .find((typeName) => typeName.includes(filtersParams.type))
    ) || null;

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
          data: filteredPokemon,
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
