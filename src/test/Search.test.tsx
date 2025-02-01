import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import { Search } from "../screen/Search";
import { fetchSearchPokemon } from "../utils/api";
import { ThemeProvider } from "../context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("../utils/api", () => ({
  fetchSearchPokemon: jest.fn(),
}));

jest.mock("@expo/vector-icons/MaterialIcons", () => "MaterialIcons");

describe("Search Screen", () => {
  const queryClient = new QueryClient();
  const mockNavigation = { replace: jest.fn() };

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Search navigation={mockNavigation} />
        </ThemeProvider>
      </QueryClientProvider>
    );

  it("should render correctly", async () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("search-input")).toBeTruthy();
  });

  it("should show loading indicator when searching", async () => {
    (fetchSearchPokemon as jest.Mock).mockResolvedValueOnce({
      name: "pikachu",
    });
    const { getByTestId } = renderComponent();

    fireEvent(getByTestId("search-input"), "submitEditing", {
      nativeEvent: { text: "pikachu" },
    });

    await waitFor(() => expect(getByTestId("loading-indicator")).toBeTruthy());
  });

  it("should navigate to Details on successful search", async () => {
    (fetchSearchPokemon as jest.Mock).mockResolvedValueOnce({
      name: "pikachu",
    });
    const { getByTestId } = renderComponent();

    fireEvent(getByTestId("search-input"), "submitEditing", {
      nativeEvent: { text: "pikachu" },
    });

    await waitFor(() => {
      expect(mockNavigation.replace).toHaveBeenCalledWith("Details", {
        name: "pikachu",
        url: "https://pokeapi.co/api/v2/pokemon/pikachu",
      });
    });
  });
  console.log((fetchSearchPokemon as jest.Mock).mock.calls);

  it("should show error message on failed search", async () => {
    (fetchSearchPokemon as jest.Mock).mockRejectedValueOnce({
      status: 404,
      message: "Pokémon no encontrado (Error 404)",
    });

    const { getByTestId, getByText } = renderComponent();

    fireEvent(getByTestId("search-input"), "submitEditing", {
      nativeEvent: { text: "unknow" },
    });

    await waitFor(
      () => {
        screen.debug();
        expect(getByText("OOPS!")).toBeTruthy();
        expect(getByText("Pokémon no encontrado (Error 404)")).toBeTruthy();
      },
      { timeout: 100000 }
    );
  });
});
