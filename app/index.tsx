import { backgroundColor, primaryColor } from "@/constants/Colors";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const data = [] as any[];
  const [query, setQuery] = useState("");
  const renderItem = useCallback(() => <View />, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Star Wars Character Search</Text>
        </View>
        <TextInput style={styles.input} value={query} onChangeText={setQuery} />
        <FlatList data={data} renderItem={renderItem} />
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  header: {
    alignItems: "center",
    padding: 12,
  },
  title: {
    color: primaryColor,
    fontSize: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: primaryColor,
    margin: 12,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    color: primaryColor,
  },
});
