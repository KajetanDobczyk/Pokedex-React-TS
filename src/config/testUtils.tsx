import { PropsWithChildren, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { PokedexContextProvider } from "context/PokedexContext";
import { BrowserRouter } from "react-router-dom";

const Wrapper = ({ children }: PropsWithChildren) => (
  <BrowserRouter>
    <PokedexContextProvider>{children}</PokedexContextProvider>
  </BrowserRouter>
);

export const renderWithProviders = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: Wrapper, ...options });

export * from "@testing-library/react";
