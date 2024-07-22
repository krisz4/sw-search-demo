import { Character } from "@/apis/apiTypes";
import { primaryColor, secondaryColor } from "@/constants/Colors";
import { defaultSorting } from "@/constants/general";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type CharacterListHeaderProps = {
  sort: {
    primarySort?:
      | {
          field: keyof Character;
          value: string;
        }
      | undefined;
    secondarySort: {
      field: keyof Character;
      ascending: boolean;
    };
  };
  setSort: React.Dispatch<
    React.SetStateAction<{
      primarySort?:
        | {
            field: keyof Character;
            value: string;
          }
        | undefined;
      secondarySort: {
        field: keyof Character;
        ascending: boolean;
      };
    }>
  >;
};

export const CharacterListHeader = (props: CharacterListHeaderProps) => {
  const { sort, setSort } = props;

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

  return (
    <View style={styles.row}>
      <Pressable
        onPress={() => handleSort("name")}
        style={[styles.row, styles.cell]}
      >
        <Text style={styles.columnTitle}>Name</Text>
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
        <Text style={styles.columnTitle}>Eye color</Text>
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
        <Text style={styles.columnTitle}>Created at</Text>
        {sort.secondarySort.field === "created" &&
          (sort.secondarySort.ascending ? (
            <Ionicons name="arrow-down" color={primaryColor} />
          ) : (
            <Ionicons name="arrow-up" color={primaryColor} />
          ))}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    color: primaryColor,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  columnTitle: {
    color: secondaryColor,
    fontFamily: "StarJedi",
    fontSize: 12,
  },
});
