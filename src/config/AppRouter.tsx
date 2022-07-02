import { Route, Routes } from "react-router-dom";

import Layout from "../layout/Layout";
import NotFound from "../pages/NotFound";
import PokemonDetails from "../pages/PokemonDetails";
import Pokemon from "../pages/Pokemon";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Layout />} />
    <Route index element={<Pokemon />} />
    <Route path="pokemon" element={<Pokemon />} />
    <Route path="pokemon/:name" element={<PokemonDetails />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRouter;
