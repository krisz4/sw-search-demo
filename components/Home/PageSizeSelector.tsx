import { primaryColor } from "@/constants/Colors";
import { pageSizeOptions } from "@/constants/general";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PageSizeSelectorProps = {
  pageSize: number;
  setPageSize: (value: number) => void;
};

export const PageSizeSelector = ({
  pageSize,
  setPageSize,
}: PageSizeSelectorProps) => {
  return (
    <View style={styles.row}>
      <Text style={styles.name}>Page size:</Text>
      {pageSizeOptions.map((size) => (
        <Pressable
          key={`pageSizeOption_${size}`}
          onPress={() => setPageSize(25)}
          style={
            pageSize === size
              ? [styles.selectable, styles.selected]
              : styles.selectable
          }
        >
          <Text
            style={
              pageSize === size ? [styles.name, styles.selected] : styles.name
            }
          >
            {size}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
  name: {
    color: primaryColor,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
