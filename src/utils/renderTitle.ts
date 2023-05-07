import { TITLE_TEXT } from "@/const.js";
import gradient from "gradient-string";

const colorPallete = {
  light: "#00b4d8",
  base: "#0096c7",
  dark: "#0077b6",
  darker: "#023e8a",
  darkest: "#03045e",
};

export const renderTitle = () => {
  const gradientTitle = gradient(Object.values(colorPallete)).multiline(
    TITLE_TEXT
  );

  console.log(gradientTitle);
};
