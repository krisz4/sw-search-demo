import { Character } from "@/apis/apiTypes";

export const defaultSorting: {
  primarySort?: { field: keyof Character; value: string };
  secondarySort: { field: keyof Character; ascending: boolean };
} = {
  primarySort: { field: "eye_color", value: "blue" },
  secondarySort: { field: "created", ascending: true },
};
