import AppRouter from "config/AppRouter";
import { PokedexContextProvider } from "context/PokedexContext";

import Header from "../Header";
import * as S from "./styles";

const Layout = () => (
  <>
    <Header />
    <S.ContentWrapper>
      <PokedexContextProvider>
        <AppRouter />
      </PokedexContextProvider>
    </S.ContentWrapper>
  </>
);

export default Layout;
