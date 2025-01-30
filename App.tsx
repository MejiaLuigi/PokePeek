import { MainNavigator } from "./src/navigators/MainNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import { ImageBackground, StyleSheet, View, Button } from "react-native";
import React from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  const { theme, toggleTheme } = useTheme();
  const backgroundImage =
    theme === "dark"
      ? require("./src/assets/ModoDark.png")
      : require("./src/assets/ModoLight.png");

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Button title="Cambiar Tema" onPress={toggleTheme} />
        <MainNavigator />
      </View>
    </ImageBackground>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
