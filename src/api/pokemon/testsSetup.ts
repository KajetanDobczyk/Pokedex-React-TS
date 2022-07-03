import { setupServer } from "msw/node";
import { rest } from "msw";

export const pokemonServer = setupServer(
  rest.get("https://pokeapi.co/api/v2/type", (req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          {
            name: "grass",
            url: "https://pokeapi.co/api/v2/type/12/",
          },
          {
            name: "poison",
            url: "https://pokeapi.co/api/v2/type/4/",
          },
          {
            name: "water",
            url: "https://pokeapi.co/api/v2/type/11/",
          },
          {
            name: "ghost",
            url: "https://pokeapi.co/api/v2/type/8/",
          },
        ],
      })
    );
  }),
  rest.get("https://pokeapi.co/api/v2/pokemon", (req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/",
          },
          {
            name: "ivysaur",
            url: "https://pokeapi.co/api/v2/pokemon/2/",
          },
          {
            name: "squirtle",
            url: "https://pokeapi.co/api/v2/pokemon/7/",
          },
        ],
      })
    );
  }),
  rest.get("https://pokeapi.co/api/v2/pokemon/bulbasaur", (req, res, ctx) => {
    return res(
      ctx.json({
        base_experience: 64,
        id: 1,
        name: "bulbasaur",
        types: [
          { slot: 1, type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" } },
          { slot: 2, type: { name: "poison", url: "https://pokeapi.co/api/v2/type/4/" } },
        ],
        sprites: {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        },
      })
    );
  }),
  rest.get("https://pokeapi.co/api/v2/pokemon/ivysaur", (req, res, ctx) => {
    return res(
      ctx.json({
        base_experience: 142,
        id: 2,
        name: "ivysaur",
        types: [
          { slot: 1, type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" } },
          { slot: 2, type: { name: "poison", url: "https://pokeapi.co/api/v2/type/4/" } },
        ],
        sprites: {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
        },
      })
    );
  }),
  rest.get("https://pokeapi.co/api/v2/pokemon/squirtle", (req, res, ctx) => {
    return res(
      ctx.json({
        base_experience: 63,
        id: 7,
        name: "squirtle",
        types: [{ slot: 1, type: { name: "water", url: "https://pokeapi.co/api/v2/type/11/" } }],
        sprites: {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
        },
      })
    );
  })
);
