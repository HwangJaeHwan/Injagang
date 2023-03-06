interface Theme {
  colors: {
    primary: string;
    secondary: string;
    logo: string;
    text: string;
    highlight: string;
    black: string;
    white: string;
  };
}

const lightTheme:Theme = {
  colors: {
    primary: "white",
    secondary: "#1D9BF0",
    logo: "#000000",
    text: "#000000",
    highlight: "#fff",
    black: "#000000",
    white: "#ffffff",
  },
};

const darkTheme:Theme = {
  colors: {
    primary: "#202123",
    secondary: "#202123",
    logo: "#ffffff",
    text: "#ffffff",
    highlight: "#b32eb3",
    black: "#000000",
    white: "#ffffff",
  },
};

export { lightTheme, darkTheme };
