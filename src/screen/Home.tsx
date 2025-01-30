import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ImageBackground,
  SafeAreaView,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Cards from "../components/card/Cards";
import { fetchPokemons } from "../utils/api";
import { ActivityIndicator } from "react-native-paper";

const ModoDark = require("./../assets/ModoDark.png");
const ModoLight = require("./../assets/ModoLight.png");

const LogoDark = require("./../assets/Logo_Mode_Dark.png");
const LogoLight = require("./../assets/Logo_Mode_Light.png");

interface Pokemon {
  name: string;
  url: string;
}

export function Home() {
  const { theme } = useTheme();
  const backgroundImage = theme === "dark" ? ModoDark : ModoLight;

  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [page, setPage] = useState<number>(0);
  const [next, setNext] = useState<string>("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      try {
        const results = await fetchPokemons(itemsPerPage, page * itemsPerPage);
        setPokemonData(results);
        setNext(results.next);
      } catch (err) {
        setError("Error getting information");
      }
    }

    fetchData();
  }, [page]);

  if (pokemonData.length === 0 && !error) {
    return (
      <View style={styles.safeContainer}>
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.spinner}
        />
      </View>
    );
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.header}>
          <Image
            source={theme === "dark" ? LogoDark : LogoLight}
            style={styles.logo}
          />
          <Text style={styles.welcome}>Welcome To The PokePeek!</Text>
          <Text style={styles.subtitle}>Your Favorite App Pokémon</Text>
        </View>
        <FlatList
          data={pokemonData}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <Cards url={item.url} name={item.name} />}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
          ListFooterComponent={() =>
            isLoadingMore ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <View style={styles.footer}>
                <Button
                  title="Anterior"
                  onPress={() => setPage((prev) => Math.max(prev - 1, 0))}
                  disabled={page === 0}
                />
                <Button
                  title="Siguiente"
                  onPress={() => setPage((prev) => prev + 1)}
                />
              </View>
            )
          }
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    padding: 10,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  header: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingVertical: 20,
    width: "100%",
    height: 150,
  },
  logo: {
    width: 250,
    height: 90,
    resizeMode: "contain",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 10,
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContainer: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  footer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
