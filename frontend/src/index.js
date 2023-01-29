import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./Utilities/Theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css"
import React from "react";
import * as ReactDOMClient from 'react-dom/client';
import { CookiesProvider } from "react-cookie";
import ErrorBoundary from "./Pages/ErrorHandler/ErrorBoundary";
const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary >
      <BrowserRouter>
          <ThemeProvider theme={theme}>
              <CookiesProvider>
                <Routes>
                    <Route path="*" element={ <App /> } />
                </Routes>
            </CookiesProvider>
          </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

