import { Character } from "@/apis/apiTypes";
import { getCharacters } from "@/apis/swApis";
import {
  CharacterListHeader,
  ListEmptyComponent,
  PageSizeSelector,
  Pagination,
} from "@/components/Home";
import { Spacer } from "@/components/Spacer";
import {
  backgroundColor,
  primaryColor,
  secondaryColor,
} from "@/constants/Colors";
import { defaultSorting } from "@/constants/general";
import { sortCharacters } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import LottieView from "lottie-react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Dimensions,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GeneralContext } from "./_layout";

const { width, height } = Dimensions.get("window");

const Home = () => {
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState(defaultSorting);

  const fontsLoaded = useContext(GeneralContext);

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

  const handleSearchInput = useCallback(
    debounce((text: string) => setQuery(text), 1500),
    []
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [query]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Star Wars Character Search</Text>
        </View>
        <TextInput
          placeholder="Type character name..."
          placeholderTextColor={secondaryColor}
          style={styles.input}
          onChangeText={handleSearchInput}
        />
        <Spacer height={12} />
        <View>
          <Text style={styles.name}>
            Current sorting:{" "}
            {[sort.secondarySort.field, sort.primarySort?.field].toString()}
          </Text>
          <Spacer height={12} />
          <PageSizeSelector pageSize={pageSize} setPageSize={setPageSize} />
        </View>
        {isFetching ? (
          <View style={styles.loadingContainer}>
            <LottieView
              source={require("../assets/animations/Animation_loading.json")}
              style={styles.lottie}
              autoPlay
              loop
            />
            <Text style={styles.name}>Fetching data...</Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={<ListEmptyComponent />}
            ListHeaderComponent={
              <CharacterListHeader sort={sort} setSort={setSort} />
            }
            data={sortedData.slice(
              currentPage * pageSize,
              (currentPage + 1) * pageSize - 1
            )}
            renderItem={renderItem}
            keyExtractor={(item) => item.name + item.birth_year}
          />
        )}
        <Spacer height={8} />
        <Pagination
          dataLength={data?.count || 0}
          pageSize={pageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
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
    fontSize: 18,
    fontFamily: "StarJedi",
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
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cell: {
    flex: 1,
    color: primaryColor,
  },
  loadingContainer: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: { flex: 1, width: width - 24, height: width },
});
