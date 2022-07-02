import React, { createContext, useEffect, useState } from "react";
import { Pokemon, PokemonClient } from "pokenode-ts";

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
  pokemonTypes: FetchedResource<string[]>;
  filteredPokemon: FetchedResource<Pokemon[]>;
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
  },
  filteredPokemon: {
    data: null,
    status: "idle",
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

  const api = new PokemonClient();

  const fetchAllTypes = async () => {
    setPokemonTypesStatus("inProgress");

    await api
      .listTypes(0, 1154)
      .then((data) => {
        setPokemonTypes(data.results.map((pokemonType) => pokemonType.name));
        setPokemonTypesStatus("success");
      })
      .catch((error) => {
        setPokemonTypesStatus("error");
      });
  };

  const fetchAllPokemon = async () => {
    setPokemonStatus("inProgress");

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
        setPokemonStatus("success");
      })
      .catch((error) => {
        setPokemonStatus("error");
      });
  };

  useEffect(() => {
    fetchAllTypes();
    fetchAllPokemon(); // I couldn't find a way in documentation to query pokemon list by name / type, so I am loading them all on start...
  }, []);

  const updateFilterParam = (filterParam: FilterParam, value: string) => {
    setFiltersParams({ ...filtersParams, [filterParam]: value });
  };

  const updateSinglePokemonByName = async (name: string) => {
    setSinglePokemonStatus("inProgress");

    if (pokemon?.length) {
      const singlePokemon = pokemon.find((singlePokemon) => singlePokemon.name === name) || null;

      setSinglePokemon(singlePokemon);
      setSinglePokemonStatus(singlePokemon ? "success" : "error");
    } else {
      await api
        .getPokemonByName(name)
        .then(async (data) => {
          setSinglePokemon(data);
          setSinglePokemonStatus("success");
        })
        .catch((error) => {
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
        },
        filteredPokemon: {
          data: filteredPokemon,
          status: pokemonStatus,
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
