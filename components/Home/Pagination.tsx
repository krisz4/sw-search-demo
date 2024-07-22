import { primaryColor, secondaryColor } from "@/constants/Colors";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PaginationProps = {
  currentPage: number;
  setCurrentPage: (value: number) => void;
  dataLength: number;
  pageSize: number;
};

export const Pagination = (props: PaginationProps) => {
  const { currentPage, setCurrentPage, dataLength, pageSize } = props;
  return (
    <View style={styles.paginationContainer}>
      <Text style={styles.columnTitle}>Pages:</Text>
      {dataLength
        ? Array.from(Array(Math.ceil(dataLength / pageSize)).keys()).map(
            (page) => (
              <Pressable
                key={`pagination_${page + 1}`}
                onPress={() => {
                  setCurrentPage(page);
                }}
                style={
                  currentPage === page
                    ? [styles.selectable, styles.selected]
                    : styles.selectable
                }
              >
                <Text
                  style={
                    currentPage === page
                      ? [styles.name, styles.selected]
                      : styles.name
                  }
                >
                  {page + 1}
                </Text>
              </Pressable>
            )
          )
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  name: {
    color: primaryColor,
  },
  columnTitle: {
    color: secondaryColor,
    fontFamily: "StarJedi",
    fontSize: 12,
  },
  selectable: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: primaryColor,
  },
  selected: {
    backgroundColor: primaryColor,
    color: "black",
  },
});
