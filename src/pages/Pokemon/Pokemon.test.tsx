import { rest } from "msw";
import { fireEvent, screen, waitForElementToBeRemoved } from "@testing-library/react";
import "@testing-library/jest-dom";

import { renderWithProviders } from "config/testUtils";
import { pokemonServer } from "api/pokemon/testsSetup";

import Pokemon from ".";

beforeAll(() => pokemonServer.listen());
afterEach(() => pokemonServer.resetHandlers());
afterAll(() => pokemonServer.close());

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
  pokemonServer.use(
    rest.get("https://pokeapi.co/api/v2/type", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  renderWithProviders(<Pokemon />);

  expect(screen.getByText(/Initializing/i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.queryByText(/Initializing/i));
  await screen.findByText(/Error/i);
});

test("renders error message with pokemon error from API", async () => {
  pokemonServer.use(
    rest.get("https://pokeapi.co/api/v2/pokemon", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  renderWithProviders(<Pokemon />);

  expect(screen.getByText(/Initializing/i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.queryByText(/Initializing/i));
  await screen.findByText(/Error/i);
});

test("filters pokemon by name and type correctly", async () => {
  renderWithProviders(<Pokemon />);

  await screen.findByText("bulbasaur");

  const nameInput = screen.getByRole("textbox", { name: "name" });
  const typeInput = screen.getByRole("combobox", { name: "type" });

  expect(nameInput).toBeInTheDocument();
  expect(typeInput).toBeInTheDocument();

  expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  expect(screen.getByText("ivysaur")).toBeInTheDocument();
  expect(screen.getByText("squirtle")).toBeInTheDocument();

  fireEvent.change(nameInput, { target: { value: "bul" } });

  expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  expect(screen.queryByText("ivysaur")).toBeNull();
  expect(screen.queryByText("squirtle")).toBeNull();

  fireEvent.change(nameInput, { target: { value: "i" } });

  expect(screen.queryByText("bulbasaur")).toBeNull();
  expect(screen.getByText("ivysaur")).toBeInTheDocument();
  expect(screen.getByText("squirtle")).toBeInTheDocument();

  fireEvent.change(typeInput, { target: { value: "water" } });

  expect(screen.queryByText("bulbasaur")).toBeNull();
  expect(screen.queryByText("ivysaur")).toBeNull();
  expect(screen.getByText("squirtle")).toBeInTheDocument();

  fireEvent.change(typeInput, { target: { value: "ghost" } });

  expect(screen.queryByText("bulbasaur")).toBeNull();
  expect(screen.queryByText("ivysaur")).toBeNull();
  expect(screen.queryByText("squirtle")).toBeNull();

  fireEvent.change(nameInput, { target: { value: "squirtle" } });

  expect(screen.queryByText("bulbasaur")).toBeNull();
  expect(screen.queryByText("ivysaur")).toBeNull();
  expect(screen.queryByText("squirtle")).toBeNull();
  expect(screen.getByText(/No pokemons/i)).toBeInTheDocument();

  fireEvent.change(typeInput, { target: { value: "water" } });

  expect(screen.queryByText(/No pokemons/i)).toBeNull();
  expect(screen.queryByText("bulbasaur")).toBeNull();
  expect(screen.queryByText("ivysaur")).toBeNull();
  expect(screen.getByText("squirtle")).toBeInTheDocument();
});
