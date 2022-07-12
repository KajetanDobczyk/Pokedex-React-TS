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
    const pokemonArray = Array.from(this.pokedex.values());

    if(!name?.length && !type?.length) {
      return pokemonArray
    }

    const filteredPokemon: Pokemon = [];

    pokemonArray.forEach(pokemon => {
      const isPokemonFound = false;

      if()

      if((name && pokemon.name.english.toLowerCase().includes(name.toLowerCase())) || ) {
        filteredPokemon.push(pokemon)
      }
    })

    return filteredPokemon;
  }

  listTypes() {
    return this.types;
  }

  /**
   * Returns a single pokemon selected by exact name match
   */
  getPokemonByName(name: string) {}
}
