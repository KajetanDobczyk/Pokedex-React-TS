import React from "react";
import ReactDOM from "react-dom/client";
import emotionReset from "emotion-reset";
import { Global, css } from "@emotion/react";

import Pokedex from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Global
      styles={css`
        ${emotionReset}

        *, *::after, *::before {
          box-sizing: border-box;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          font-smoothing: antialiased;
        }
      `}
    />
    <Pokedex />
  </React.StrictMode>
);

reportWebVitals();
