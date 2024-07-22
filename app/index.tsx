import { Character } from "@/apis/apiTypes";
import { getCharacters } from "@/apis/swApis";
import { Spacer } from "@/components/Spacer";
import { backgroundColor, primaryColor } from "@/constants/Colors";
import { defaultSorting } from "@/constants/general";
import { sortCharacters } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
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
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState(defaultSorting);

  const { data, isFetching, isLoading, isError, refetch } = useQuery({
    queryKey: ["characters", query],
    queryFn: () =>
      getCharacters({
        filters: { search: query },
      }),
    staleTime: 60000,
  });
  const sortedData = sortCharacters(data?.results || ([] as Character[]), sort);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Character>) => (
      <View style={styles.listItemContainer}>
        <Text style={styles.cell}>{item.name}</Text>
        <Text style={styles.cell}>{item.eye_color}</Text>
        <Text style={styles.cell}>
          {new Date(item.created).toLocaleDateString()}
        </Text>
      </View>
    ),
    []
  );

  const handleSort = useCallback(
    (field: keyof Character) => {
      if (sort.secondarySort.field === field) {
        sort.secondarySort.ascending
          ? setSort((state) => ({
              secondarySort: {
                ...state.secondarySort,
                ascending: false,
              },
            }))
          : setSort(defaultSorting);
      } else {
        setSort({ secondarySort: { field, ascending: true } });
      }
    },
    [sort]
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
        <TextInput
          placeholder="Type character name..."
          placeholderTextColor="#ffffe0"
          style={styles.input}
          value={query}
          onChangeText={setQuery}
        />
        <Spacer height={12} />
        <View>
          <Text style={styles.name}>
            Current sorting:{" "}
            {[sort.primarySort?.field, sort.secondarySort.field].toString()}
          </Text>
          <View style={styles.row}>
            <Text style={styles.name}>Page size:</Text>
            <Pressable
              onPress={() => setPageSize(25)}
              style={styles.selectable}
            >
              <Text style={styles.name}>25</Text>
            </Pressable>
            <Pressable
              onPress={() => setPageSize(50)}
              style={styles.selectable}
            >
              <Text style={styles.name}>50</Text>
            </Pressable>
            <Pressable
              onPress={() => setPageSize(100)}
              style={styles.selectable}
            >
              <Text style={styles.name}>100</Text>
            </Pressable>
            <Pressable
              onPress={() => setPageSize(150)}
              style={styles.selectable}
            >
              <Text style={styles.name}>150</Text>
            </Pressable>
          </View>
        </View>
        <FlatList
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            <View style={styles.row}>
              <Pressable
                onPress={() => handleSort("name")}
                style={[styles.row, styles.cell]}
              >
                <Text style={styles.name}>Name</Text>
                {sort.secondarySort.field === "name" &&
                  (sort.secondarySort.ascending ? (
                    <Ionicons name="arrow-down" color={primaryColor} />
                  ) : (
                    <Ionicons name="arrow-up" color={primaryColor} />
                  ))}
              </Pressable>
              <Pressable
                onPress={() => handleSort("eye_color")}
                style={[styles.row, styles.cell]}
              >
                <Text style={styles.name}>Eye color</Text>
                {sort.secondarySort.field === "eye_color" &&
                  (sort.secondarySort.ascending ? (
                    <Ionicons name="arrow-down" color={primaryColor} />
                  ) : (
                    <Ionicons name="arrow-up" color={primaryColor} />
                  ))}
              </Pressable>
              <Pressable
                onPress={() => handleSort("created")}
                style={[styles.row, styles.cell]}
              >
                <Text style={styles.name}>Created at</Text>
                {sort.secondarySort.field === "created" &&
                  (sort.secondarySort.ascending ? (
                    <Ionicons name="arrow-down" color={primaryColor} />
                  ) : (
                    <Ionicons name="arrow-up" color={primaryColor} />
                  ))}
              </Pressable>
            </View>
          }
          data={sortedData.slice(
            currentPage * pageSize,
            (currentPage + 1) * pageSize - 1
          )}
          renderItem={renderItem}
          keyExtractor={(item) => item.name + item.birth_year}
        />
        <View style={styles.paginationContainer}>
          <Text style={styles.name}>Pages:</Text>
          {data?.count
            ? Array.from(Array(Math.ceil(data.count / pageSize)).keys()).map(
                (page) => (
                  <Pressable
                    key={`pagination_${page + 1}`}
                    onPress={() => {
                      setCurrentPage(page);
                    }}
                    style={styles.selectable}
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
  listContainer: {
    padding: 12,
  },
  header: {
    alignItems: "center",
    padding: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
    gap: 12,
    alignItems: "flex-end",
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cell: {
    flex: 1,
    color: primaryColor,
  },
  selectable: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: primaryColor,
  },
});
