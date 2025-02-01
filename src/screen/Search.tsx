import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { fetchSearchPokemon } from "../utils/api";
import { MainStackScreenProps } from "../navigators/types";

const ModoDark = require("./../assets/ModoDark.png");
const ModoLight = require("./../assets/ModoLight.png");

export function Search({ navigation }: MainStackScreenProps<"Search">) {
  const [text, setText] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon", text],
    queryFn: () =>
      text
        ? fetchSearchPokemon(text.toLowerCase())
        : Promise.resolve(undefined),
    enabled: !!text,
  });

  useEffect(() => {
    if (data) {
      navigation.replace("Details", {
        name: data.name,
        url: "https://pokeapi.co/api/v2/pokemon/" + data.name,
      });
    }
  }, [data]);

  const { theme } = useTheme();
  const backgroundImage = theme === "dark" ? ModoDark : ModoLight;

  const errorMessage =
    error && typeof error === "object" ? (error as any).status : null;
  const errorText =
    error && typeof error === "object" ? (error as any).message : null;

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <TextInput
            testID="search-input"
            style={styles.searchInput}
            placeholder="Escribe aquí..."
            placeholderTextColor="#aaa"
            onSubmitEditing={({ nativeEvent }) => setText(nativeEvent.text)}
            returnKeyType="search"
          />
          <MaterialIcons
            testID="search-icon"
            name="search"
            size={20}
            color="#aaa"
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.contentError}>
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            testID="loading-indicator"
          />
        )}
        {!!error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>OOPS!</Text>
            {errorMessage && (
              <Text style={styles.errorMessage}>
                Código de error: {errorMessage}
              </Text>
            )}
            {errorText && <Text style={styles.errorMessage}>{errorText}</Text>}
            <Text style={styles.errorLabel}>ERROR</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    borderColor: "#fff",
    backgroundColor: "#fff",
    width: "90%",
  },
  searchInput: {
    borderWidth: 1,
    width: "90%",
    borderRadius: 20,
    paddingHorizontal: 15,
    borderColor: "#fff",
    backgroundColor: "#fff",
    color: "#000",
    fontSize: 14,
  },
  icon: {
    margin: 10,
  },
  contentError: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  errorContainer: {
    height: "60%",
    width: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  errorTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  errorMessage: {
    fontSize: 25,
    color: "#000",
    textAlign: "center",
  },
  errorLabel: {
    fontSize: 30,
    fontWeight: "bold",
    color: "red",
  },
});
