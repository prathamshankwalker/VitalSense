import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

const myTheme = {
  fontFamily: "Satoshi, sans-serif",
  fontFamilyMonospace: "Satoshi, sans-serif",
  headings: { fontFamily: "Satoshi, sans-serif" },
  colorScheme: "dark"
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>

    <BrowserRouter>
      <MantineProvider
        theme={myTheme}
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
      >
        <App />
      </MantineProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
