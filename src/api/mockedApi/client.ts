import pokedata from "./data/pokemon.json";

export type Pokemon = typeof pokedata[number];

/**
 * To initialize: const Pokedex = new PokedexClient()
 *
 * const pokemon = PokedexClient.listPokemon()
 * const charizard = PokedexClient.getPokemonByName('charizard')
 */
export class PokedexClient {
  private pokedex: Map<string, Pokemon> = new Map();
  private types: string[] = [];

  constructor() {
    pokedata.forEach((pokemon) => {
      this.pokedex.set(pokemon.name.english, pokemon);

      pokemon.type.forEach((type) => {
        if (!this.types.includes(type)) {
          this.types.push(type);
        }
      });
    });
  }

  /**
   * Returns a list of pokemon filtered by name and or type
   */
  listPokemon({ name, type }: { name?: string; type?: string }) {
    let filteredPokemon = Array.from(this.pokedex.values());

    if (!name?.length && !type?.length) {
      return filteredPokemon;
    }

    if (name?.length) {
      filteredPokemon = filteredPokemon.filter((pokemon) =>
        pokemon.name.english.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (type?.length) {
      filteredPokemon = filteredPokemon.filter((pokemon) => pokemon.type.includes(type));
    }

    return filteredPokemon;
  }

  listTypes() {
    return this.types;
  }

  /**
   * Returns a single pokemon selected by exact name match
   */
  getPokemonByName(name: string) {
    return this.pokedex.get(
      decodeURIComponent(name)
        .split(" ")
        .map((word) => `${word[0].toUpperCase()}${word.substring(1)}`)
        .join(" ")
    );
  }
}
