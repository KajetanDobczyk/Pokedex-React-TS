import { render, screen } from "@testing-library/react";

import Pokedex from "./App";

test("renders Pokedex text", () => {
  render(<Pokedex />);

  const baseText = screen.getByText(/pokedex/i);

  expect(baseText).toBeInTheDocument();
});
