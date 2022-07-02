import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import "@testing-library/jest-dom";

import { renderWithProviders } from "config/testUtils";

import Pokemon from ".";

const server = setupServer(
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

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders loading message and then filters and Pokemon list with correct data from API", async () => {
  renderWithProviders(<Pokemon />);

  expect(screen.getByText(/Initializing/i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.queryByText(/Initializing/i));

  await screen.findByText("bulbasaur");
  expect(screen.getByText("ivysaur")).toBeInTheDocument();
  expect(screen.getByText("squirtle")).toBeInTheDocument();

  expect(screen.getByRole("textbox", { name: "name" })).toBeInTheDocument();
  expect(screen.getByRole("combobox", { name: "type" })).toBeInTheDocument();
});

test("renders error message with data types error from API", async () => {
  server.use(
    rest.get("https://pokeapi.co/api/v2/type", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  renderWithProviders(<Pokemon />);

  expect(screen.getByText(/Initializing/i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.queryByText(/Initializing/i));
  await screen.findByText("Error downloading the Pokemon database");
});

test("renders error message with pokemon error from API", async () => {
  server.use(
    rest.get("https://pokeapi.co/api/v2/pokemon", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  renderWithProviders(<Pokemon />);

  expect(screen.getByText(/Initializing/i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.queryByText(/Initializing/i));
  await screen.findByText("Error downloading the Pokemon database");
});
