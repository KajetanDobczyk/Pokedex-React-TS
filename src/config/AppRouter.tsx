import { Route, Routes } from "react-router-dom";

import Layout from "../layout/Layout";
import NotFound from "../pages/NotFound";
import PokemonDetails from "../pages/PokemonDetails";
import PokemonList from "../pages/Pokemon";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Layout />} />
    <Route index element={<PokemonList />} />
    <Route path="pokemon" element={<PokemonList />} />
    <Route path="pokemon/:id" element={<PokemonDetails />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRouter;
