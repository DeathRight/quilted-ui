import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { test } from "./src/quilted-ui/util/tokens";

export default function App() {
  console.log(test.color);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
