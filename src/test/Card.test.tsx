import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import Cards from "../components/card/Cards"; // Ajusta la ruta si es necesario
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { fetchFn } from "../utils/api";

// Crea una instancia de QueryClient para envolver tu componente
const queryClient = new QueryClient();

// Mockear la función fetchFn para que devuelva una respuesta controlada
jest.mock("../utils/api", () => ({
  fetchFn: jest.fn(),
}));

// Mockear la navegación de React Navigation
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
}));

describe("Cards", () => {
  it("should display pokemon name and id after fetching data", async () => {
    // Simula la respuesta controlada de la API
    (fetchFn as jest.Mock).mockResolvedValueOnce({
      name: "bulbasaur",
      id: 1,
      types: [{ type: { name: "grass" } }],
      sprites: {
        other: {
          "official-artwork": {
            front_default: "https://example.com/image.png",
          },
        },
      },
    });

    const { findByText } = render(
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Cards url="https://pokeapi.co/api/v2/pokemon/1/" name="bulbasaur" />
        </QueryClientProvider>
      </NavigationContainer>
    );

    // Espera a que los datos se carguen y verifica que se muestren el nombre y ID del Pokémon
    await waitFor(() => findByText("bulbasaur"));
    await waitFor(() => findByText("#1"));
  });

  it("should navigate to details screen when card is pressed", async () => {
    // Simula la respuesta controlada de la API
    (fetchFn as jest.Mock).mockResolvedValueOnce({
      name: "bulbasaur",
      id: 1,
      types: [{ type: { name: "grass" } }],
      sprites: {
        other: {
          "official-artwork": {
            front_default: "https://example.com/image.png",
          },
        },
      },
    });

    // Crear un mock para la función de navegación
    const navigateMock = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({ navigate: navigateMock });

    // Renderiza el componente dentro de la navegación
    render(
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Cards url="https://pokeapi.co/api/v2/pokemon/1/" name="bulbasaur" />
        </QueryClientProvider>
      </NavigationContainer>
    );

    // Simula el clic en el card
    const card = screen.getByTestId("card-container");
    fireEvent.press(card);

    // Espera que la navegación haya sido llamada con los parámetros correctos
    await waitFor(() =>
      expect(navigateMock).toHaveBeenCalledWith("Details", {
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/",
      })
    );
  });
});
