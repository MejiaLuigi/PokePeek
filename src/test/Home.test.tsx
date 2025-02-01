import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { Home } from "../screen/Home";
import { ThemeProvider } from "../../src/context/ThemeContext";

describe("Home Screen", () => {
  it("renders the main container correctly", async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    );

    // Esperar a que el componente se actualice después de la carga asíncrona
    await waitFor(() => {
      expect(getByTestId("home-container")).toBeTruthy();
    });
  });
});
