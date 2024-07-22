import { primaryColor } from "@/constants/Colors";
import { height, width } from "@/constants/general";
import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const ListEmptyComponent = () => {
  return (
    <View style={styles.emptyContainer}>
      <LottieView
        source={require("../../assets/animations/Animation_redsaber.json")}
        style={styles.lottie}
        autoPlay
        loop
      />
      <Text style={styles.text}>No results...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: { flex: 1, width: width - 24, height: width },
  text: {
    color: primaryColor,
  },
});
