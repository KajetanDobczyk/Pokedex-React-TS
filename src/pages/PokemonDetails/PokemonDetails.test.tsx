import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Route, Router, Routes } from "react-router-dom";
import { createMemoryHistory } from "history";
import { rest } from "msw";

import { pokemonServer } from "api/pokemon/testsSetup";
import { PokedexContextProvider } from "context/PokedexContext";

import PokemonDetails from ".";

beforeAll(() => pokemonServer.listen());
afterEach(() => pokemonServer.resetHandlers());
afterAll(() => pokemonServer.close());

const renderPokemonDetails = () => {
  const history = createMemoryHistory();
  const route = "/pokemon/bulbasaur";
  history.push(route);

  render(
    <Router location={history.location} navigator={history}>
      <PokedexContextProvider>
        <Routes>
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </PokedexContextProvider>
    </Router>
  );
};

test("renders error message with error from API", async () => {
  pokemonServer.use(
    rest.get("https://pokeapi.co/api/v2/pokemon/bulbasaur", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  renderPokemonDetails();

  expect(screen.getByText(/Getting/i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.queryByText(/Getting/i));
  await screen.findByText(/Couldn't/i);
});

test("fetched the pokemon and renders its info", async () => {
  renderPokemonDetails();

  expect(screen.getByText(/Getting/i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.queryByText(/Getting/i));

  expect(screen.getByRole("img", { name: "bulbasaur" })).toHaveAttribute(
    "src",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  );
  expect(screen.getByText("grass, poison")).toBeInTheDocument();
});
