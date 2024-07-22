import { Character } from "@/apis/apiTypes";
import { Dimensions } from "react-native";

export const defaultSorting: {
  primarySort?: { field: keyof Character; value: string };
  secondarySort: { field: keyof Character; ascending: boolean };
} = {
  primarySort: { field: "eye_color", value: "blue" },
  secondarySort: { field: "created", ascending: true },
};

export const pageSizeOptions = [25, 50, 100, 150];

export const { width, height } = Dimensions.get("window");
