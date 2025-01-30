import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screen/Home";
import { Details } from "../screen/Details";
import { Search } from "../screen/Search";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import type { MainStackParamList } from "./types";

const Stack = createStackNavigator<MainStackParamList>();

export function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#023535" },
        headerTintColor: "white",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <MaterialIcons name="search" color="white" size={32} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Group
        screenOptions={{
          presentation: "modal",
          cardStyle: {
            backgroundColor: "white",
            marginTop: "30%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: "hidden",
          },
        }}
      >
        <Stack.Screen
          name="Details"
          component={Details}
          options={({ navigation }) => ({
            header: () => (
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
                >
                  <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>More Details</Text>
              </View>
            ),
          })}
        />
      </Stack.Group>
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#015958",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backButton: {
    backgroundColor: "#40916c",
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
});
