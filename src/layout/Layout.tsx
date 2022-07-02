import AppRouter from "../config/AppRouter";
import { PokedexContextProvider } from "../context/PokedexContext";
import Header from "./Header";

const Layout = () => (
  <>
    <Header />
    <PokedexContextProvider>
      <AppRouter />
    </PokedexContextProvider>
  </>
);

export default Layout;
