import { View, StyleSheet } from "react-native";
import { getTypeBGColor } from "../../utils/helpers";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import { fetchFn } from "../../utils/api";
import { MainStackScreenProps } from "../../navigators/types";

interface CardProps {
  url: string;
  name: string;
}

export default function Cards({ url, name }: CardProps) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchFn(url),
  });

  const navigation =
    useNavigation<MainStackScreenProps<"Home">["navigation"]>();

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (error) {
    console.error("Error fetching data", error);
    return <Text variant="bodyMedium">Error loading data.</Text>;
  }

  if (!data || !data.types || data.types.length === 0) {
    console.error("Error: No se encontró el tipo de Pokémon");
    return (
      <Card
        style={styles.container}
        onPress={() => navigation.navigate("Details", { name, url })}
      >
        <Card.Content style={styles.content}>
          <Text variant="titleLarge" style={styles.name}>
            Tipo no disponible
          </Text>
          <Text variant="bodyMedium">#{data?.id}</Text>
        </Card.Content>
      </Card>
    );
  }

  const pokemonType = data?.types[0]?.type?.name;

  return (
    <Card
      style={styles.container}
      onPress={() => navigation.navigate("Details", { name, url })}
    >
      <Card.Cover
        source={{ uri: data.sprites.other["official-artwork"].front_default }}
        style={styles.image}
        alt="Image_Pokemon"
      />

      <Card.Content
        style={[
          styles.content,
          { backgroundColor: getTypeBGColor(pokemonType) },
        ]}
      >
        <Text variant="titleLarge" style={styles.name}>
          {data.name}
        </Text>
        <Text variant="bodyMedium">#{data.id}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    margin: 5,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    alignSelf: "center",
    resizeMode: "contain",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  name: {
    textTransform: "capitalize",
    fontSize: 18,
    fontWeight: "bold",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
