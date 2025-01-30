import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { MainStackScreenProps } from "../navigators/types";
import { fetchFn } from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import { getTypeColor } from "../utils/helpers";
import Icon from "react-native-vector-icons/MaterialIcons";

export function Details({ route }: MainStackScreenProps<"Details">) {
  const { name, url } = route.params;
  const { isLoading, error, data } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchFn(url),
  });

  if (!data) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: data.sprites.other["official-artwork"].front_default }}
        style={styles.image}
        alt="Pokemon image"
      />
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{data.name}</Text>
        <TouchableOpacity>
          <Icon name="bookmark" size={35} color="#ffffff" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.details}>
          <Text style={styles.label}>Weight:</Text>
          <Text style={styles.value}>{data.weight}</Text>
          <Text style={styles.label}>Height:</Text>
          <Text style={styles.value}>{data.height}</Text>
        </View>
        <View style={styles.typeContainer}>
          <Text style={styles.label}>Type:</Text>
          {data.types.map((type: any) => (
            <View
              key={type.type.name}
              style={[
                styles.typeBox,
                { backgroundColor: getTypeColor(type.type.name) },
              ]}
            >
              <Text style={styles.typeText}>{type.type.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#015958",
    padding: 16,
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "50%",
    resizeMode: "contain",
    borderRadius: 12,
    marginBottom: 16,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  name: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textTransform: "capitalize",
    marginBottom: 16,
  },
  icon: {
    padding: 4,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
  },
  details: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: "bold",
    color: "#333333",
  },
  value: {
    fontSize: 25,
    color: "#555555",
    marginBottom: 8,
  },
  typeContainer: {
    alignItems: "center",
    flex: 1,
  },
  typeBox: {
    marginVertical: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 8,
  },
  typeText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
