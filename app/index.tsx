import { Character } from "@/apis/apiTypes";
import { getCharacters } from "@/apis/swApis";
import { backgroundColor, primaryColor } from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import {
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(50);
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isFetching, isLoading, isError, refetch } = useQuery({
    queryKey: ["characters", query],
    queryFn: () =>
      getCharacters({
        filters: { search: query },
      }),
    staleTime: 60000,
  });
  console.log("isfetching", isFetching);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Character>) => (
      <View style={styles.paginationContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.name}>{item.eye_color}</Text>
        <Text style={styles.name}>
          {new Date(item.created).toLocaleDateString()}
        </Text>
      </View>
    ),
    []
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [query]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Star Wars Character Search</Text>
        </View>
        <TextInput style={styles.input} value={query} onChangeText={setQuery} />
        <FlatList
          data={data?.results.slice(
            currentPage * pageSize,
            currentPage + 1 * pageSize
          )}
          renderItem={renderItem}
          keyExtractor={(item) => item.name + item.birth_year}
        />
        <View style={styles.paginationContainer}>
          {data?.count
            ? Array.from(Array(Math.ceil(data.count / pageSize)).keys()).map(
                (page) => (
                  <Pressable
                    key={`pagination_${page + 1}`}
                    onPress={() => {
                      setCurrentPage(page);
                    }}
                  >
                    <Text style={styles.name}>{page + 1}</Text>
                  </Pressable>
                )
              )
            : null}
        </View>
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
  name: {
    color: primaryColor,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
