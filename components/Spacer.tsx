import React from "react";
import { View } from "react-native";

type SpacerProps = {
  width?: number;
  height?: number;
};

const SPACING_UNIT = 1;

export function Spacer(props: SpacerProps) {
  const { width: widthInUnits = 0, height: heightInUnits = 0 } = props;

  const width = widthInUnits * SPACING_UNIT;
  const height = heightInUnits * SPACING_UNIT;

  return <View style={{ width, height }} />;
}
