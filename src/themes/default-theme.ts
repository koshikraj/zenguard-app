import { MantineThemeOverride } from "@mantine/styles";

export const themeOverRide: MantineThemeOverride = {
  fontFamily: "Inter",

  white: "#F8F9FB",
  black: "#0E141B",
  colors: {
    //todo -reolace with theme object (add custom type- dont use array)
    black: ["#0E141B", "red", "green", "blue"],
    gray: ["rgba(132, 154, 170, 0.52)", "#B3B4B7", "#182635"],
    test: ["red", "green", "blue"],
    purple: [
      "#f4e8ff",
      "#d6c0f4",
      "#b897e8",
      "#9c6fde",
      "#8046d3",
      "#662cb9",
      "#502291",
      "#391869",
      "#220e41",
      "#0d031b",
    ],
  },
};
